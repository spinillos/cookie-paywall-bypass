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
        
        let interval = setInterval(checkInterval, 100)
        function checkInterval() {
            if (document.getElementById("didomi-host") || document.getElementById("pmConsentWall")) {
                clearInterval(interval)
                removePayWall()
            }
        }
    })
    .catch(function (error) {
        console.log("NoAds: Error retrieving urls" + error)
    })
}

function removePayWall() {
    let didomi = document.getElementById("didomi-host")
    if (didomi) {
        didomi.remove()
        document.body.classList.remove("didomi-popup-open")
    }
    
    // El país
    let consentWall = document.getElementById("pmConsentWall")
    if (consentWall) {
        consentWall.remove()
        
    }
    
    if (document.body.style.getPropertyValue("overflow")) {
        document.body.style.removeProperty("overflow")
    }
    
    if (document.body.className === "bodyBlocked") {
        document.body.classList.remove("bodyBlocked")
    }

    let overlay = document.getElementById("nhfp_didomi_block_page")
    if (overlay) {
        overlay.remove()
    }
    
    let noSnippet = document.querySelector('div[data-nosnippet="data-nosnippet"]')
    if (noSnippet) {
        noSnippet.remove()
    }

    let mrfPopup = document.getElementById("mrf-popup")
    if (mrfPopup) {
        mrfPopup.remove()
    }
}

function cleanURL(url) {
    const domain = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/im)
    return (domain && domain[1]) || ''
}
