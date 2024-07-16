/* 
 * Util for generating sound
*/

// Create audio context
let audioContext = null;

if (typeof window !== 'undefined') {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

export function generateSound(frequency, duration) {
    if (!audioContext) {
        console.error('AudioContext is not supported in this environment');
        return;
    }

    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine"; // "sine", "square", "sawtooth", "triangle"
    oscillator.frequency.value = frequency;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.1;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
    }, duration);
}

export function playSound(url) {
    if (!audioContext) {
        console.error('AudioContext is not supported in this environment');
        return;
    }

    const audio = new Audio(url);
    audio.play();
}