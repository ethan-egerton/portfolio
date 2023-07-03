import { keyPress, keyUp, scroll } from "./keyHandler.mjs";
import { bootUp } from "./io.mjs"

document.addEventListener('keydown', function (event) { keyPress(event); });
document.addEventListener('keyup', function (event) { keyUp(event); });
window.addEventListener('wheel', function(event) { scroll(event); });

const AUDIO_VOLUME = 0;

window.addEventListener('load', function (event) {
    // Audio
    const startupAudio = new Audio('./assets/sounds/startup.mp3');
    const loopAudio = new Audio('./assets/sounds/loop.mp3');
    startupAudio.volume = AUDIO_VOLUME;
    loopAudio.volume = AUDIO_VOLUME;
    loopAudio.loop = true;
    startupAudio.onended = function() {
        loopAudio.play();
    }
    startupAudio.play();

    // Boot up
    bootUp();
});