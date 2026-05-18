# Focus Flow - Pomodoro Timer ⏱️

A beautiful, feature-rich Pomodoro timer application with ambient soundscapes and dynamic themes to enhance your productivity.

## Features

### 🎨 Dynamic Themes
- **Forest** 🌲 - Calming green tones
- **Ocean** 🌊 - Serene blue atmosphere
- **Café** ☕ - Warm coffee shop vibes
- **Rain** 🌧️ - Peaceful rainy day mood

### ⏰ Timer Functionality
- Customizable focus, short break, and long break durations
- Visual progress ring that tracks your session
- Automatic session transitions
- Pause and resume capability
- Desktop notifications when sessions complete

### 🔊 Ambient Sounds
- Each theme has its own unique ambient sound
- Adjustable volume control
- Toggle sounds on/off
- Uses Web Audio API for smooth audio generation

### 📊 Statistics Tracking
- Sessions completed counter
- Total minutes worked tracker
- Persistent stats during your session

### 🎯 Pomodoro Technique
- Standard Pomodoro workflow: 25-5-25-5-25-5-25-15
- After 4 focus sessions, enjoy a longer break
- Fully customizable session lengths

## How to Use

1. **Open the App**
   - Simply open `index.html` in any modern web browser
   - No server or build process required!

2. **Choose Your Theme**
   - Click on any theme button (Forest, Ocean, Café, Rain)
   - The entire interface and ambient sound will change

3. **Customize Your Sessions**
   - Adjust focus time (default: 25 minutes)
   - Adjust short break (default: 5 minutes)
   - Adjust long break (default: 15 minutes)

4. **Start Focusing**
   - Click the **Start** button to begin your session
   - The timer will count down and ambient sounds will play
   - The progress ring shows your progress visually

5. **Control Your Session**
   - **Pause**: Temporarily stop the timer
   - **Reset**: Go back to the beginning of current session

6. **Sound Controls**
   - Toggle the checkbox to enable/disable ambient sounds
   - Use the slider to adjust volume

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS custom properties (variables)
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Web Audio API** - For generating ambient soundscapes

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with ES6 support

### Key Features
- Responsive design (works on mobile and desktop)
- CSS custom properties for dynamic theming
- Object-oriented JavaScript architecture
- Web Audio API for ambient sound generation
- Progress ring using SVG and stroke manipulation
- Local state management (no external libraries)

## File Structure

```
focus-flow/
├── index.html      # Main HTML structure
├── styles.css      # All styling and themes
├── script.js       # Timer logic and functionality
└── README.md       # This file
```

## Customization Ideas

Want to extend this project? Here are some ideas:

1. **Add More Themes**
   - Edit the CSS to add new color schemes
   - Add corresponding sounds in the JavaScript

2. **Save Stats to LocalStorage**
   - Persist session data between browser sessions
   - Add weekly/monthly statistics

3. **Add Music Integration**
   - Connect to Spotify/YouTube API
   - Play actual nature sounds or lo-fi beats

4. **Task Management**
   - Add a to-do list
   - Associate timers with specific tasks

5. **Data Visualization**
   - Add charts showing productivity over time
   - Heatmap calendar of completed sessions

## The Pomodoro Technique

The Pomodoro Technique is a time management method developed by Francesco Cirillo:

1. Choose a task to work on
2. Set a timer for 25 minutes (one "Pomodoro")
3. Work on the task until the timer rings
4. Take a 5-minute break
5. After 4 Pomodoros, take a longer 15-30 minute break

This technique helps maintain focus and prevent burnout!

## License

This project is open source and available for anyone to use, modify, and learn from.

## Credits

Created as a demonstration of vanilla JavaScript skills, combining:
- Time management principles
- Modern CSS techniques
- Web Audio API
- Clean, maintainable code

---

**Happy focusing! 🎯**
