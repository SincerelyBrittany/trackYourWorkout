class Search{
    constructor(){
        new NavBar()
        this.search = {}
        this.searchArr = []
        this.adapter = new YoutubeAdapter()
        this.initBindingsAndEventListeners()
        this.renderForm()
        this.workoutsAdapter = new WorkoutsAdapter()
    }

    initBindingsAndEventListeners(){
        this.searchFormContainerForm = document.getElementById('search-form-container')
        this.searchContainerForm = document.getElementById('search-container')
        this.searchBtn = document.getElementById("search-btn")
        this.searchBtn.disabled = false;
    }

    renderForm(){
        this.searchFormContainerForm.innerHTML +=
        `<h1> Search for a Workout </h1> <form id="new-search-form">
            <input id="query" type="text" placeholder="Search for a workout here" required/>
            <input type="submit"/>
        </form>`
        // if (this.searchContainerForm.children.length === 0){
            const searchForm = document.getElementById('new-search-form')
            this.searchEventListener(searchForm)
            // this.searchForm.addEventListener("submit", this.searchForWorkout.bind(this))
        // } 
    }

    searchEventListener(searchForm){  
        searchForm.addEventListener("submit", this.searchForWorkout.bind(this))
   }

    searchForWorkout = (e) => {
        e.preventDefault()
        const that = this
        this.querySearch = document.getElementById("query").value
        const searchForm = document.getElementById('new-search-form')
        if(this.searchArr.length === 0){
        this.adapter.searchYoutube(this.querySearch).then((videos) => {
            videos["items"].forEach(video => { 
                const newSearch = new SearchObj(video)
                this.search[newSearch.videoID] = newSearch
                const arr = newSearch
                this.searchArr.push(arr)
                const searchString = this.searchArr.map((video) => {
                    return `
                    <div class="search-result-container">
                    <h3>${video.videoTitle}</h3>
                    <iframe width="420" height="315" src="https://www.youtube.com/embed/${video.videoID}" frameborder="0" allowfullscreen></iframe>
                    <button data-set-id="${video.videoID}" class="search-btn"> Select </button>
                    </div>`
                }).join(' ')
                this.searchContainerForm.innerHTML = `${searchString}`
                const allBtns = document.querySelectorAll('.search-btn')
                      allBtns.forEach(function(currentBtn){
                        currentBtn.addEventListener('click', (e)=>{
                        const id = e.currentTarget.dataset.setId
                        const title = e.currentTarget.parentElement.children[0].innerText
                        that.openModal(id, title)
                    })
                })
            })
        })
        } else {
            this.searchArr = []
            this.searchContainerForm.innerHTML = ""
            this.searchEventListener(searchForm)
        }
    }

    openModal = (id, title) => {
        let modal = document.getElementById("myModal");
        let modalContent = document.querySelector(".modal-content")
        let createform = document.createElement("form")
        let span = document.getElementsByClassName("escape")[0];
        createform.innerHTML = `
        <input id="workout-name" type="text" value="${title}" name="name" required />
        <input type="hidden" id="workout-url" type="text" name="url" value="https://www.youtube.com/embed/${id}" required>
          <input type="datetime-local" id="meeting-time"
          name="meeting" value="2020-09-14T13:20" min="2020-06-14T00:00"
          max="2030-06-14T00:00" required>
        <input type="submit"/>`
        modalContent.appendChild(createform)
        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
            modal.querySelector("form").remove()
         }

        createform.addEventListener("submit", (e)=>{
            e.preventDefault();
            this.searchFormContainerForm.innerHTML = ""
            this.searchContainerForm.innerHTML = ""
            const name = document.getElementById("workout-name").value
            const url = document.getElementById("workout-url").value
            const time = document.getElementById("meeting-time").value
            const date = document.getElementById("meeting-time").value
            this.workoutsAdapter.createWorkout(name, url, time, date).then(workout => { 
                modal.style.display = "none";
                createform.remove()
                page.name = "search"
                new Workouts()
            })
        })
    }
}