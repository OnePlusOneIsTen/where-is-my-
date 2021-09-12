const text = document.getElementById('text');
const fix = document.getElementById('fix');

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  if (tabs.length === 0 || tabs[0].url.startsWith('chrome://')) {
      return;
    }
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    files: ['show.js']
  });
  chrome.tabs.sendMessage(tabs[0].id, {req: "show"}, function(res) {
    text.textContent = res.text ? res.text : 'no text selected';
    fix.textContent = res.fix;
  });
});