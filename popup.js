document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#generate-response").addEventListener("click", function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "get_email_body"}, function(response) {
            console.log('het')
            console.log(response.body)
          var emailBody = response.body;
          console.log(emailBody)
          var prompt = emailBody + "\n\nQ:";
          console.log(prompt)
          var apiKey = "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";
          var apiUrl = "https://api.openai.com/v1/engines/davinci-codex/completions";
          var headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + apiKey
          };
          var data = {
            "prompt": prompt,
            "max_tokens": 1024,
            "temperature": 0.7,
            "stop": "\n"
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
          })
          .catch(error => {
            console.error(error);
          });
        });
      });
    });
  });