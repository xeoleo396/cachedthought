
document.querySelectorAll(".aero-player").forEach(player => {
    if (player.dataset.initialized) return;
    player.dataset.initialized = "true";

    const audio = player.querySelector(".aero-audio");
    const playButton = player.querySelector(".aero-play");
    const progress = player.querySelector(".aero-progress");
    const volume = player.querySelector(".aero-volume");

    const currentTime = player.querySelector(".aero-current");
    const duration = player.querySelector(".aero-duration");

    function formatTime(seconds) {
        if (!Number.isFinite(seconds)) return "0:00";

        const minutes = Math.floor(seconds / 60);
        const remaining = Math.floor(seconds % 60);

        return `${minutes}:${String(remaining).padStart(2, "0")}`;
    }

    playButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener("play", () => {
        playButton.textContent = "Ⅱ";
        playButton.setAttribute("aria-label", "Pause");
        player.classList.add("is-playing");
    });

    audio.addEventListener("pause", () => {
        playButton.textContent = "▶";
        playButton.setAttribute("aria-label", "Play");
        player.classList.remove("is-playing");
    });

    audio.addEventListener("loadedmetadata", () => {
        duration.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
        currentTime.textContent = formatTime(audio.currentTime);

        if (Number.isFinite(audio.duration) && audio.duration > 0) {
            progress.value = (audio.currentTime / audio.duration) * 100;
        }
    });

    progress.addEventListener("input", () => {
        if (Number.isFinite(audio.duration)) {
            audio.currentTime = (progress.value / 100) * audio.duration;
        }
    });

    volume.addEventListener("input", () => {
        audio.volume = Number(volume.value);
    });

    audio.volume = 0.8;

    audio.addEventListener("ended", () => {
        progress.value = 0;
    });
});
