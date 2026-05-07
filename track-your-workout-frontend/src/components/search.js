class Search {
  constructor() {
    new NavBar()
    this.search = {}
    this.searchArr = []
    this.adapter = new YoutubeAdapter()
    this.workoutsAdapter = new WorkoutsAdapter()
    this.initBindingsAndEventListeners()
    this.renderForm()
  }

  initBindingsAndEventListeners() {
    this.searchFormContainerForm = document.getElementById('search-form-container')
    this.searchContainerForm = document.getElementById('search-container')
    this.searchBtn = document.getElementById('search-btn')
    this.searchBtn.disabled = false
  }

  renderForm() {
    this.searchFormContainerForm.innerHTML += `
      <h1>Search for a Workout</h1>
      <form id="new-search-form">
        <input id="query" type="text" placeholder="Search for a workout here" required/>
        <input type="submit" value="Search"/>
      </form>`
    document.getElementById('new-search-form').addEventListener('submit', this.searchForWorkout.bind(this))
  }

  searchForWorkout = (e) => {
    e.preventDefault()
    const query = document.getElementById('query').value
    e.target.reset()
    this.searchArr = []
    this.searchContainerForm.innerHTML = '<p>Loading results...</p>'

    this.adapter.searchYoutube(query)
      .then(data => {
        if (!data.items || data.items.length === 0) {
          this.searchContainerForm.innerHTML = '<p>No results found. Try a different search.</p>'
          return
        }
        data.items.forEach(video => {
          const result = new SearchObj(video)
          this.search[result.videoID] = result
          this.searchArr.push(result)
        })
        this.renderResults()
      })
      .catch(() => {
        this.searchContainerForm.innerHTML = '<p>Error loading results. Please try again.</p>'
      })
  }

  renderResults() {
    const html = this.searchArr.map(video => `
      <div class="search-result-container">
        <h3>${video.videoTitle}</h3>
        <iframe width="420" height="315" src="https://www.youtube.com/embed/${video.videoID}" frameborder="0" allowfullscreen></iframe>
        <button data-set-id="${video.videoID}" data-title="${video.videoTitle}" class="search-btn">Select</button>
      </div>`
    ).join(' ')
    this.searchContainerForm.innerHTML = html
    document.querySelectorAll('.search-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        this.openModal(e.currentTarget.dataset.setId, e.currentTarget.dataset.title)
      })
    })
  }

  openModal = (id, title) => {
    const modal = document.getElementById('myModal')
    const modalContent = document.querySelector('.modal-content')
    const span = document.getElementsByClassName('escape')[0]
    const now = new Date()
    const pad = n => String(n).padStart(2, '0')
    const currentDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`

    const form = document.createElement('form')
    form.innerHTML = `
      <input id="workout-name" type="text" value="${title}" name="name" required/>
      <input type="hidden" id="workout-url" name="url" value="https://www.youtube.com/embed/${id}">
      <input type="datetime-local" id="meeting-time" name="meeting"
        value="${currentDateTime}" min="2020-01-01T00:00" max="2030-12-31T23:59" required>
      <input type="submit" value="Save Workout"/>`
    modalContent.appendChild(form)
    modal.style.display = 'block'

    span.onclick = () => {
      modal.style.display = 'none'
      form.remove()
    }

    form.addEventListener('submit', e => {
      e.preventDefault()
      const name = document.getElementById('workout-name').value
      const url = document.getElementById('workout-url').value
      const time = document.getElementById('meeting-time').value
      const date = document.getElementById('meeting-time').value
      this.workoutsAdapter.createWorkout(name, url, time, date)
        .then(() => {
          modal.style.display = 'none'
          form.remove()
          this.searchFormContainerForm.innerHTML = ''
          this.searchContainerForm.innerHTML = ''
          page.name = 'search'
          new Workouts()
        })
        .catch(() => alert('Error saving workout. Please try again.'))
    })
  }
}
