## Workout Recorder
_Log in, view the Workout of the Day, and track your training history._

<img width="800" height="600" alt="Daily WOD Tracker" src="https://github.com/user-attachments/assets/80c38a43-5136-46d0-9812-da238e9af581" />



This is a full-stack web application built with Next.js, TypeScript, and Supabase.
The goal of this project is to move beyond client-only state and practice real-world concepts such as authentication, database design, and API handling, while maintaining a clean, modern UI.

Users can log in, view the daily Workout of the Day (WOD), mark it as completed, and store personal notes. All persisted in a real database.

- **Spec:** Next.js 13+ (App Router), TypeScript, Tailwind CSS, Supabase Auth(Email / GitHub), Supabase (PostgreSQL), Vercel

- **Check App:** [Check here](https://myproject-25-4-wod-app.vercel.app/)

### Why made me create this app?
After building my previous Workout Recorder app using only React and LocalStorage, I wanted to take the next step and build something closer to a real-world product. Since I train almost every day with CrossFit and HYROX-style workouts, the idea of a Daily WOD Tracker felt like a natural progression.

This time, my focus was not only on tracking workouts, but also on learning how real applications handle users, data, and persistence. I wanted to practice authentication, storing data in a database, and fetching information through an API instead of relying entirely on client-side state. By building an app I would personally use, I stayed motivated while learning more advanced full-stack concepts.

### Core Features

- User authentication with Supabase
- Fetch and display today’s Workout of the Day
- Mark workouts as completed
- Add optional notes (weights, time, comments)
- Store workout history per user
- Responsive UI built with Tailwind CSS

### What was challenging?
The most challenging part of this project was designing the overall data flow between authentication, the database, and the UI. Unlike my previous app, where everything lived in LocalStorage, this project required careful thinking about how user sessions are handled and how data is fetched and stored securely.
Working with Supabase also introduced new challenges, such as defining table relationships, handling asynchronous data fetching, and keeping TypeScript types in sync with the database schema.

### Goals for Improvement
This project is still a work in progress, and there are several features I plan to add as I continue developing it. Some of these, such as editing or deleting logged workouts, were not part of my main focus during the initial build, but they are important quality-of-life improvements that would make the app more complete and user-friendly.

My primary goal for this project was to learn and practice authentication, database integration, and API handling using Next.js and Supabase. Because of that, I intentionally prioritized building a solid foundation with clean data flow and reliable persistence before adding extra functionality.

Going forward, I would like to continue refining the user experience by adding features like edit and delete actions, better workout history management, and clearer feedback in the UI. On the technical side, I also want to improve error handling, loading states, and overall code organization, with the long-term goal of turning this project into a polished, production-ready full-stack application.



