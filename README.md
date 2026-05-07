# Track Your Workout

[![Demo](https://img.shields.io/badge/Demo-YouTube-red)](https://www.youtube.com/watch?v=yA5mG-l8TuA&ab_channel=BuildWithBrittany)
[![Blog](https://img.shields.io/badge/Blog-Dev.to-black)](https://dev.to/sincerelybrittany/javascript-and-rails-single-page-application-spa-3opc)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/sincerelybrittany/)

A single-page application for logging and organizing workout videos by date. Search YouTube directly within the app, save workouts to your personal calendar, and track your fitness history over time.

![App Demo](track-your-workout-frontend/styles/workout_img.png)

## Features

- **YouTube Search** — Search for workout videos without leaving the app, powered by the YouTube Data API v3
- **Workout Calendar** — Workouts are organized by date with collapsible daily views
- **Full CRUD** — Add workouts from search results or by pasting a URL; delete anytime
- **Persistent Storage** — All workouts are saved to a PostgreSQL database via a Rails API
- **User Sessions** — Simple username-based login to keep your workouts separate

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vanilla JavaScript (ES6 classes), HTML5, CSS3, Bootstrap 4 |
| Backend | Ruby on Rails 6 (API mode), PostgreSQL |
| External API | YouTube Data API v3 |

## Architecture

The frontend uses a class-based OOP pattern with a dedicated **Adapter** layer that separates API communication from UI logic — mirroring the separation of concerns in the Rails MVC backend.

```
Browser ↔ WorkoutsAdapter ↔ Rails API ↔ PostgreSQL
Browser ↔ YoutubeAdapter  ↔ YouTube Data API v3
```

## Getting Started

### Prerequisites

- Ruby 2.7+
- Rails 6+
- PostgreSQL
- A [YouTube Data API v3 key](https://console.developers.google.com/)

### Backend Setup

```sh
# Clone and enter the backend
git clone https://github.com/SincerelyBrittany/track_your_workout_backend.git
cd track_your_workout_backend

bundle install
rails db:create db:migrate db:seed
rails s
```

The API will be available at `http://localhost:3000`.

### Frontend Setup

1. Clone this repo:
   ```sh
   git clone https://github.com/SincerelyBrittany/trackYourWorkout.git
   cd trackYourWorkout/track-your-workout-frontend
   ```

2. Create a `config.js` file (gitignored) with your YouTube API key:
   ```js
   const YOUTUBEAPIKEY = 'your_youtube_api_key_here'
   ```

3. Open `index.html` in your browser — no build step required.

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/users` | Create or find a user by username |
| `GET` | `/api/v1/user_workouts?user_id=:id` | Get all workouts for a user |
| `POST` | `/api/v1/user_workouts` | Save a new workout |
| `PUT` | `/api/v1/user_workouts/:id` | Update a workout |
| `DELETE` | `/api/v1/user_workouts/:id` | Delete a workout |

## Project Structure

```
trackYourWorkout/
├── track-your-workout-frontend/
│   ├── index.html
│   ├── styles/
│   │   └── main.css
│   └── src/
│       ├── adapters/
│       │   ├── WorkoutsAdapter.js   # Rails API communication
│       │   └── YoutubeAdapter.js    # YouTube Data API v3
│       ├── components/
│       │   ├── app.js               # App entry point
│       │   ├── login.js             # Username login
│       │   ├── navbar.js            # Navigation and routing
│       │   ├── search.js            # YouTube search + save modal
│       │   ├── searchObj.js         # Search result model
│       │   ├── workout.js           # Individual workout card
│       │   └── workouts.js          # Workout list + add form
│       └── index.js             # Global state initialization
└── track_your_workout_backend/      # Rails API (git submodule)
```

## Roadmap

- [ ] JWT-based user authentication
- [ ] Workout categories and tags
- [ ] Weekly and monthly workout statistics
- [ ] Mobile-responsive layout
- [ ] Edit workout details inline

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push and open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact

Brittany — [@SincerelyBrittt](https://twitter.com/SincerelyBrittt) — [LinkedIn](https://www.linkedin.com/in/sincerelybrittany/) — [Dev.to](https://dev.to/sincerelybrittany)
