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
  if (text.length === 0) return text;
	const key = 'AIzaSyDbV1aKClP_7OG5xi89FciroPnUPPU2gWw';
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

chrome.runtime.onMessage.addListener(
  function(request, sender, res) {
    if (request.req == "show") {
			const text = getSelectionText();
			getFixedText(text).then((
        (fix) => {
          res({
            text: text,
            fix: fix
          });
        }
      ));
		}
		return true;
  }
);