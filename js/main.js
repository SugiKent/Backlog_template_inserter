$(function(){
  chrome.runtime.sendMessage({method: "getLocalStorage", key: 'defaultTemp'}, function(response) {
    setContent(response.data);
  });

});

// デフォルト担当者を設定
// TODO デフォルトの担当者を設定できる様にする
// $(window).load(function(){
//   chrome.runtime.sendMessage({method: "getLocalStorage", key: 'staffName'}, function(response) {
//     setStaff(response.data);
//   });
// });


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  setContent(msg.keyId)

});

function setContent(id) {
  chrome.runtime.sendMessage({method: "getLocalStorage", key: id}, function(response) {
    var content = "";
    var obj = $.parseJSON(response.data);

    content = obj.content.replace(/<br>/g, '\n');
    $('#descriptionTextArea').text(content);
  });
}

function setStaff(staffName) {
  // $("select[name = 'issue.assignerId']").show(); // 必要はない。

  setTimeout(function(){
    var val = $("option[keyword*='" + staffName + "']").val();
    $("select[name = 'issue.assignerId']").val(val).change();
    $("select[name = 'issue.assignerId']").change();
  },10000);
}
