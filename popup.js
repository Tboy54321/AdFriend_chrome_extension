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

        chrome.storage.sync.set({ contentType: selectedContentType, customMessage: customMessage }, function () {
            alert("Preferences saved!");
        });
    });
});
