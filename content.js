const quotes = [
    "Believe in yourself!",
    "You are stronger than you think.",
    "Stay positive, work hard, make it happen.",
    "Every day is a fresh start.",
    "Dream big and dare to fail."
];

const activities = [
    "Have you stretched today?",
    "Take a deep breath and relax.",
    "Drink a glass of water!",
    "Stand up and move for a minute.",
    "Time for a quick break!"
];

function replaceAds() {
    const adSelectors = [
        "iframe", "ins", ".adsbygoogle", "[id^='ad']",
        "[class*='ad']", "[class*='banner']",
        "[class*='sponsor']", "[data-adblock]"
    ];

    adSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(ad => {
            if (ad && ad.parentElement) {
                const widget = document.createElement("div");
                widget.className = "adfriend-widget";
                widget.innerText = Math.random() > 0.5
                    ? quotes[Math.floor(Math.random() * quotes.length)]
                    : activities[Math.floor(Math.random() * activities.length)];

                ad.parentElement.replaceChild(widget, ad);
            }
        });
    });
}

window.onload = () => {
    replaceAds();
    setInterval(replaceAds, 5000);
};
