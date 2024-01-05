const secondsBefore2024 = 1300000;

chrome.storage.local.get(["googleMapsTime"]).then((result) => {
  const totalTime = secondsBefore2024 + (result.googleMapsTime ? result.googleMapsTime : 0);
  document.getElementById("duration").innerText = `${Math.floor(totalTime / 60 / 60)} hours ${Math.floor(totalTime / 60) % 60} minutes ${totalTime % 60} seconds`;
});