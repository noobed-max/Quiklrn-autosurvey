document.getElementById('startButton').addEventListener('click', function() {
    var ratingValue = document.getElementById('rating').value;
    chrome.runtime.sendMessage({ action: 'startSurvey', rating: ratingValue });
    window.close(); // Close the popup after starting the process
  });
  