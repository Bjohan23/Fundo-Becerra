const socket = io();
socket.on("numUsers", function (numUsers) {
  // Actualiza la interfaz de usuario con el número de usuarios conectados
  document.querySelector("#numUsers").textContent = "🟢" + numUsers;
});

// full screen
document
  .getElementById("fullscreenButton")
  .addEventListener("click", function () {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  });
