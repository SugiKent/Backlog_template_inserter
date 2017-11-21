chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.method) {
    case 'getLocalStorage':
      sendResponse({data: localStorage.getItem(request.key, request.value)});
      break;
  }
});
