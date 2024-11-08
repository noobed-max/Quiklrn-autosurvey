chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'startSurvey') {
      var ratingValue = request.rating;
      // Open the survey page
      chrome.tabs.create({ url: 'https://quiklrn.com/user/survey.php' }, function(tab) {
        // Wait for the tab to finish loading
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === tab.id && info.status === 'complete') {
            // Remove the listener to prevent future triggers
            chrome.tabs.onUpdated.removeListener(listener);
            // Inject the content script and pass the rating value
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ['content_script.js']
            }, function() {
              // After content script is injected, send a message to it with the rating value
              chrome.tabs.sendMessage(tab.id, { action: 'setRating', rating: ratingValue });
            });
          }
        });
      });
    }
  });
  