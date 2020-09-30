class Search{
    constructor(){
        this.search = []
        this.adapter = new YoutubeAdapter()
        this.initBindingsAndEventListeners()
        this.renderForm()
        // this.fetchAndLoadWorkouts()  
    }

    initBindingsAndEventListeners(){
        this.searchFormContainerForm = document.getElementById('search-form-container')
        this.searchContainerForm = document.getElementById('search-container')
    }

    renderForm(){
        this.searchFormContainerForm.innerHTML +=
        `<form id="new-search-form">
            <input id="query" type="text" placeholder="query"/>
            <input type="submit"/>
        </form>`
        this.searchForm = document.getElementById('new-search-form')
        console.log(this.searchForm, "this is the seach form")
        this.searchForm.addEventListener("submit", this.searchForWorkout.bind(this))
    }

    searchForWorkout(e){
        e.preventDefault()
        this.querySearch = document.getElementById("query").value
        this.adapter.searchYoutube(this.querySearch).then(workout => console.log(workout))
    }

}