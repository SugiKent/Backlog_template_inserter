$('.js-Form__template--button').on('click',function (){
  var inputValue = "",
      inputData = "";
  if (getValue($('.js-Form__template:first')) == "") {
    alert('テンプレート名が空です。');
    return false;
  }
  if (getValue($('.js-Form__template:last')) == "") {
    alert('内容が空です。');
    return false;
  }

  inputData = '{"title": "'+getValue($('.js-Form__template:first'))+'", "content": "'+getValue($('.js-Form__template:last')).replace(/\r|\n|\r\n/g, '<br>')+'"}';
  saveData(inputData);

  $('.js-Form__template').val('');
  setList();
});

function getValue(elem) {
  inputValue = $(elem).val();
  return inputValue;
}

function saveData(data) {
  var id = localStorage.length + 1
  localStorage[id] = data;
}

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

    if (localStorage.getItem('defaultTemp') == localStorage.key(i)) {
      listHtml = listHtml + '<div class="Options__list" data-id="'+localStorage.key(i)+'"><b style="color: red;">'+obj.title+'　【デフォルト】</b><br>'+obj.content+'</div>';
    } else {
      listHtml = listHtml + '<div class="Options__list"><b>'+obj.title+'　</b><a class="js-Default__button" data-id="'+localStorage.key(i)+'">デフォルトにする</a>　<a class="js-Remove__button" data-id="'+localStorage.key(i)+'">削除する</a><br>'+obj.content+'</div>';
    }


  }
  $('.js-Options__template').html(listHtml);
}

function clearAll() {
  localStorage.clear();
  setList();
}


// 以下担当者
$('.js-Form__staff--button').on('click',function (){
  var inputValue = "",
      inputData = "";
  if (getValue($('.js-Form__staff:first')) == "") {
    alert('担当者名が空です。');
    return false;
  }

  inputData = getValue($('.js-Form__staff:first'));
  saveStaff(inputData);

  $('.js-Form__staff').val('');
  setStaff();
});

function saveStaff(data) {
  localStorage['staffName'] = data;
}

function setStaff() {
  var staffName = localStorage.getItem('staffName');
  if (staffName != null) {
    $('.js-Options__staff').html('<li class="Options__list">'+staffName+'</li>');
  }
}

// 以下デフォルトテンプレート設定
$(document).on('click', ".js-Default__button",function (){
  var inputValue = "",
      inputData = "";

  inputData = $(this).attr('data-id');
  saveDefault(inputData);
  setList();
});

// デフォルトテンプレートを保存する
// テンプレのキーを渡す
function saveDefault(data) {
  localStorage['defaultTemp'] = data;
}


// 削除ロジック

$(document).on('click', ".js-Remove__button", function(){
  var targetId = $(this).attr('data-id');
  removeData(targetId);
  setList();
});

// Keyを渡す
function removeData(data) {
  localStorage.removeItem(data);
}


$(function(){
  setList();
  setStaff();

  $('.Options__clear').on('click', function(){
    clearAll();
  });
});
