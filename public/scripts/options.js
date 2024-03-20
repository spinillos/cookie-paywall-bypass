document.addEventListener('DOMContentLoaded', function() {
    loadLanguageConfiguration()
    // Cargar las URLs guardadas, si las hay
    chrome.storage.local.get('urls', function(data) {
        const urls = data.urls;
        if (urls && urls.length > 0) {
            urls.forEach(function(url) {
                addField(url);
            });
        }
    });

    document.getElementById('save').addEventListener('click', function() {
        saveConfiguration();
    });

    
    document.getElementById('addField').addEventListener('click', function() {
        addField('');
    });

    function addField(initialValue) {
        const divField = document.createElement('div');
        divField.classList.add('field-container');
        const inputUrl = document.createElement('input');
        inputUrl.type = 'text';
        inputUrl.value = initialValue;
        divField.appendChild(inputUrl);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = chrome.i18n.getMessage("options_delete_button");
        deleteButton.classList.add('delete-button')
        deleteButton.addEventListener('click', function() {
            divField.remove();
        });
        divField.appendChild(deleteButton);

        document.getElementById('urlFields').appendChild(divField);
    }

    window.addEventListener('unload', function() {
        saveConfiguration()
    });
    
    function saveConfiguration() {
        const urls = [];
        const fields = document.querySelectorAll('#urlFields input[type="text"]');
        fields.forEach(function(field) {
            urls.push(cleanURL(field.value));
        });
        chrome.storage.local.set({ 'urls': urls }, function() {
            // Mostrar el mensaje de guardado correctamente
            var mensaje = document.getElementById('message');
            mensaje.textContent = chrome.i18n.getMessage("options_save_configuration_message");
            mensaje.style.display = 'block';

            // Ocultar el mensaje después de 3 segundos
            setTimeout(function() {
                mensaje.style.display = 'none';
            }, 3000);
        });
    }
});

function cleanURL(url) {
    const domain = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/im)
    return (domain && domain[1]) || ''
}

function loadLanguageConfiguration() {
    const titleElement = document.getElementById("title")
    titleElement.textContent = chrome.i18n.getMessage("options_title")

    const descriptionElement = document.getElementById("description")
    descriptionElement.textContent = chrome.i18n.getMessage("options_description")

    const addButtonElement = document.getElementById("addField")
    addButtonElement.textContent = chrome.i18n.getMessage("options_add_button")

    const saveButtonElement = document.getElementById("save")
    saveButtonElement.textContent = chrome.i18n.getMessage("options_save_configuration")
}
