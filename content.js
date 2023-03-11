chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "get_email_body") {
      var body = document.body.innerText;
      sendResponse({body: body});
    }
  });