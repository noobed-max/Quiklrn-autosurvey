
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'setRating') {
    var ratingValue = request.rating;
    if (window.location.href !== 'https://quiklrn.com/user/survey.php') {
      alert('Wrong window, please login to quiklrn');
    } else {
      function autoSurvey() {
    // Function to change the dropdown value
    function changeDropdownToShow100Entries() {
        let dropdown = document.querySelector('#Suvey_table_length select');
        if (dropdown) {
            dropdown.value = '100';
            // Trigger change event if necessary for the page to recognize the change
            let event = new Event('change', { bubbles: true });
            dropdown.dispatchEvent(event);
        }
    }

    // Call the function to change the dropdown
    changeDropdownToShow100Entries();

    // Now find the start button and proceed with the survey
    let startButton = document.querySelector('button[onclick*="startSuvery"]');
    if (startButton) {
        startButton.click();
        setTimeout(() => {
            // Select all radio groups
            const radioGroups = {};
            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radioGroups[radio.name] = true;
            });

            // Iterate through each radio group
            for (const groupName in radioGroups) {
                const radiosInGroup = document.querySelectorAll(`input[type="radio"][name="${groupName}"]`);

                // Check if "Very High" (value="5") exists in the group
                let veryHighRadio = document.querySelector(`input[type="radio"][name="${groupName}"][value="5"]`);

                if (veryHighRadio) {
                    veryHighRadio.checked = true;
                } else {
                    // If "Very High" doesn't exist, select the last radio in the group (assuming it represents the highest option)
                    if (radiosInGroup.length > 0) {
                        radiosInGroup[radiosInGroup.length - 1].checked = true;
                    }
                }
            }

            // Fill the comments box
            let commentsBox = document.getElementById('comments');
            if (commentsBox) {
                commentsBox.value = "none";
            }

            // Submit the survey
            document.getElementById('submit_survey').click();

            // Set the timeout for the next survey
            setTimeout(autoSurvey, 1000);
        }, 1000);
    }
}

autoSurvey();
      autoSurvey();
    }
  }
});
