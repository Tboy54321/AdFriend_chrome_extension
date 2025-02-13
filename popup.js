document.querySelectorAll('input[name="contentType"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.getElementById('customText').style.display = 
            document.getElementById('customOption').checked ? 'block' : 'none';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let contentTypeRadios = document.querySelectorAll("input[name='contentType']");
    let customText = document.getElementById("customText");
    let saveButton = document.getElementById("save");

    chrome.storage.sync.get(["contentType", "customMessage"], function (data) {
        if (data.contentType) {
            document.querySelector(`input[value="${data.contentType}"]`).checked = true;
            if (data.contentType === "custom") {
                customText.style.display = "block";
                customText.value = data.customMessage || "";
            }
        }
    });

    contentTypeRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            customText.style.display = (this.value === "custom") ? "block" : "none";
        });
    });

    saveButton.addEventListener("click", function () {
        let selectedContentType = document.querySelector("input[name='contentType']:checked").value;
        let customMessage = customText.value;

        console.log("Saving preferences:", { selectedContentType, customMessage });

        chrome.storage.sync.set({ contentType: selectedContentType, customMessage: customMessage }, function () {
            if (chrome.runtime.lastError) {
                console.error("Error saving preferences:", chrome.runtime.lastError);
            } else {
                console.log("Preferences saved successfully!");
                alert("Preferences saved!");
            }
        });
    });
});
