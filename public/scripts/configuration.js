document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.getElementById("title")
    titleElement.textContent = chrome.i18n.getMessage("title")
    
    const descriptionElement = document.getElementsByClassName("text-style")[0]
    descriptionElement.textContent = chrome.i18n.getMessage("popup_description")
    
    const linkElement = document.getElementById("options")
    linkElement.textContent = chrome.i18n.getMessage("popup_options_link")

    document.getElementById("donationButton").addEventListener("click", function() {
        window.open("https://www.buymeacoffee.com/selenepinillos", "_blank");
    });
    
    chrome.storage.local.get('isEnabled', function(data) {
        if (data.isEnabled !== undefined) {
            document.getElementById('switch').checked = data.isEnabled;
        } else {
            document.getElementById('switch').checked = true
        }
    });

    // Escuchar los cambios en el interruptor y actualizar la configuración
    document.getElementById('switch').addEventListener('change', function() {
        const state = this.checked
        chrome.storage.local.set({ 'isEnabled': state }, function() {});
    });
});
