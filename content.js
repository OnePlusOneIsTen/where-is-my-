function run(text) {
  var field = document.activeElement;
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

async function getFixedText(text) {
	const key = 'AIzaSyDOR3ePwuV4MCa8PXsjGJ8qzG8tvKWCSGE';
	const cx = '14ba5b48935534e05';
	const rootUrl = 'https://www.googleapis.com/customsearch/v1';
	const url = `${rootUrl}?key=${key}&cx=${cx}&q=${text}`;
	try {
		const res = await (await fetch(url)).json();
		if (res.spelling)
			return res.spelling.correctedQuery;
	} catch (e) {}
	return text;
}

getFixedText(getSelectionText()).then(
	(fixedText) => run(fixedText)
);