# 🎰 Spin Wheel Web App - React Native

A beautiful and interactive single-page spin wheel web application built with React Native, featuring customizable categories, stunning animations, and immersive sound effects.

![Spin Wheel App](https://img.shields.io/badge/React%20Native-0.72+-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

### 🎯 Core Functionality
- **Dual Spin Wheels**: Two separate wheels with different prize values ($50 and $100)
- **Tab Navigation**: Easy switching between different spin wheel options
- **Customizable Categories**: Add, edit, and manage wheel categories with custom images
- **Center Logo**: Brand logo prominently displayed at the wheel's center
- **Responsive Design**: Optimized for both mobile and desktop experiences

### 🎨 Visual Design
- **Color Theme**: Elegant combination of Green, Maroon, Gold, and White
- **Smooth Animations**: Fluid wheel spinning with realistic physics
- **Modern UI**: Clean, intuitive interface with premium feel

### 🎆 Animations & Effects
- **Confetti Celebration**: Colorful confetti animation when wheel stops
- **Fire Crackers**: Spectacular firework effects after winning
- **Spin Animation**: Smooth, realistic wheel rotation with momentum
- **Loading States**: Beautiful loading animations and transitions

### 🔊 Audio Experience
- **Ticking Sound**: Realistic ticking sound during wheel spinning
- **Win Sound**: Celebratory audio when landing on a prize
- **Background Music**: Optional ambient music (can be toggled)
- **Sound Controls**: Volume controls and mute functionality

### 🚀 Additional Features
- **Prize History**: Track previous wins and statistics
- **Custom Categories**: Add your own categories with images and descriptions
- **Export Results**: Save and share your spin results
- **Dark/Light Mode**: Toggle between different themes
- **Haptic Feedback**: Vibration feedback on mobile devices
- **Share Functionality**: Share your wins on social media
- **Settings Panel**: Customize app behavior and appearance

## 🛠️ Tech Stack

- **Framework**: React Native 0.72+
- **Platform**: Web (React Native Web)
- **Animation**: React Native Reanimated 3
- **Audio**: React Native Sound
- **Navigation**: React Navigation 6
- **State Management**: Redux Toolkit
- **Icons**: React Native Vector Icons
- **Styling**: Styled Components
- **Build Tool**: Metro Bundler

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-native": "^0.72.0",
    "react-native-web": "^0.19.0",
    "react-native-reanimated": "^3.5.0",
    "react-native-sound": "^0.11.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "@reduxjs/toolkit": "^1.9.0",
    "react-redux": "^8.1.0",
    "react-native-vector-icons": "^10.0.0",
    "styled-components": "^6.0.0",
    "react-native-confetti-cannon": "^1.5.0",
    "react-native-haptic-feedback": "^2.1.0"
  }
}
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- React Native development environment

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/SwapnilTandel/spin-wheel-app.git
   cd spin-wheel-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install additional dependencies for web**
   ```bash
   npx react-native-web install
   ```

4. **Start the development server**
   ```bash
   # For web development
   npm run web
   # or
   yarn web
   
   # For mobile development
   npm run start
   # or
   yarn start
   ```

5. **Open in browser**
   - Navigate to `http://localhost:8080` for web version
   - Use Expo Go app for mobile testing

## 🎨 Color Theme

The app uses a sophisticated color palette:

```css
:root {
  --primary-green: #2E7D32;
  --secondary-maroon: #8B0000;
  --accent-gold: #FFD700;
  --background-white: #FFFFFF;
  --text-dark: #333333;
  --shadow-color: rgba(0, 0, 0, 0.1);
}
```

### Color Usage:
- **Green**: Primary buttons, active states, success messages
- **Maroon**: Secondary elements, category borders, accent highlights
- **Gold**: Prize indicators, special effects, premium features
- **White**: Background, card surfaces, text on dark backgrounds

## 🎯 Usage Guide

### Basic Usage
1. **Select Wheel**: Choose between $50 or $100 spin wheel using tabs
2. **Add Categories**: Use the settings panel to add custom categories with images
3. **Spin Wheel**: Tap the spin button to start the wheel animation
4. **Celebrate**: Enjoy confetti and firecrackers when you win!

### Customization
- **Categories**: Add/remove categories with custom names and images
- **Logo**: Replace the center logo with your brand logo
- **Sounds**: Toggle sound effects on/off in settings
- **Theme**: Switch between light and dark modes

## 📱 Screenshots

