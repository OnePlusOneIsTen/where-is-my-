function run(text) {
  var field = document.activeElement;
  console.log(field);
  if (field.selectionStart != undefined) {
  	var start = field.selectionStart;
    var end = field.selectionEnd;
    selectedText = field.value.substring(start, end);
    field.value = field.value.slice(0, start) + text + field.value.slice(end);
  }
}

function getSelectionText() {
	var text = "";
	if (window.getSelection) {
		text = window.getSelection().toString();
	} 
  else if (document.selection) {
		text = document.selection.createRange().text;
	}
	return text;
}

function strcon(givenString) {
	var b = '';
	var a = givenString;
	for (i = 0; i < a.length; i++) {
		if (a.charCodeAt(i) >= 65 && a.charCodeAt(i) <= 90) {
			b = b + a.charAt(i).toLowerCase();
		}
		else
			b = b + a.charAt(i).toUpperCase();
	}
	return b;
}

run(strcon(getSelectionText()));
