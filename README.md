# ⚡ Portfolio — Built for Performance & Motion

A personal portfolio focused on **motion, clarity, and speed** — designed to feel smooth, intentional, and responsive across all devices.

---

## 🚀 What’s inside

- Responsive layout (no layout shifts, no overflow issues)
- Device-aware animations (different logic for desktop & mobile)
- Smooth scrolling experience
- Section-based motion system (not random animations)
- Clean component structure

---

## 🛠 Stack

- Next.js
- React
- Tailwind CSS
- GSAP
- Lenis

---

## ⚙️ Setup

```bash
git clone https://github.com/riyasisodiya2486/Portfolio.git
cd Portfolio
npm install
npm run dev
```

---

## 🎬 Motion System (important)

This project does **not** use the same animation strategy everywhere.

### Desktop
- Scroll-driven animations
- GSAP timelines
- Advanced interactions (horizontal scroll, parallax)

### Mobile / Tablet
- No heavy scroll manipulation
- Lightweight reveal animations
- Performance-first approach

> The goal isn’t “more animation” — it’s **better control over motion**

---

## 📱 Responsiveness Approach

Instead of rewriting layouts:
- Desktop design remains untouched  
- Layout shifts to vertical flow  
- Typography scales using fluid units  

---

## ⚡ Performance Decisions

- Avoided heavy animation stacking on mobile  
- Reduced layout thrashing  
- Limited animations per frame  
- Used transform-based animations only  

---

## 📂 Structure

```bash
app/            # routes & layout
components/     # UI sections
hooks/          # animation logic
public/         # assets
```

---

## 🌐 Live

https://portfolio-lovat-eight-52.vercel.app/

---

## 📸 Preview

_Add 2–3 clean screenshots (Hero, Projects, Mobile view)_

---

## 📌 Notes

- Desktop and mobile experiences are intentionally different  
- Some animations are disabled on smaller devices to maintain smoothness  
- Built with focus on real-world performance, not just visuals  

---

## 🧩 What I’d improve next

- Add page transitions  
- Improve micro-interactions  
- Reduce initial load time further  
- Add more content depth (case studies)