![Spin Wheel App Screenshots](https://via.placeholder.com/800x400/2E7D32/FFFFFF?text=Spin+Wheel+App)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://your-api-url.com
REACT_APP_SOUND_ENABLED=true
REACT_APP_ANIMATIONS_ENABLED=true
REACT_APP_HAPTIC_FEEDBACK=true
```

### Customization Options
- **Wheel Segments**: Modify `wheelSegments` in config
- **Animation Duration**: Adjust `spinDuration` in settings
- **Sound Effects**: Replace audio files in `/assets/sounds/`
- **Images**: Add custom images to `/assets/images/`

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📦 Building for Production

### Web Build
```bash
npm run build:web
```

### Mobile Build
```bash
# Android
npm run build:android

# iOS
npm run build:ios
```

## 🚀 Deployment

### 🌐 Deploy to Render (Recommended)

Render is an excellent platform for deploying React Native Web applications with zero configuration and automatic deployments.

#### Prerequisites for Render Deployment
- GitHub repository with your code
- Render account (free tier available)
- Node.js 18+ runtime

#### Step-by-Step Render Deployment

1. **Prepare Your Repository**
   ```bash
   # Ensure your package.json has these scripts
   {
     "scripts": {
       "start": "react-native start",
       "web": "react-native-web start",
       "build": "react-native-web build",
       "build:web": "react-native-web build --webpack-config webpack.config.js"
     }
   }
   ```

2. **Create render.yaml Configuration**
   Create a `render.yaml` file in your project root:
   ```yaml
   services:
     - type: web
       name: spin-wheel-app
       env: node
       plan: free
       buildCommand: npm install && npm run build:web
       startCommand: npx serve -s build -l 3000
       envVars:
         - key: NODE_ENV
           value: production
         - key: REACT_APP_API_URL
           value: https://your-api-url.com
         - key: REACT_APP_SOUND_ENABLED
           value: true
         - key: REACT_APP_ANIMATIONS_ENABLED
           value: true
   ```

3. **Create webpack.config.js** (if needed)
   ```javascript
   const path = require('path');
   
   module.exports = {
     entry: './index.web.js',
     output: {
       path: path.resolve(__dirname, 'build'),
       filename: 'bundle.js',
       publicPath: '/'
     },
     module: {
       rules: [
         {
           test: /\.(js|jsx)$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-env', '@babel/preset-react']
             }
           }
         }
       ]
     },
     resolve: {
       extensions: ['.web.js', '.js', '.web.jsx', '.jsx'],
       alias: {
         'react-native$': 'react-native-web'
       }
     }
   };
   ```

4. **Deploy to Render**
   
   **Option A: Connect GitHub Repository**
   1. Go to [render.com](https://render.com) and sign up/login
   2. Click "New +" → "Web Service"
   3. Connect your GitHub repository
   4. Configure the service:
      - **Name**: `spin-wheel-app`
      - **Environment**: `Node`
      - **Build Command**: `npm install && npm run build:web`
      - **Start Command**: `npx serve -s build -l 3000`
      - **Plan**: Free (or choose paid for more resources)
   
   **Option B: Using render.yaml (Blueprints)**
   1. Push your code with `render.yaml` to GitHub
   2. Go to Render Dashboard
   3. Click "New +" → "Blueprint"
   4. Connect your repository
   5. Render will automatically detect and deploy using your `render.yaml`

5. **Environment Variables Setup**
   In your Render dashboard, go to your service → Environment:
   ```
   NODE_ENV=production
   REACT_APP_API_URL=https://your-api-url.com
   REACT_APP_SOUND_ENABLED=true
   REACT_APP_ANIMATIONS_ENABLED=true
   REACT_APP_HAPTIC_FEEDBACK=true
   ```

6. **Custom Domain (Optional)**
   - Go to your service settings
   - Click "Custom Domains"
   - Add your domain and configure DNS

#### Render-Specific Optimizations

1. **Add .renderignore file**:
   ```
   node_modules/
   .git/
   .gitignore
   README.md
   .env.local
   .env.development
   ```

2. **Optimize package.json for Render**:
   ```json
   {
     "scripts": {
       "render-postbuild": "npm run build:web",
       "render-start": "npx serve -s build -l $PORT"
     }
   }
   ```

3. **Add static file serving** (if needed):
   ```javascript
   // Add to your build process
   const express = require('express');
   const path = require('path');
   const app = express();
   
   app.use(express.static(path.join(__dirname, 'build')));
   
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'build', 'index.html'));
   });
   ```

#### Render Deployment Commands
```bash
# Deploy to Render using CLI (optional)
npm install -g @render/cli
render login
render deploy

# Or use GitHub integration for automatic deployments
git add .
git commit -m "Deploy to Render"
git push origin main
```

#### Troubleshooting Render Deployment

**Common Issues & Solutions:**

1. **Build Fails - Node Version**
   ```yaml
   # Add to render.yaml
   services:
     - type: web
       name: spin-wheel-app
       env: node
       nodeVersion: 18
   ```

2. **Build Timeout**
   - Upgrade to paid plan for longer build times
   - Optimize dependencies in package.json

3. **Static Files Not Loading**
   ```javascript
   // Ensure proper static file serving
   app.use(express.static('build', {
     setHeaders: (res, path) => {
       if (path.endsWith('.js')) {
         res.setHeader('Content-Type', 'application/javascript');
       }
     }
   }));
   ```

4. **Environment Variables Not Working**
   - Check variable names start with `REACT_APP_`
   - Redeploy after adding new environment variables

5. **Audio Files Not Playing**
   - Ensure audio files are in the `public` folder
   - Use absolute paths for audio files
   - Check CORS settings

#### Render Performance Tips

1. **Enable CDN**: Use Render's built-in CDN for static assets
2. **Optimize Images**: Compress images before deployment
3. **Bundle Analysis**: Use webpack-bundle-analyzer to optimize bundle size
4. **Caching**: Configure proper cache headers for static assets

### Other Web Deployment Options
- **Vercel**: `npm run deploy:vercel`
- **Netlify**: `npm run deploy:netlify`
- **GitHub Pages**: `npm run deploy:gh-pages`

### Mobile Deployment
- **Android**: Build APK or use Google Play Store
- **iOS**: Build IPA or use Apple App Store

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- React Native community for excellent documentation
- Contributors who helped improve this project
- Sound effects from Freesound.org
- Icons from React Native Vector Icons

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact us at support@spinwheelapp.com
- Check our documentation wiki

## 🔮 Future Enhancements

- **Multiplayer Mode**: Spin wheels with friends
- **Leaderboards**: Track high scores and achievements
- **Custom Themes**: More color schemes and visual styles
- **AR Integration**: Augmented reality spin wheel experience
- **Blockchain Integration**: NFT prizes and cryptocurrency rewards
- **Analytics Dashboard**: Detailed statistics and insights
- **Voice Commands**: Spin the wheel using voice
- **Gesture Controls**: Swipe and gesture-based interactions

---

**Made with ❤️ by [Your Name]**

*Happy Spinning! 🎰*
