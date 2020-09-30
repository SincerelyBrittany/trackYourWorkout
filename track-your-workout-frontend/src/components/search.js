class Search{
    constructor(){
        this.search = []
        this.adapter = new YoutubeAdapter()
        this.initBindingsAndEventListeners()
        this.renderForm()
        // this.fetchAndLoadWorkouts()  
    }

    initBindingsAndEventListeners(){
        this.searchContainerForm = document.getElementById('search-container')
    }

}