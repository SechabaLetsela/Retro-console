// --- CRT HUM AUDIO ---
let audioContext;
let humStarted = false;

function startCRTHum() {
    if (humStarted) return;
    humStarted = true;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Main 60Hz hum
    let humOscillator = audioContext.createOscillator();
    humOscillator.type = 'sine';
    humOscillator.frequency.setValueAtTime(60, audioContext.currentTime);
    let humGain = audioContext.createGain();
    humGain.gain.setValueAtTime(0.03, audioContext.currentTime); 
    
    // 120Hz harmonic
    let harmonicOsc = audioContext.createOscillator();
    harmonicOsc.type = 'sine';
    harmonicOsc.frequency.setValueAtTime(120, audioContext.currentTime); 
    let harmonicGain = audioContext.createGain();
    harmonicGain.gain.setValueAtTime(0.015, audioContext.currentTime); 
    
    // LFO for organic fluctuation
    let lfo = audioContext.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.5, audioContext.currentTime); 
    let lfoGain = audioContext.createGain();
    lfoGain.gain.setValueAtTime(0.02, audioContext.currentTime); 
    
    // Connect everything
    lfo.connect(lfoGain);
    lfoGain.connect(humGain.gain);
    humOscillator.connect(humGain);
    harmonicOsc.connect(harmonicGain);
    humGain.connect(audioContext.destination);
    harmonicGain.connect(audioContext.destination);
    
    humOscillator.start();
    harmonicOsc.start();
    lfo.start();
}

// Start the hum on the FIRST user interaction
document.addEventListener('click', startCRTHum, { once: true });
document.addEventListener('keydown', startCRTHum, { once: true });
document.addEventListener('touchstart', startCRTHum, { once: true });