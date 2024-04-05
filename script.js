const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closeMoreMusic = wrapper.querySelector("#close");
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;
window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playingSong();
});
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}
function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = all.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}
function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPlay = wrapper.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});
prevBtn.addEventListener("click", ()=>{
    nextMusic();
});
mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}`;
    let musicCurrentTime = wrapper.querySelector(".current-time"),
    musicDuration = wrapper.querySelector(".max-duration");
    mainAudio.addEventListener("loadedarea", ()=>{
        let mainDuration = mainAudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10){
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});
progressArea.addEventListener("click", (e)=>{
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedoffsetX / progressWidth) * songDuration;
    playMusic();
    playingSong();
});
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
    let getText = repeatBtn.innerText;
    switch(getText){
        repeatBtn.innerText = "repeat_one";
        repeatBtn.setAttribute("title", "song looped");
        break;
        case "repeat_one";
        repeatBtn.innerText = "shuffle";
        repeatBtn.setAttribute("title", "playback shuffled");
        break;
    }
});
mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
            nextMusic();
            break;
            case "repeat_one":
                mainAudio.currentTime = 0;
                loadMusic();
                playMusic();
                break;
                case "shuffle":
                    let randIndex = math.floor((Math.random() * allMusic.length) + 1);
                    do{
                        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
                    }while(musicIndex == randIndex);
                    musicIndex = randIndex;
                    loadMusic(musicIndex);
                    playMusic();
                    break;
    }
});
moreMusicBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});
closeMoreMusic.addEventListener("click", ()=>{
    moreMusicBtn.click();
});
const ulTag = e.querySelector("ul");
for (let i = 0; i < allMusic.length i++) {
    let liTag = `<li li-index="${i + 1}">
                  <div class="row">
                    <span${allMusic[i].name}</span>
                     <p${allMusic[i].artist}</p>
                     </div>
                     <span class="${allMusic[i].src}" class="audio-duration">3:40</span>
                     <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                     </li>`;
        ulTag.insertAdjacentHTML("beforeend", liTag);
        let liAudioDuration = ul.Tag.querySelector(`#${allMusic[i].src}`);
        let liAudioTag = ul.Tag.querySelector(`.${allMusic[i].src}`);
        liAudioTag.add("loadedData", ()=>{
            let duration = liAudioTag.duration;
            let totalMin = Math.floor(duration / 60);
            let totalSec = Math.floor(duration % 60);
            if(totalSec < 10){
                totalSec = `0${totalSec}`;
            };
            liAudioDuration.innerText = `${totalMin}:${totalSec}`;
            liAudioDuration.setAttribute.setAttribute("t-duration", `${totalMin}:${totalSec}`);
        });
}
function playingSong(){
    const allLiTag = ul.Tag.querySelectorAll("li");
    for(let j =  0; j < allLiTag.length; j++){
        let audioTag = allLiTag[j].querySelector(".audio-duration");
        if(allLiTag[j].classList.contains("playing")){
            allLiTag[j].classList.remove("playing");
            audioTag.innerText = adDuration;
        }
        if(allLiTag[j].getAttrbute("li-index") == musicIndex){
            allLiTag[j].classList.add("playing");
            audioTag.innerText = "playing";
        }
        allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
}
function clicked(element){
    let getIndex = element.getAttrbute("li-index");
    musicIndex = getIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}