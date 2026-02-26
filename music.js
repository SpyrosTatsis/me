document.addEventListener("DOMContentLoaded", function () {

    const playlist = [
        {
            title: "Sewerslvt - Oni",
            src: "Sewerslvt - Oni.mp3"
        },
        {
            title: "Nihigo - Angelic",
            src: "Nihigo - Angelic.mp3"
        },
        {
            title: "Hkmori - Anybody Can Find Love(Except You)",
            src: "Anybody Can Find Love (except you.).mp3"
        },
        {
            title: "Yion - Stuck in Jungle",
            src: "Stuck in Jungle.mp3"
        },
        {
            title: "strxwberryPILK",
            src: "strxwberryPILK.mp3"
        },
    ];

    let currentSong = 0;

    const audio = document.getElementById("audioPlayer");
    const songTitle = document.getElementById("songTitle");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const progressBar = document.getElementById("progressBar");

    if (!audio) return; 

    function loadSong(index) {
        audio.src = playlist[index].src;
        songTitle.textContent = playlist[index].title;
    }

    function playSong() {
        audio.play();
        playPauseBtn.textContent = "⏸";
    }

    function pauseSong() {
        audio.pause();
        playPauseBtn.textContent = "▶";
    }

    playPauseBtn.addEventListener("click", function () {
        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }
    });

    nextBtn.addEventListener("click", function () {
        currentSong = (currentSong + 1) % playlist.length;
        loadSong(currentSong);
        playSong();
    });

    prevBtn.addEventListener("click", function () {
        currentSong = (currentSong - 1 + playlist.length) % playlist.length;
        loadSong(currentSong);
        playSong();
    });

    audio.addEventListener("timeupdate", function () {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;

        progressBar.style.background = `linear-gradient(to right, #108b0c ${progressPercent}%, #222 ${progressPercent}%)`;
           
    }
});


progressBar.addEventListener("input", function () {
    if (audio.duration) {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    }
});
    
    
    
    
    audio.addEventListener("ended", function () {
        currentSong = (currentSong + 1) % playlist.length;
        loadSong(currentSong);
        playSong();
    });
    loadSong(currentSong);
    audio.volume = 0.2;
});