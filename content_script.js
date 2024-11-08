
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'setRating') {
    var ratingValue = request.rating;
    if (window.location.href !== 'https://quiklrn.com/user/survey.php') {
      alert('Wrong window, please login to quiklrn');
    } else {
      function autoSurvey() {
        let startButton = document.querySelector('button[onclick*="startSuvery"]');
        if (startButton) {
          startButton.click();
          setTimeout(() => {
            document.querySelectorAll('input[type="radio"][value="' + ratingValue + '"]').forEach(radio => radio.checked = true);
            document.getElementById('comments').value = "none";
            document.getElementById('submit_survey').click();
            setTimeout(autoSurvey, 1000);
          }, 1000);
        } else {
          alert("Successfully completed the survey. Now you can KYS");
        }
      }
      autoSurvey();
    }
  }
});
