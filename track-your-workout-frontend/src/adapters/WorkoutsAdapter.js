const BASE_URL = 'http://localhost:3000'

class WorkoutsAdapter {
  constructor() {
    this.baseURL = `${BASE_URL}/api/v1/user_workouts`
  }

  postUser(username) {
    return fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    }).then(res => res.json())
  }

  getWorkouts() {
    return fetch(`${this.baseURL}?user_id=${state.user.id}`)
      .then(res => res.json())
  }

  createWorkout(name, url, time, date) {
    const data = { name, url, time, date, username: state.user.id }
    return fetch(this.baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_workout: data })
    }).then(res => res.json())
  }

  deleteWorkout(id) {
    return fetch(`${this.baseURL}/${id}`, { method: 'DELETE' })
      .then(res => res.json())
  }
}
