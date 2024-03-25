const genericCheck = function () {
    const didomi = document.getElementById("didomi-host")
    if (didomi) {
        didomi.remove()
        document.body.classList.remove("didomi-popup-open")
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
    
    // EuropaPress
    let needsClick = document.querySelector(".needsclick")
    if (needsClick) {
        document.head.getElementsByTagName("style")[0].remove()
        needsClick.remove()
    }

    if (document.body.style.getPropertyValue("overflow")) {
        document.body.style.removeProperty("overflow")
    }
    
    document.body.classList.remove("_y9ev9r")
    document.body.classList.remove("sxnlzit")
    document.body.classList.remove("bodyBlocked")
}

const elPaisBypass = function () {
    let consentWall = document.getElementById("pmConsentWall")
    if (consentWall) {
        consentWall.remove()
    }

    const premium = document.querySelector("#ctn_freemium_article")
    if (premium) {
        premium.remove()
    }

    for (let i = 0; i < document.scripts.length; i++) {
        const type = document.scripts[i].type
        if (type === "application/ld+json") {
            const parsed = JSON.parse(document.scripts[i].textContent)
            if (parsed.hasOwnProperty("articleBody")) {
                document.querySelector(".a_c.clearfix").querySelector("p").innerHTML = parsed["articleBody"]
                break
            }
        }
    }
}

const elConfidencialByPass = function () {
    document.querySelector("#news-body-cc").classList.remove("newsType__content--closed")
}
