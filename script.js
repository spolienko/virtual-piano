'use strict'
const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const notes = document.querySelector(".btn-notes");
const letters = document.querySelector(".btn-letters");
const fullScreenButton = document.querySelector(".fullscreen");

function startMusic(event) {
    if (event.target.classList.contains('piano-key')) {
        event.target.classList.remove('piano-key-remove-mouse');
        event.target.classList.add('piano-key-active');
        const note = event.target.dataset.key;
        const audioFile = document.querySelector(`audio[data-key="${note}"]`);
        playAudio(audioFile);
    }
}

function stopMusic(event) {
    event.target.classList.remove('piano-key-active');
    event.target.classList.remove('piano-key-active-pseudo');
    event.target.classList.add('piano-key-remove-mouse');
}

function StartClickOver(event) {
    if (event.target.classList.contains('piano-key')) {
        event.target.classList.remove('piano-key-remove-mouse');
        event.target.classList.add('piano-key-active');
    }
    pianoКeys.forEach(elem => {
        elem.addEventListener('mouseover', startMusic);
        elem.addEventListener('mouseout', stopMusic);
    })
}

function StopClickOver() {
    pianoКeys.forEach(elem => {
        elem.removeEventListener('mouseover', startMusic);
        elem.removeEventListener('mouseout', stopMusic);
    });
}

function StartKeyDown(event) {
    const elem = document.querySelector(`div[data-key="${event.which}"]`);
    if (elem === null)
        return;
    event.target.classList.remove('piano-key-remove-mouse');
    if (elem.classList.contains('sharp'))
        elem.classList.add('piano-key-active-pseudo');

    elem.classList.add('piano-key-active');
    const audioFile = document.querySelector(`audio[data-key="${event.which}"]`);
    if (window.event && 'repeat' in window.event) {
        if (window.event.repeat)
            return false;
    }
    if (audioFile)
        playAudio(audioFile);
}

function StopKeyDown(event) {
    const elem = document.querySelector(`div[data-key="${event.which}"]`);
    if (elem === null)
        return;
    elem.classList.remove('piano-key-active');
    if (elem.classList.contains('sharp'))
        elem.classList.remove('piano-key-active-pseudo');
    elem.classList.add('piano-key-remove-mouse');
}

function playAudio(audioFile) {
    audioFile.currentTime = 0;
    audioFile.play();
}

fullScreenButton.addEventListener("click", (event) => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

function notesChange(event) {
    event.target.classList.add("btn-active");
    letters.classList.remove("btn-active");
    pianoКeys.forEach((k) => {
        k.classList.remove("piano-key-letter");
    });
}

function lettersChange(event) {
    event.target.classList.add("btn-active");
    notes.classList.remove("btn-active");
    if (pianoКeys) {
        pianoКeys.forEach((k) => {
            k.classList.add("piano-key-letter");
        });
    }
}

letters.addEventListener("click", lettersChange);
notes.addEventListener("click", notesChange);
piano.addEventListener('mousedown', startMusic);
piano.addEventListener('mouseup', stopMusic);
piano.addEventListener('mousedown', StartClickOver, false);
window.addEventListener('mouseup', StopClickOver);
window.addEventListener('keydown', StartKeyDown, false);
window.addEventListener('keyup', StopKeyDown);
