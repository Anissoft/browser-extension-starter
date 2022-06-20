'use-strict'

function getTitle() {
    return document.title;
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'loading') {
        try {
            console.log(`Calling getTitle for tab ${tab.url}`);
            chrome.scripting.executeScript({
                target: { tabId: tabId, allFrames: true },
                func: getTitle,
            }, (injectionResults) => {
                console.log('Result: ', injectionResults);
            });
        } catch(e) {
            console.error(e);
        }
    }
})
