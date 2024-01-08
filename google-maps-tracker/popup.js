const secondsBefore2024 = 13000000;

chrome.storage.local.get(["googleMapsTime"]).then((result) => {
  const totalTime = secondsBefore2024 + (result.googleMapsTime ? result.googleMapsTime : 0);
  document.getElementById("hours").innerText = `${Math.floor(totalTime / 60 / 60)}`;
  document.getElementById("minutes").innerText = `${Math.floor(totalTime / 60) % 60}`;
  document.getElementById("seconds").innerText =`${totalTime % 60}`;
});