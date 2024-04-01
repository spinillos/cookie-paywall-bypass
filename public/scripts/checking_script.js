function getUrls() {
    return new Promise(function(resolve) {
        chrome.storage.local.get('urls', function(data) {
            if (data.urls !== undefined) {
                resolve(data.urls);
            } else {
                resolve([]);
            }
        });
    });
}

function getCurrentWindow(urls) {
    return new Promise(function (resolve) {
        const url = cleanURL(window.location.href)
        if (urls.includes(url)) {
            resolve(false)   
        } else {
            resolve(true)
        }
    })
}

chrome.storage.local.get('isEnabled', function (data) {
    if (data.isEnabled) {
        window.addEventListener("load", waitCondition, false)
    }
})

function waitCondition(ev) {
    getUrls()
    .then(function (urls) {
        return getCurrentWindow(urls)
    })
    .then(function (isAllowed) {
        if (isAllowed === false) {
            console.log("NoAds disabled for this url")
            return
        }

        removePayWall()
    })
    .catch(function (error) {
        console.log("Cookie paywall bypass: Error retrieving urls" + error)
    })
}

function removePayWall() {
    const websites = {
        "elpais.com": elPaisBypass,
        "elconfidencial.com": elConfidencialByPass,
        "expansion.com": ampByPass,
        "elmundo.es": ampByPass,
    }

    setTimeout(genericCheck, 1000)
    const pageFunction = websites[cleanURL(window.location.hostname)]
    if (pageFunction !== undefined) {
        pageFunction()
    }
}

function cleanURL(url) {
    const domain = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.|amp\.)?([^:/\n?]+)/im)
    return (domain && domain[1]) || ''
}
