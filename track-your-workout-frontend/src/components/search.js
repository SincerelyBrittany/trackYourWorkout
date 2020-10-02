class Search{
    constructor(){
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
    }

    renderForm(){
        this.searchFormContainerForm.innerHTML +=
        `<form id="new-search-form">
            <input id="query" type="text" placeholder="Search for a video" required/>
            <input type="submit"/>
        </form>`
        this.searchForm = document.getElementById('new-search-form')

        this.searchForm.addEventListener("submit", this.searchForWorkout.bind(this))
    }

    searchForWorkout = (e) => {
        e.preventDefault()
        const that = this
        this.querySearch = document.getElementById("query").value
        this.adapter.searchYoutube(this.querySearch).then((videos) => {
            videos["items"].forEach(video => { 
                const newSearch = new SearchObj(video)
                this.search[newSearch.videoID] = newSearch
                const arr = newSearch
                this.searchArr.push(arr)
                const searchString = this.searchArr.map((video) => {
                    return `
                    <div class="search-result-container">
                    <div class="card">
                    <iframe width="420" class="card-img-top" height="315" src="https://www.youtube.com/embed/${video.videoID}" frameborder="0" allowfullscreen></iframe>
                    <div class="card-body">
                    <h3 class="card-title">${video.videoTitle}</h3>
                    <button data-set-id="${video.videoID}" class="btn card-text"> Select </button>
                    </div>
                    </div>`
                }).join(' ')
                this.searchContainerForm.innerHTML = `<div class="card-group">${searchString}</div>`
                // this.searchForm.reset()
                const buttons = document.querySelectorAll('.btn')
                    buttons.forEach(function(currentBtn){
                    currentBtn.addEventListener('click', (e)=>{
                        // debugger
                        const id = e.currentTarget.dataset.setId
                        const title = e.currentTarget.parentElement.children[0].innerText
                        that.openModal(id, title)
                    })
                })
            })
        })
    }

    openModal = (id, title) => {
        let modal = document.getElementById("myModal");
        let modalContent = document.querySelector(".modal-content")
        let createform = document.createElement("form")
        let span = document.getElementsByClassName("escape")[0];
        createform.innerHTML = `
        <input id="workout-name" type="text" value="${title}" name="name" required/>
        <input type="hidden" id="workout-url" type="text" name="url" value="https://www.youtube.com/embed/${id}" required>
          <input type="datetime-local" id="meeting-time"
          name="meeting" value="2020-09-14T00:00" min="2020-09-14T00:00"
          max="2030-06-14T00:00">
        <input type="submit"/>`
        // if (modal.style.display === "block"){
        //     modal.style.display = "none";
        //     modal.querySelector("form").remove()
        //     new Search()
        // }else {
            modal.style.display = "block";
            modalContent.appendChild(createform)
            createform.addEventListener("submit", (e)=>{
                e.preventDefault();
                debugger
                this.searchFormContainerForm.innerHTML = ""
                this.searchContainerForm.innerHTML = ""
                const name = document.getElementById("workout-name").value
                const url = document.getElementById("workout-url").value
                const time = document.getElementById("meeting-time").value
                const date = document.getElementById("meeting-time").value
                this.workoutsAdapter.createWorkout(name, url, time, date).then(workout => { 
                    console.log(workout)
                    modal.style.display = "none";
                    new Workouts()
                    new NavBar()
                })
            })
        // }

        span.onclick = function() {
            modal.style.display = "none";
            modal.querySelector("form").remove()
         }

    }

}

        // videoID: video.id.videoId,
            // let videoTitle = video.snippet.title,
            // let description = video.snippet.description,
            // let image = video.snippet.thumbnails.medium)
            // debugger