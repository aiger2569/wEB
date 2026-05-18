class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // seconds
        this.totalTime = 25 * 60;
        this.isRunning = false;
        this.timerInterval = null;
        this.currentMode = 'focus'; // focus, shortBreak, longBreak
        this.sessionsCompleted = 0;
        this.totalMinutesWorked = 0;
        this.currentTheme = 'forest';
        
        this.sounds = {
            forest: { frequency: 200, type: 'sine' },
            ocean: { frequency: 150, type: 'sine' },
            cafe: { frequency: 300, type: 'triangle' },
            rain: { frequency: 100, type: 'sine' }
        };
        
        this.audioContext = null;
        this.oscillator = null;
        this.gainNode = null;
        
        this.initElements();
        this.initEventListeners();
        this.initAudio();
        this.updateDisplay();
    }
    
    initElements() {
        this.timeDisplay = document.getElementById('timeDisplay');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.focusTimeInput = document.getElementById('focusTime');
        this.shortBreakInput = document.getElementById('shortBreak');
        this.longBreakInput = document.getElementById('longBreak');
        this.modeText = document.querySelector('.mode-text');
        this.progressCircle = document.getElementById('progressCircle');
        this.sessionsDisplay = document.getElementById('sessionsCompleted');
        this.totalMinutesDisplay = document.getElementById('totalMinutes');
        this.soundToggle = document.getElementById('soundToggle');
        this.volumeControl = document.getElementById('volumeControl');
        this.timerDisplayEl = document.querySelector('.timer-display');
    }
    
    initEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.changeTheme(e.target.dataset.theme);
            });
        });
        
        this.focusTimeInput.addEventListener('change', () => this.updateTimeSettings());
        this.shortBreakInput.addEventListener('change', () => this.updateTimeSettings());
        this.longBreakInput.addEventListener('change', () => this.updateTimeSettings());
        
        this.soundToggle.addEventListener('change', () => this.toggleSound());
        this.volumeControl.addEventListener('input', () => this.updateVolume());
    }
    
    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.gainNode = this.audioContext.createGain();
            this.gainNode.connect(this.audioContext.destination);
            this.updateVolume();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    changeTheme(theme) {
        this.currentTheme = theme;
        document.body.setAttribute('data-theme', theme);
        
        if (this.isRunning && this.soundToggle.checked) {
            this.stopSound();
            this.playSound();
        }
    }
    
    playSound() {
        if (!this.audioContext || !this.soundToggle.checked) return;
        
        try {
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            this.oscillator = this.audioContext.createOscillator();
            const sound = this.sounds[this.currentTheme];
            
            this.oscillator.type = sound.type;
            this.oscillator.frequency.setValueAtTime(sound.frequency, this.audioContext.currentTime);
            
            // Add some variation
            this.oscillator.frequency.setValueAtTime(
                sound.frequency * 1.1,
                this.audioContext.currentTime + 2
            );
            
            this.oscillator.connect(this.gainNode);
            this.oscillator.start();
        } catch (e) {
            console.log('Error playing sound:', e);
        }
    }
    
    stopSound() {
        if (this.oscillator) {
            try {
                this.oscillator.stop();
                this.oscillator.disconnect();
                this.oscillator = null;
            } catch (e) {
                console.log('Error stopping sound:', e);
            }
        }
    }
    
    toggleSound() {
        if (this.isRunning) {
            if (this.soundToggle.checked) {
                this.playSound();
            } else {
                this.stopSound();
            }
        }
    }
    
    updateVolume() {
        if (this.gainNode) {
            const volume = this.volumeControl.value / 100;
            this.gainNode.gain.setValueAtTime(volume * 0.1, this.audioContext.currentTime);
        }
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.timerDisplayEl.classList.add('active');
        
        this.playSound();
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.completeSession();
            }
        }, 1000);
    }
    
    pause() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.timerDisplayEl.classList.remove('active');
        
        clearInterval(this.timerInterval);
        this.stopSound();
    }
    
    reset() {
        this.pause();
        this.updateTimeSettings();
        this.updateDisplay();
    }
    
    updateTimeSettings() {
        if (this.isRunning) return;
        
        const focusMinutes = parseInt(this.focusTimeInput.value) || 25;
        const shortBreakMinutes = parseInt(this.shortBreakInput.value) || 5;
        const longBreakMinutes = parseInt(this.longBreakInput.value) || 15;
        
        if (this.currentMode === 'focus') {
            this.timeLeft = focusMinutes * 60;
            this.totalTime = focusMinutes * 60;
        } else if (this.currentMode === 'shortBreak') {
            this.timeLeft = shortBreakMinutes * 60;
            this.totalTime = shortBreakMinutes * 60;
        } else {
            this.timeLeft = longBreakMinutes * 60;
            this.totalTime = longBreakMinutes * 60;
        }
    }
    
    completeSession() {
        this.pause();
        
        if (this.currentMode === 'focus') {
            this.sessionsCompleted++;
            this.totalMinutesWorked += parseInt(this.focusTimeInput.value);
            this.updateStats();
            
            // Determine next break type
            if (this.sessionsCompleted % 4 === 0) {
                this.switchMode('longBreak');
            } else {
                this.switchMode('shortBreak');
            }
            
            this.showNotification('Focus session complete! Time for a break.');
        } else {
            this.switchMode('focus');
            this.showNotification('Break over! Ready to focus?');
        }
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        
        if (mode === 'focus') {
            this.modeText.textContent = 'Focus Time';
            this.timeLeft = parseInt(this.focusTimeInput.value) * 60;
            this.totalTime = parseInt(this.focusTimeInput.value) * 60;
        } else if (mode === 'shortBreak') {
            this.modeText.textContent = 'Short Break';
            this.timeLeft = parseInt(this.shortBreakInput.value) * 60;
            this.totalTime = parseInt(this.shortBreakInput.value) * 60;
        } else {
            this.modeText.textContent = 'Long Break';
            this.timeLeft = parseInt(this.longBreakInput.value) * 60;
            this.totalTime = parseInt(this.longBreakInput.value) * 60;
        }
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress circle
        const progress = 1 - (this.timeLeft / this.totalTime);
        const circumference = 2 * Math.PI * 140; // radius = 140
        const offset = circumference - (progress * circumference);
        this.progressCircle.style.strokeDashoffset = offset;
        
        // Update page title
        document.title = `${this.timeDisplay.textContent} - Focus Flow`;
    }
    
    updateStats() {
        this.sessionsDisplay.textContent = this.sessionsCompleted;
        this.totalMinutesDisplay.textContent = this.totalMinutesWorked;
    }
    
    showNotification(message) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Focus Flow', {
                body: message,
                icon: '🍅'
            });
        } else {
            alert(message);
        }
    }
}

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Initialize the timer when the page loads
const timer = new PomodoroTimer();
