const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

//Music
const songs = [
    {
        name: 'Harry Styles - As It Was',
        displayName: 'As It Was',
        artist: 'Harry Styles',
    },
    {
        name: 'The Weeknd - Save Your Tears',
        displayName: 'Save Your Tears',
        artist: 'The Weeknd',
    },
    {
        name: 'Sufjan Stevens - Mystery of Love',
        displayName: 'Mystery of Love',
        artist: 'Sufjan Stevens',
    },
    {
        name: 'Little Dark Age',
        displayName: 'Little Dark Age',
        artist: 'MGMT',
    }
];

//Check if Playing
let isPlaying = false;

//Play
function playSong(){
    music.play();
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
}

//Pause
function pauseSong(){
    music.pause();
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

//Play or Pausa Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `../music/${song.name}.mp3`;
    image.src = `../img/${song.name}.jpg`;
    if(image.src === undefined){
        console.log(1);
    }
}

let songIndex = 0;

//Previous Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load = Select First Song
loadSong(songs[songIndex]);

//Update progress Bar & Time
function updateProgressBar(e){
    if(isPlaying){
        const{ duration, currentTime } = e.srcElement;
        //Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }

        //Delay switching duration Element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        //Calculate display for duration
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//Set Progress Bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);