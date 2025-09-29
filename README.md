# 🎯 JSQuiz Pro – Multi-Users & Database (Node.js + Express + MySQL + EJS)

## 📌 Project Overview
This project is a **multi-user quiz platform** built with **Node.js, Express, MySQL, and EJS**.  
It supports user authentication, quiz gameplay, score tracking, and role-based dashboards (User & Admin).  
It was designed to introduce the fundamentals of **full-stack development** (backend, database, routes, sessions).

---

## 👥 Roles & Functionalities

### 👤 User
- Create an account & login.
- Play quizzes (questions loaded dynamically from DB).
- View personal history (scores, themes played).
- Access personal dashboard (average score, number of games played).

### 🛠️ Admin
- Manage quiz questions (CRUD: add, edit, delete).
- View all users’ scores.
- Access statistics (e.g. top players, score distribution).

---

## ⚙️ Tech Stack
- **Backend:** Node.js + Express
- **Frontend (views):** EJS templates
- **Database:** MySQL
- **Auth:** Sessions + bcrypt (password hashing)
- **Styling:** Custom CSS (public folder)
- **Environment management:** dotenv

---

## 🗄️ Database Schema

### `users`
| Column    | Type               | Details                        |
|-----------|--------------------|--------------------------------|
| id        | INT (PK, AI)       | User ID                        |
| username  | VARCHAR(50) UNIQUE | Unique username                |
| password  | VARCHAR(255)       | Hashed password (bcrypt)       |
| role      | ENUM('user','admin') | Default `user`, `admin` for admins |

### `questions`
| Column    | Type         | Details                         |
|-----------|--------------|---------------------------------|
| id        | INT (PK, AI) | Question ID                     |
| thematique| VARCHAR(100) | Quiz theme/category             |
| question  | TEXT         | The question text               |
| options   | JSON         | Answer choices                  |
| correct   | VARCHAR(100) | Correct answer                  |

### `scores`
| Column    | Type         | Details                         |
|-----------|--------------|---------------------------------|
| id        | INT (PK, AI) | Score ID                        |
| user_id   | INT (FK)     | Linked to `users.id`            |
| thematique| VARCHAR(100) | Theme of the quiz               |
| score     | INT          | Score achieved                  |
| played_at | TIMESTAMP    | Default: current timestamp      |

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/LatrachDev/JSQuiz-Pro.git
cd JSQuiz-Pro
