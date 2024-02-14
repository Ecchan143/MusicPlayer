const musicPlayer = document.getElementById('musicPlayer');
const nextButton = document.getElementById('nextButton');
const toggleRandomButton = document.getElementById('toggleRandom');
const currentMusicLabel = document.getElementById('currentMusicLabel');
const playlist = document.getElementById('playlist');

let isRandom = false;
let currentMusicIndex = 0;

const musicSources = [
    'music1.mp3',
    'music2.mp3',
    'music3.mp3',
    'music4.mp3',
    'music5.mp3',
    'music6.mp3',
    'music7.mp3',
    'music8.mp3',
    'music9.mp3',
    'music10.mp3',
];

function updateCurrentMusicLabel(index) {
    const selectedMusicSource = musicSources[index];
    currentMusicLabel.textContent = `Current Music: ${selectedMusicSource}`;
}

function generatePlaylist() {
    playlist.innerHTML = '';

    musicSources.forEach((musicSource, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Music ${index + 1}`;
        listItem.setAttribute('data-index', index);

        listItem.addEventListener('click', () => {
            playSpecificMusic(index);
        });

        playlist.appendChild(listItem);
    });
}

function playSpecificMusic(index) {
    currentMusicIndex = index;
    const selectedMusicSource = musicSources[currentMusicIndex];
    musicPlayer.src = selectedMusicSource;

    updateCurrentMusicLabel(index);

    document.querySelectorAll('#playlist li').forEach(item => {
        item.classList.remove('playing');
    });

    playlist.children[currentMusicIndex].classList.add('playing');

    musicPlayer.play();
}

musicPlayer.addEventListener('ended', () => {
    playNextMusic();
});

function playNextMusic() {
    const randomIndex = Math.floor(Math.random() * musicSources.length);

    if (isRandom) {
        currentMusicIndex = (randomIndex !== currentMusicIndex) ? randomIndex : (randomIndex + 1) % musicSources.length;
    } else {
        currentMusicIndex = (currentMusicIndex + 1) % musicSources.length;
    }

    const nextMusicSource = musicSources[currentMusicIndex];
    musicPlayer.src = nextMusicSource;

    updateCurrentMusicLabel(currentMusicIndex);

    document.querySelectorAll('#playlist li').forEach(item => {
        item.classList.remove('playing');
    });

    playlist.children[currentMusicIndex].classList.add('playing');

    musicPlayer.play();
}

const backButton = document.getElementById('backButton');

backButton.addEventListener('click', playPreviousMusic);

function playPreviousMusic() {
    currentMusicIndex = (currentMusicIndex - 1 + musicSources.length) % musicSources.length;
    const previousMusicSource = musicSources[currentMusicIndex];
    musicPlayer.src = previousMusicSource;

    updateCurrentMusicLabel(currentMusicIndex);

    document.querySelectorAll('#playlist li').forEach(item => {
        item.classList.remove('playing');
    });

    playlist.children[currentMusicIndex].classList.add('playing');

    musicPlayer.play();
}


nextButton.addEventListener('click', playNextMusic);
toggleRandomButton.addEventListener('click', () => {
    isRandom = !isRandom;
    toggleRandomButton.textContent = isRandom ? 'Shuffle On' : 'Shuffle Off';
});

playNextMusic();
generatePlaylist();
