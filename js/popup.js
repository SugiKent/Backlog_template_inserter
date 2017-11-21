function setList() {
  var listHtml = "";
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) == 'staffName') {
      continue;
    }
    if (localStorage.key(i) == 'defaultTemp') {
      continue;
    }

    var value = localStorage.getItem(localStorage.key(i));
    var obj = $.parseJSON(value);
    listHtml = listHtml + '<li class="List__item" data-id="'+localStorage.key(i)+'">'+obj.title+'</li>';
  }
  $('.List').html(listHtml);
}


$(function(){
  console.log(localStorage);
  setList();

  $('.Popup__link').on('lick',function(){
    chrome.tabs.create({'url': "/options.html" });
  });

  $('.List__item').on('click', function(){
    var keyId = $(this).attr('data-id');
    console.log(keyId);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        keyId: keyId
      },
      function(msg) {
      });
    });
    return false;
  });


});
