document.addEventListener("DOMContentLoaded", () => {
  const fullText = "Enbest";
  let index = 0;
  let forward = true;

  function typeEffect() {
    if (forward) {
      document.title = fullText.substring(0, index + 1);
      index++;
      if (index >= fullText.length) {
        forward = false;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      document.title = fullText.substring(0, index);
      index--;
      if (index <= 0) {
        forward = true;
      }
    }
    setTimeout(typeEffect, 220);
  }

  typeEffect();

  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play");
  const seekbar = document.getElementById("seekbar");
  const current = document.getElementById("current");
  const duration = document.getElementById("duration");
  const playerContainer = document.querySelector(".player");
  const playIcon = playBtn.querySelector("i");

  audio.volume = 0.30;

  function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function updateDuration() {
    if (audio.duration && !isNaN(audio.duration)) {
      seekbar.max = Math.floor(audio.duration);
      duration.textContent = formatTime(audio.duration);
    }
  }

  audio.addEventListener("loadedmetadata", updateDuration);
  audio.addEventListener("durationchange", updateDuration);

  if (audio.readyState >= 1) {
    updateDuration();
  }

  audio.addEventListener("timeupdate", () => {
    seekbar.value = Math.floor(audio.currentTime);
    current.textContent = formatTime(audio.currentTime);
  });

  seekbar.addEventListener("input", () => {
    audio.currentTime = seekbar.value;
  });

  playBtn.addEventListener("click", togglePlay);

  function togglePlay() {
    if (audio.paused) {
      audio.play().then(() => {
        playIcon.className = "fa-solid fa-pause";
        playerContainer.classList.add("playing");
      }).catch(err => {
        console.log("Autoplay engellendi:", err);
      });
    } else {
      audio.pause();
      playIcon.className = "fa-solid fa-play";
      playerContainer.classList.remove("playing");
    }
  }
});
