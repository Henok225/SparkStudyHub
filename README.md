# Spark Study Hub

> **Edtech for Smart Learning** — Empowering students to succeed through clear explanations, interactive quizzes, and solved exams.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![Vite](https://img.shields.io/badge/Vite-6.1.0-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Spark Study Hub is an educational technology platform designed to make learning accessible, engaging, and effective. As a student-built solution, it addresses real challenges in education by providing expertly curated content, interactive learning tools, and comprehensive exam preparation resources.

### Mission

We believe that every student deserves access to high-quality educational resources. Our mission is to make learning engaging, accessible, and effective by providing:
- Clear and concise explanations for complex topics
- Interactive assessment and progress tracking
- Real exam practice with detailed solutions
- Personalized learning experiences

## ✨ Features

### Current Features
- **Expertly Curated Content** — Clear explanations for complex topics
- **Interactive Quizzes** — Test knowledge and track progress
- **Progress Tracking** — Monitor your learning journey
- **Responsive Design** — Learn on any device (desktop, tablet, mobile)
- **User Authentication** — Secure login and personalized experience

### Coming Soon
- **Solved Entrance Exams** — Practice with real exams and detailed solutions
- **Personalized Learning Paths** — AI-powered recommendations and adaptive learning
- **Advanced Analytics** — Detailed progress reports and performance insights

## 🛠 Tech Stack

### Frontend
- **React 19.0.0** — Modern UI library
- **Vite 6.1.0** — Lightning-fast build tool and dev server
- **TailwindCSS 3.4.17** — Utility-first CSS framework
- **React Router 7.2.0** — Client-side routing

### Content & Editor
- **TinyMCE React 6.3.0** — Rich text editor for content creation
- **React Markdown 10.1.0** — Markdown rendering
- **KaTeX & React-KaTeX 3.1.0** — Mathematical equation rendering
- **Rehype & Remark** — Markdown processing plugins

### HTTP & State
- **Axios 1.8.2** — HTTP client for API calls
- **Framer Motion 12.10.5** — Animation library

### Development Tools
- **ESLint 9.19.0** — Code quality and style checking
- **React Hooks ESLint Plugin** — React best practices
- **PostCSS & Autoprefixer** — CSS processing

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Henok225/SparkStudyHub.git
   cd SparkStudyHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Configuration

1. **Create environment files**

   Create `.env.local` for development:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_TINYMCE_EDITOR_API_KEY=your_tinymce_api_key_here
   VITE_ENV=development
   ```

   For production (`.env.production`):
   ```env
   VITE_API_URL=https://sparkstudyhub.onrender.com
   VITE_TINYMCE_EDITOR_API_KEY=your_tinymce_api_key_here
   VITE_ENV=production
   ```

2. **Get TinyMCE API Key**
   - Sign up at [TinyMCE Cloud](https://www.tiny.cloud/)
   - Create an account and get your API key
   - Add it to your `.env` files

### Running the Project

**Development Mode**
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

**Build for Production**
```bash
npm run build
```

**Preview Production Build**
```bash
npm run preview
```

**Lint Code**
```bash
npm run lint
```

## 📁 Project Structure

```
SparkStudyHub/
├── src/
│   ├── Components/          # React components
│   │   ├── AboutUs/         # About page component
│   │   ├── ReusableComponents/
│   │   │   └── Flagging/    # Feature flagging components
│   │   └── ...
│   ├── Context/             # React Context (StoreContext)
│   ├── main.jsx             # Entry point
│   └── App.jsx              # Root component
├── public/                  # Static assets
│   └── logo/
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├─��� vite.config.js          # Vite configuration
├── tailwind.config.js      # TailwindCSS configuration
├── eslint.config.js        # ESLint rules
└── .env.production         # Production environment variables
```

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 💻 Development

### Code Standards
- Follow ESLint configuration in `eslint.config.js`
- Use functional components with React Hooks
- Maintain responsive design with TailwindCSS
- Write semantic HTML

### Key Technologies to Know
- **React 19** — Latest React features and patterns
- **Vite** — Blazing-fast dev server and HMR
- **Context API** — State management via `StoreContext`
- **TailwindCSS** — Utility-first styling approach

### Mathematical Content
The project supports mathematical equations using:
- **KaTeX** — Fast LaTeX math rendering
- **Remark Math & Rehype KaTeX** — Markdown math plugin support
- Inline (`$...$`) and display (`$$...$$`) math modes

### Content Editing
Use TinyMCE for rich text content creation:
- Full-featured editor in components
- WYSIWYG editing experience
- Support for embedded media and formatting

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Deployed App**: https://sparkstudyhub.onrender.com
- **GitHub Repository**: https://github.com/Henok225/SparkStudyHub
- **Report Issues**: [GitHub Issues](https://github.com/Henok225/SparkStudyHub/issues)

---

## 📧 Support

For questions or support, please open an issue on [GitHub](https://github.com/Henok225/SparkStudyHub/issues).

**Happy Learning! 🚀**
