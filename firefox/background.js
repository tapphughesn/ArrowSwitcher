async function changeTab(amount) {
  const tabs = await browser.tabs.query({
    currentWindow: true
  });

  const activeIndex = tabs.findIndex(tab => tab.active);
  if (activeIndex === -1) return;

  const newIndex = activeIndex + amount;
  if (newIndex < 0 || newIndex >= tabs.length) return;

  await browser.tabs.update(tabs[newIndex].id, { active: true });
}

browser.commands.onCommand.addListener((command) => {
  if (command === "tab-left") {
    changeTab(-1);
  } else if (command === "tab-right") {
    changeTab(1);
  }
});
