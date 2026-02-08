# Job Application Tracker

A **full-stack job application management tool** built with **Next.js**, **React 19**, and **MongoDB** — designed to help job seekers track and organize applications using a modern, drag-and-drop interface.

🔗 Live demo: [https://job-application-tracker-rose.vercel.app/](https://job-application-tracker-rose.vercel.app/) ([GitHub][1])

---

## 🚀 Features

✅ Track job applications across multiple stages
✅ Drag & drop interface (Kanban-style)
✅ Persistent data with **MongoDB**
✅ Built with cutting-edge React & Next.js
✅ Authentication with **better-auth**
✅ Tailwind CSS for rapid UI styling

---

## 🧠 Tech Stack

| Layer          | Stack                  |
| -------------- | ---------------------- |
| UI             | React 19, Tailwind CSS |
| Framework      | Next.js 16             |
| Drag & Drop    | @dnd-kit               |
| Database       | MongoDB, Mongoose      |
| Authentication | better-auth            |
| Icons & UI     | Radix UI, Lucide Icons |
| Scripting      | TypeScript, tsx        |

---

## 📋 Screenshots

*(Add here when ready — images make the README way stronger for recruiters.)*

---

## 🚀 Getting Started

### 🔁 Clone

```bash
git clone https://github.com/lidor-cohen/job-application-tracker.git
cd job-application-tracker
```

---

### 📦 Install dependencies

```bash
npm install
```

or, if you use `yarn`:

```bash
yarn
```

---

### 📋 Environment Variables

Create a `.env` file in the root with:

```env
MONGODB_URI=<your MongoDB connection URI>
NEXTAUTH_SECRET=<a long random secret>
NEXTAUTH_URL=http://localhost:3000
```

*Adjust based on your auth setup.*

---

### 🛠 Seed the Database (Optional)

```bash
npm run seed:jobs
```

This seeds the database with sample job application data.

---

### ▶️ Run the Dev Server

```bash
npm run dev
```

Then visit:

```plaintext
http://localhost:3000
```

---

## 🧠 Available Scripts

| Script      | Description                   |
| ----------- | ----------------------------- |
| `dev`       | Runs the development server   |
| `build`     | Builds the app for production |
| `start`     | Starts the production server  |
| `lint`      | Runs ESLint                   |
| `seed:jobs` | Seeds the database with jobs  |

---

## 🛠 Project Structure

```
src/
├── app/ — Next.js routes & pages
├── components/ — UI components
├── lib/ — Mongoose models & helpers
├── scripts/ — Data seeding
```

---

## 🧩 Why This Project

This project was built to solve the common problem of tracking **job applications without chaos** — replacing spreadsheets with a clear and interactive board that helps users visualize their job search at a glance.

It’s also a great demonstration of:

✨ Modern React & Next.js patterns
⚡ Server-centric full-stack app design
📌 Integration of drag-and-drop with persistent backend
🛡 Authentication & data security

