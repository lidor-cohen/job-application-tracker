# Job Application Tracker

A **full-stack job application management tool** built with **Next.js**, **React 19**, and **MongoDB** — designed to help job seekers track and organize applications using a modern, drag-and-drop interface.

🔗 Live demo: [https://job-application-tracker-rose.vercel.app/](https://job-application-tracker-rose.vercel.app/)

---

## 🚀 Features

✅ Track job applications across multiple stages <br/>
✅ Drag & drop interface (Kanban-style) <br/>
✅ Persistent data with **MongoDB** <br/>
✅ Built with cutting-edge React & Next.js <br/>
✅ Authentication with **better-auth** <br/>
✅ Tailwind CSS for rapid UI styling <br/>

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

<img width="1869" height="959" alt="hero3" src="https://github.com/user-attachments/assets/b7d03c77-580d-4d36-a6a3-3a346e4e1b5b" />
<img width="1863" height="962" alt="hero2" src="https://github.com/user-attachments/assets/5bc9c4d0-2701-4ed4-b8fc-403b5135d505" />
<img width="1867" height="957" alt="hero1" src="https://github.com/user-attachments/assets/a58652cd-29d4-4876-bff2-017a83ad4ff9" />

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

It’s also a great demonstration of: <br/>
✨ Modern React & Next.js patterns <br/>
⚡ Server-centric full-stack app design <br/>
📌 Integration of drag-and-drop with persistent backend <br/>
🛡 Authentication & data security <br/>

