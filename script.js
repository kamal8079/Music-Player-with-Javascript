console.log("Welcome to LoFi World...");
// Initialize the Variable 
let songIndex = 0;
let audioElement = new Audio('Audio/18.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "AGAR TUM SAATH HO", filePath: "Audio/1.mp3", coverPath: "covers/1.gif"},
    {songName: "GALAT BAAT HAI", filePath: "Audio/2.mp3", coverPath: "covers/1.gif"},
    {songName: "MAAN MERI JAAN", filePath: "Audio/3.mp3", coverPath: "covers/1.gif"},
    {songName: "DAKU", filePath: "Audio/4.mp3", coverPath: "covers/1.gif"},
    {songName: "FALAK TAK", filePath: "Audio/5.mp3", coverPath: "covers/1.gif"},
    {songName: "ISHQAM", filePath: "Audio/6.mp3", coverPath: "covers/1.gif"},
    {songName: "JADUGGAR", filePath: "Audio/7.mp3", coverPath: "covers/1.gif"},
    {songName: "KALANK", filePath: "Audio/8.mp3", coverPath: "covers/1.gif"},
    {songName: "KOI AYE NA RABBA", filePath: "Audio/9.mp3", coverPath: "covers/1.gif"},
    {songName: "LOVE DOSE", filePath: "Audio/10.mp3", coverPath: "covers/1.gif"},
    {songName: "AMPLIFIER", filePath: "Audio/11.mp3", coverPath: "covers/1.gif"},
    {songName: "MERE RASHKE QAMAR", filePath: "Audio/12.mp3", coverPath: "covers/1.gif"},
    {songName: "SAINYARRA", filePath: "Audio/13.mp3", coverPath: "covers/1.gif"},
    {songName: "NO-LOVE", filePath: "Audio/14.mp3", coverPath: "covers/1.gif"},
    {songName: "TERE MAST MAST DO", filePath: "Audio/15.mp3", coverPath: "covers/1.gif"},
    {songName: "TUM HI HO", filePath: "Audio/16.mp3", coverPath: "covers/1.gif"},
    {songName: "TUM JO AYE", filePath: "Audio/17.mp3", coverPath: "covers/1.gif"}
];

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play()
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause()
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-play')
        gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // Update Seekbar 
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

// 100 * currenttime/dura = per //currenttime = per * dura / 100
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if(audioElement.paused || audioElement.currentTime<=0)
        {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            audioElement.src = `Audio/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play')
            masterPlay.classList.add('fa-pause')
        }
        else{
            e.target.classList.remove('fa-circle-pause')
            e.target.classList.add('fa-circle-play')
            audioElement.currentTime = 0;
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause')
            masterPlay.classList.add('fa-play')
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9)
    {
        songIndex = 0;
    }
    else
    {
        songIndex += 1;
    }
        
    audioElement.src = `Audio/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0)
    {
        songIndex = 0;
    }
    else
    {
        songIndex -= 1;
    }
        
    audioElement.src = `Audio/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')

})

document.getElementById('10sP').addEventListener('click', ()=>{
    if(audioElement.currentTime>10)
    {
        audioElement.currentTime -= 10;
    }
})

document.getElementById('10sN').addEventListener('click', ()=>{
    audioElement.currentTime += 10;
})