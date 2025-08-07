# Oliver Grudzinski's Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and experience as a Computer Science student and Full Stack Developer. Built with React and featuring a cosmic-themed design with animated backgrounds and smooth interactions.

Check it out at hosted on aws at [olivergrudzinski.com](grudzinskioliver.com)!

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes with persistent preference
- **Animated Background**: Dynamic star field and meteor animations
- **Interactive Components**: Smooth hover effects, modal dialogs, and animated transitions
- **Project Showcase**: Featured projects with detailed information and links
- **Skills Filter**: Categorized skills display with interactive filtering
- **Contact Section**: Easy ways to get in touch with social media links

## 🛠️ Technologies Used

### Frontend Framework & Libraries
- **React** (18.x) - UI library for building user interfaces
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and development server

### Styling & UI
- **TailwindCSS** - Utility-first CSS framework with custom utilities
- **Lucide React** - Beautiful SVG icons
- **Custom CSS Animations** - Keyframe animations for stars, meteors, and UI elements

### Development Tools
- **JavaScript (ES6+)** - Modern JavaScript features
- **CSS3** - Advanced styling with custom properties and animations
- **HTML5** - Semantic markup

### Key Libraries
- **clsx** - Utility for constructing className strings
- **tailwind-merge** - Merge Tailwind classes without conflicts

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/grudzinskio/Personal_Website.git
   cd Personal_Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the website locally.

### Build for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash

npm run preview
# or
yarn preview
```
## 🎨 Key Features Breakdown

### Custom Animations
- **Star Field**: Dynamically generated stars with pulse animations
- **Meteor Shower**: Diagonal meteor animations across the screen
- **Fade-in Effects**: Staggered animations on page load
- **Hover Interactions**: Card tilts and glow effects

### Responsive Navigation
- **Desktop**: Horizontal navigation with theme toggle
- **Mobile**: Hamburger menu with full-screen overlay

### Project Showcase
- **Interactive Cards**: Click to view detailed project information
- **Modal System**: Full-screen project details
- **External Links**: Direct links to GitHub repositories and live demos
- **Achievement Badges**: Special highlighting for award-winning projects

### Skills Organization
- **Category Filtering**: Filter skills by type (Languages, Web, AI/ML, Tools, etc.)
- **Interactive Buttons**: Smooth category switching
- **Comprehensive Coverage**: Full-stack development skills displayed

## 🔧 Customization

### Themes 

The website supports both dark and light themes. Theme preference is saved to localStorage and persists between sessions.

### Colors

Primary color scheme can be modified in `src/index.css` using CSS custom properties:
```css
:root {
  --primary: 250 47% 60%;        /* Primary color */
  --background: 210 40% 98%;     /* Background color */
  --foreground: 222 47% 11%;     /* Text color */
}
```

### Content Updates
- **Projects**: Update the `projects` array in `ProjectsSection.jsx`
- **Skills**: Modify the `skills` array in `SkillsSection.jsx`
- **Personal Info**: Update content in `AboutSection.jsx` and `ContactSection.jsx`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a personal portfolio website, but if you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📬 Contact

- **Email**: [grudzinskioliver@gmail.com](mailto:grudzinskioliver@gmail.com)
- **LinkedIn**: [grudzinskioliver](https://www.linkedin.com/in/grudzinskioliver/)
- **GitHub**: [grudzinskio](https://github.com/grudzinskio)
- **Portfolio**: [Website](grudzinskioliver.com)

---

Built by Oliver Grudzinski
