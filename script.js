// ========================================
// GET HTML ELEMENTS
// ========================================

const audio = document.getElementById("audio");

const playButton = document.getElementById("playButton");

const previousButton = document.getElementById("previousButton");

const nextButton = document.getElementById("nextButton");

const progress = document.getElementById("progress");

const progressContainer =
    document.getElementById("progressContainer");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const volume =
    document.getElementById("volume");

const volumeButton =
    document.getElementById("volumeButton");

const album =
    document.querySelector(".album");

const albumImage =
    document.getElementById("albumImage");

const songTitle =
    document.querySelector(".song-info h1");

const artist =
    document.querySelector(".song-info p");

const visualizer =
    document.getElementById("visualizer");

const playlistItems =
    document.querySelectorAll(".playlist-item");


// ========================================
// SONG LIST
// ========================================

const songs = [

    {
        title:
            "Aankhon Se Tune 2.0",

        artist:
            "Aankhon Se Tune 2.0",

        image:
            "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",

        audio:
            "aankhon-se-tune.mp3"
    },


    {
        title:
            "SoundHelix Dream",

        artist:
            "Demo Artist",

        image:
            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",

        audio:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },


    {
        title:
            "Night Music",

        artist:
            "Demo Artist",

        image:
            "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",

        audio:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }

];


// ========================================
// CURRENT SONG
// ========================================

let currentSong = 0;


// ========================================
// LOAD SONG
// ========================================

function loadSong(index) {

    currentSong = index;

    const song =
        songs[currentSong];


    // Update title

    songTitle.textContent =
        song.title;


    // Update artist

    artist.textContent =
        song.artist;


    // Update artwork

    albumImage.src =
        song.image;


    // Update audio

    audio.src =
        song.audio;


    // Reset progress

    progress.style.width =
        "0%";


    // Reset time

    currentTime.textContent =
        "0:00";


    duration.textContent =
        "0:00";


    // Update playlist

    playlistItems.forEach(
        function(item, itemIndex) {

            if (
                itemIndex === currentSong
            ) {

                item.classList.add(
                    "active"
                );

            } else {

                item.classList.remove(
                    "active"
                );

            }

        }
    );

}


// ========================================
// PLAY / PAUSE
// ========================================

playButton.addEventListener(
    "click",
    function() {

        if (audio.paused) {

            audio.play();

            playButton.textContent =
                "❚❚";

            album.classList.add(
                "playing"
            );

            visualizer.classList.add(
                "playing"
            );

        } else {

            audio.pause();

            playButton.textContent =
                "▶";

            album.classList.remove(
                "playing"
            );

            visualizer.classList.remove(
                "playing"
            );

        }

    }
);


// ========================================
// NEXT SONG
// ========================================

nextButton.addEventListener(
    "click",
    function() {

        currentSong++;

        if (
            currentSong >= songs.length
        ) {

            currentSong = 0;

        }

        loadSong(currentSong);

        audio.play();

        playButton.textContent =
            "❚❚";

        album.classList.add(
            "playing"
        );

        visualizer.classList.add(
            "playing"
        );

    }
);


// ========================================
// PREVIOUS SONG
// ========================================

previousButton.addEventListener(
    "click",
    function() {

        currentSong--;

        if (
            currentSong < 0
        ) {

            currentSong =
                songs.length - 1;

        }

        loadSong(currentSong);

        audio.play();

        playButton.textContent =
            "❚❚";

        album.classList.add(
            "playing"
        );

        visualizer.classList.add(
            "playing"
        );

    }
);


// ========================================
// UPDATE PROGRESS
// ========================================

audio.addEventListener(
    "timeupdate",
    function() {

        if (!audio.duration) {

            return;

        }

        const percentage =
            (
                audio.currentTime /
                audio.duration
            ) * 100;

        progress.style.width =
            percentage + "%";

        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


// ========================================
// SONG DURATION
// ========================================

audio.addEventListener(
    "loadedmetadata",
    function() {

        duration.textContent =
            formatTime(
                audio.duration
            );

    }
);


// ========================================
// PROGRESS BAR CLICK
// ========================================

progressContainer.addEventListener(
    "click",
    function(event) {

        if (!audio.duration) {

            return;

        }

        const width =
            progressContainer.clientWidth;

        const clickPosition =
            event.offsetX;

        audio.currentTime =
            (
                clickPosition /
                width
            ) * audio.duration;

    }
);


// ========================================
// VOLUME
// ========================================

volume.addEventListener(
    "input",
    function() {

        audio.volume =
            volume.value;

    }
);


// ========================================
// MUTE / UNMUTE
// ========================================

volumeButton.addEventListener(
    "click",
    function() {

        if (audio.muted) {

            audio.muted = false;

            volumeButton.textContent =
                "🔊";

        } else {

            audio.muted = true;

            volumeButton.textContent =
                "🔇";

        }

    }
);


// ========================================
// PLAYLIST
// ========================================

playlistItems.forEach(
    function(item) {

        item.addEventListener(
            "click",
            function() {

                const index =
                    Number(
                        item.dataset.index
                    );

                loadSong(index);

                audio.play();

                playButton.textContent =
                    "❚❚";

                album.classList.add(
                    "playing"
                );

                visualizer.classList.add(
                    "playing"
                );

            }
        );

    }
);


// ========================================
// AUTO NEXT
// ========================================

audio.addEventListener(
    "ended",
    function() {

        nextButton.click();

    }
);


// ========================================
// FORMAT TIME
// ========================================

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const secondsRemaining =
        Math.floor(seconds % 60);

    return (
        minutes +
        ":" +
        secondsRemaining
            .toString()
            .padStart(2, "0")
    );

}


// ========================================
// KEYBOARD CONTROLS
// ========================================

document.addEventListener(
    "keydown",
    function(event) {

        // SPACE = PLAY / PAUSE

        if (
            event.code === "Space"
        ) {

            event.preventDefault();

            playButton.click();

        }


        // RIGHT ARROW = FORWARD 5 SEC

        if (
            event.code === "ArrowRight"
        ) {

            if (audio.duration) {

                audio.currentTime =
                    Math.min(
                        audio.duration,
                        audio.currentTime + 5
                    );

            }

        }


        // LEFT ARROW = BACK 5 SEC

        if (
            event.code === "ArrowLeft"
        ) {

            audio.currentTime =
                Math.max(
                    0,
                    audio.currentTime - 5
                );

        }


        // UP ARROW = VOLUME UP

        if (
            event.code === "ArrowUp"
        ) {

            audio.volume =
                Math.min(
                    1,
                    audio.volume + 0.1
                );

            volume.value =
                audio.volume;

        }


        // DOWN ARROW = VOLUME DOWN

        if (
            event.code === "ArrowDown"
        ) {

            audio.volume =
                Math.max(
                    0,
                    audio.volume - 0.1
                );

            volume.value =
                audio.volume;

        }

    }
);


// ========================================
// LOAD FIRST SONG
// ========================================

loadSong(0);