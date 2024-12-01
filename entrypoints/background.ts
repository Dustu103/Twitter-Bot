export default defineBackground(() => {
  chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
    if (tab.url && tab.url.includes("x.com")) {
        console.log("Working");
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content-scripts/content.js"],
        }, () => {
        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            value: "Hello from background"
        });
    });
    }
});

});
