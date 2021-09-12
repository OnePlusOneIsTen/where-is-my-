chrome.commands.onCommand.addListener(async (command) => {
  if (command == 'run') {
    console.log(`Command "${command}" triggered`);
    const tab = await getCurrentTab().catch(() => {});
    if (tab === null || tab.url.startsWith('chrome://')) {
      return;
    }
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  }
});

async function getCurrentTab() {
  let args = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(args);
  return tab;
}