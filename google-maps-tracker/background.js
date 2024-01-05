chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    if (tab.url && tab.url.includes("www.google.com/maps")) {
      console.log("You have surfed for 2 hours.");
    }
  });
});

// let startTime;
// let isTracking = false;

// // Listen for tab focus changes
// chrome.tabs.onActivated.addListener(({ tabId }) => {
//   chrome.tabs.get(tabId, (tab) => {
//     console.log("Tab activated:", tab.url);

//     if (tab.url) {
//       if (tab.url.includes("https://www.google.com/maps")) {
//         startTime = new Date().getTime();
//         isTracking = true;
//         console.log("Tracking started");
//       } else {
//         if (isTracking) {
//           const endTime = new Date().getTime();
//           const durationInHours = Math.round((endTime - startTime) / (1000 * 60 * 60));

//           chrome.storage.local.get(["googleMapsTime"], (result) => {
//             const totalTime = result.googleMapsTime || 0;
//             chrome.storage.local.set({ googleMapsTime: totalTime + durationInHours });
//           });

//           isTracking = false;
//           console.log("Tracking stopped, duration:", durationInHours, "hours");
//         }
//       }
//     }
//   });
// });