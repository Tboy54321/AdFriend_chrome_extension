async function fetchMotivationalQuote() {
    try {
        let response = await fetch("https://api.quotable.io/random?tags=inspirational");
        let data = await response.json();
        return data.content || "Stay positive and keep pushing forward!";
    } catch (error) {
        console.error("Error fetching quote:", error);
        return "Keep going! You got this! 💪";
    }
}

async function replaceAds() {
    console.log("AdFriend: Replacing ads...");

    chrome.storage.sync.get(["contentType", "customMessage"], async function (data) {
        let contentType = data.contentType || "quote";  // Default to quotes
        let customMessage = data.customMessage || "Stay focused and motivated! 🚀";

        let contentToDisplay = "";

        if (contentType === "quote") {
            contentToDisplay = await fetchMotivationalQuote();
        } else if (contentType === "reminder") {
            contentToDisplay = "💪 Time for a quick stretch or a deep breath!";
        } else if (contentType === "custom") {
            contentToDisplay = customMessage;
        }

        let adSelectors = ["iframe", "div[class*='ad']", "ins.adsbygoogle"];
        adSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(ad => {
                ad.style.display = "none";

                let replacement = document.createElement("div");
                replacement.innerText = contentToDisplay;
                replacement.style.background = "#ffdd57";
                replacement.style.padding = "20px";
                replacement.style.color = "black";
                replacement.style.fontSize = "18px";
                ad.replaceWith(replacement);
            });
        });

        console.log("Ads replaced with:", contentToDisplay);
    });
}

replaceAds();

setInterval(replaceAds, 5000);
