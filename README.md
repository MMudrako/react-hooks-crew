# React’s Eleven 🎭

An interactive single-page application (SPA) built with Next.js and Tailwind CSS that teaches React Hooks through a crew of unique characters — each representing one of React’s core APIs.

---

## 🎯 About the Project

React’s Eleven is more than a tutorial — it’s a themed learning experience. Each hook in React is personified as a member of a skilled mission crew. Users explore their personalities, see useful code snippets, and interact with real examples designed to *teach React by story and behavior*.

---

## 🎯 As a picture says a thousand words, a game can teach a hundred times faster. This app is for:

- React learners who’d rather meet the Hooks as a quirky crew than read another dry tutorial  
- Devs who enjoy interactive storytelling, light gamification, and vivid metaphors  
- Junior developers who want to *really* get React Hooks — not just use them, but understand their personalities and powers

> **“Learning React should feel like a mission, not a multiple-choice quiz.”**

---

## 🧪 Live Demo

[🔗 View on Vercel (Coming Soon)]()

---

## 🚀 Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for animation

---

## 📂 Folder Structure (Preview)
/app
  ├── layout.js                 # Global (navbar/footer)
  ├── page.js                   # Landing (can redirect to /crew)
  ├── /crew
  │   ├── layout.js             # Optional: custom for crew
  │   ├── page.js               # Grid of characters
  │   └── /[name]
  │       ├── layout.js         # Individual hook layout
  │       └── page.js           # Individual demo
  ├── /arcade
  │   ├── layout.js             # 3-agents game layout
  │   └── page.js
/components
  ├── Navbar.js
  ├── HookCard.js
  ├── HookProfile.js
  ├── CodeExample.js
  ├── ConsoleMock.js
  ├── AgentCard.js
/lib
  ├── hooksData.js
  └── agentTraits.js
/data
  ├── agents.json
  └── agentTraits.json


---

## 🛠 Features

- 🧠 **11 character-driven lessons** for every major React hook
- 🧩 **Live code examples** for each hook
- 🗂️ Filterable / searchable crew list
- 💾 Favorites and progress stored in localStorage
- 🎬 Optional unlockable system for gamified learning

---

## 📝 Project Status

- [x] Planning & Design (Phase 1)
- [ ] Routing & Rendering (Phase 2)
- [ ] UI & Interactivity (Phase 3)
- [ ] Case Study & Deployment (Phase 4)

---

## 📚 Learning Goals

- Solidify Next.js framework and server side rendering knowledge
- Practice dynamic routing and static generation (SSG)
- Use local storage and memoization patterns
- Reinforce React Hooks via teaching and storytelling
- Advance and polish front-end structure skills

---

## 📸 Screenshots

_TBD: To be added once the first component is live_

---

## 🧑‍💻 Author

**Maria Mudrakova**  
[LinkedIn](https://www.linkedin.com/in/mudrakovamaria) 
Built as a portfolio project to master React Hooks and creative UI/UX development.

---

## License & Permissions

This project is not licensed under an open-source license.

© 2025 Maria Mudrakova. All rights reserved.  
This codebase is made publicly visible for learning and portfolio demonstration purposes only.
You’re welcome to: 
  - View the source code for educational or personal reference.
  - Open issues or suggest improvements via GitHub Issues.

You may **not**:
- Reproduce, distribute, fork, or reuse any part of this codebase for public or commercial use.
- Create derivative works without express permission from the author.

## 🤝 Want to Collaborate?

If you’ve got an idea or want to discuss future enhancements, feel free to open an Issue or reach out.  
I’m always open to thoughtful feedback, insights, or creative input.

If you have a suggestion or wish to collaborate, please either:
  -contact the repository owner, or
  -[open an issue](https://github.com/MMudrako/react-hooks-crew/issues).

🔐 This project uses custom licensing to protect original creative direction 
    and design while allowing learning-focused exploration. 
    Thank you for respecting these terms!
