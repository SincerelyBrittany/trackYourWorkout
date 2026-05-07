class Workouts {
  constructor() {
    this.workouts = {}
    this.adapter = new WorkoutsAdapter()
    this.initBindingsAndEventListeners()
    this.renderForm()
    this.fetchAndLoadWorkouts()
  }

  initBindingsAndEventListeners() {
    new NavBar()
    this.workoutContainerForm = document.getElementById('new-workout-container')
    this.workoutContainer = document.getElementById('workout-container')
    this.coll = document.getElementsByClassName('collapsible')
    this.deleteButton = document.getElementsByClassName('close')
  }

  renderForm() {
    const now = new Date()
    const pad = n => String(n).padStart(2, '0')
    const currentDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`

    this.workoutContainerForm.innerHTML += `
      <h1>Welcome, ${state.user.username}</h1>
      <h2>Your Workout Tracker</h2>
      <form id="new-workout-form">
        <input id="workout-name" type="text" placeholder="Workout name" required/>
        <input id="workout-url" type="text" placeholder="YouTube embed URL" required/>
        <input type="datetime-local" id="meeting-time" name="meeting-time"
          value="${currentDateTime}" min="2020-01-01T00:00" max="2030-12-31T23:59" required>
        <input type="submit" value="Add Workout"/>
      </form>`
    this.workoutForm = document.getElementById('new-workout-form')
    this.workoutForm.addEventListener('submit', this.createWorkout.bind(this))
  }

  createWorkout(e) {
    e.preventDefault()
    const name = document.getElementById('workout-name').value
    const url = document.getElementById('workout-url').value
    const time = document.getElementById('meeting-time').value
    const date = document.getElementById('meeting-time').value
    this.adapter.createWorkout(name, url, time, date)
      .then(workout => {
        if (workout.errors) {
          alert('Error creating workout: ' + workout.errors.join(', '))
          return
        }
        if (this.workouts[workout.update_date]) {
          this.workouts[workout.update_date].push(new Workout(workout))
        } else {
          this.workouts = { ...this.workouts, [workout.update_date]: [new Workout(workout)] }
        }
        this.render()
      })
      .catch(() => alert('Error creating workout. Please try again.'))
  }

  fetchAndLoadWorkouts() {
    this.workoutContainer.innerHTML = '<p>Loading your workouts...</p>'
    this.adapter.getWorkouts()
      .then(workouts => {
        workouts.forEach(workout => {
          if (this.workouts[workout.update_date]) {
            this.workouts[workout.update_date].push(new Workout(workout))
          } else {
            this.workouts = { ...this.workouts, [workout.update_date]: [new Workout(workout)] }
          }
        })
      })
      .then(() => this.render())
      .catch(() => {
        this.workoutContainer.innerHTML = '<p>Error loading workouts. Please refresh and try again.</p>'
      })
  }

  render() {
    if (Object.keys(this.workouts).length === 0) {
      this.workoutContainer.innerHTML = '<p>No workouts yet — search for one to get started!</p>'
      return
    }
    const workoutString = Object.keys(this.workouts).map(date => `
      <button type="button" class="collapsible">${date}</button>
      <div id="all-workouts">
        ${this.workouts[date].map(work => work.renderHTML()).join(' ')}
      </div>`
    ).join(' ')
    this.workoutContainer.innerHTML = workoutString
    this.collapseFunc()
    this.deleteFunc()
  }

  collapseFunc() {
    Array.from(this.coll).forEach(btn => {
      btn.addEventListener('click', function () {
        this.classList.toggle('active')
        const content = this.nextElementSibling
        content.style.display = content.style.display === 'block' ? 'none' : 'block'
      })
    })
  }

  deleteFunc() {
    Array.from(this.deleteButton).forEach(btn => {
      btn.addEventListener('click', () => {
        const divElement = btn.parentElement
        const divID = btn.parentElement.dataset.setId
        this.adapter.deleteWorkout(divID)
          .then(() => {
            const parent = divElement.parentElement
            if (parent && parent.children.length > 1) {
              divElement.remove()
            } else {
              parent && parent.remove()
              divElement.remove()
            }
          })
          .catch(() => alert('Error deleting workout. Please try again.'))
      })
    })
  }
}
