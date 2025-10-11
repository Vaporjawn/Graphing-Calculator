# Graphing Calculator 📈

A fully functional, modern web-based graphing calculator built with **React**, **TypeScript**, **Vite**, and **Material-UI**.

<img width="1921" height="967" alt="Screenshot 2025-10-11 at 08 48 42" src="https://github.com/user-attachments/assets/6fc77659-19f9-44b5-adb6-0fe47b85ca77" />


## ✨ Features

- 📊 **Multiple Function Graphing**: Plot multiple mathematical functions simultaneously
- 🎨 **Beautiful Material Design**: Modern, polished UI with smooth animations
- 🔍 **Interactive Controls**: Pan, zoom, and navigate the graph with mouse/touch
- ⚡ **High Performance**: Optimized canvas rendering with requestAnimationFrame
- 🎯 **Mathematical Support**:
  - Trigonometric functions (sin, cos, tan)
  - Logarithms and square roots
  - Absolute values and exponents
  - And more!
- 🎨 **Custom Colors**: Assign different colors to each function
- 👁️ **Toggle Visibility**: Show/hide individual functions
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- ♿ **Accessible**: WCAG-compliant with keyboard navigation
- 🌓 **Performance Modes**: Toggle between standard and high-accuracy rendering
- 📐 **Asymptote Detection**: Automatically detect and handle vertical asymptotes

## 🚀 Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Material-UI (MUI)** - Beautiful component library
- **Emotion** - CSS-in-JS styling
- **Canvas API** - High-performance graph rendering

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage

1. **Add Functions**: Click "Add another function" to create new function inputs
2. **Enter Equations**: Type mathematical expressions like `x^2`, `sin(x)`, `sqrt(x)`
3. **Pan the Graph**: Click and drag to move around
4. **Zoom**: Use mouse wheel or zoom buttons to zoom in/out
5. **Customize**: Change colors, hide functions, or duplicate them
6. **Reset**: Click the reset button to return to default view

### Supported Mathematical Notation

- `sin(x)`, `cos(x)`, `tan(x)` - Trigonometric functions
- `sqrt(x)` - Square root
- `log(x)` - Natural logarithm
- `abs(x)` - Absolute value
- `x^2` or `x**2` - Exponents
- `PI` - Pi constant
- Standard operators: `+`, `-`, `*`, `/`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main app component
│   ├── theme.ts                # MUI theme configuration
│   └── providers/
│       └── GraphProvider.tsx   # State management context
├── components/
│   ├── GraphCanvas/
│   │   └── GraphCanvas.tsx     # Canvas rendering component
│   ├── ControlPanel/
│   │   └── ControlPanel.tsx    # Graph controls sidebar
│   └── FunctionList/
│       ├── FunctionList.tsx    # List of functions
│       └── FunctionPanel.tsx   # Individual function card
├── utils/
│   ├── constants.ts            # App constants
│   ├── mathUtils.ts            # Mathematical utilities
│   └── graphUtils.ts           # Graph coordinate transforms
├── types/
│   └── index.ts                # TypeScript interfaces
└── main.tsx                    # App entry point
```

## 🎨 Design Highlights

- **Glassmorphism Effects**: Frosted glass aesthetic on control panel
- **Material Design**: Following Google's Material Design principles
- **Smooth Animations**: Micro-interactions and transitions
- **High Contrast Colors**: Vibrant function colors for clarity
- **Responsive Layout**: Adapts to all screen sizes
- **Touch-Friendly**: Large tap targets for mobile devices

## 🔧 Development

Built with modern development practices:

- ✅ Strict TypeScript for type safety
- ✅ ESLint for code quality
- ✅ Component-based architecture
- ✅ React hooks for state management
- ✅ Performance optimized with memoization
- ✅ Clean code following enterprise standards

## 📄 License

MIT License - feel free to use this project for learning or your own applications!

## 👨‍💻 Author

**Victor Williams** ([@Vaporjawn](https://github.com/Vaporjawn))

## 🔗 Links

- [My GitHub Profile](https://github.com/Vaporjawn)
- [My Website](https://Vaporjawn.github.io/)
- [JavaScript Calculator](https://github.com/Vaporjawn/Javascript-Calculator)

---

Built with ❤️ using React, TypeScript, Vite, and Material-UI
