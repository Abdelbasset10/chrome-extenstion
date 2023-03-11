document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#generate-response").addEventListener("click", function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "get_email_body"}, function(response) {
            console.log(response)
          var emailBody = response.body;
          var apiKey = "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";
          var apiUrl = "https://api.openai.com/v1/completions";
          var headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
          };
          var data = {
            "prompt": "generate me reponse for this email : " + emailBody + "\n\nQ:",
            "max_tokens": 300,
            "model":"text-davinci-003",
            "temperature": 0.7,
          };
          fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
            var responseText = data.choices[0].text.trim();
            document.querySelector("#response").textContent = responseText;
            console.log(data)
          })
          .catch(error => {
            console.error(error);
          });
        });
      });
    });
  });
  

  