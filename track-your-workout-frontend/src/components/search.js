class Search{
    constructor(){
        this.search = {}
        this.searchArr = []
        this.adapter = new YoutubeAdapter()
        this.initBindingsAndEventListeners()
        this.renderForm()
        // console.log(this.searchArr)
        // console.log(this.search)
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
        this.adapter.searchYoutube(this.querySearch).then((videos) => {
            videos["items"].forEach(video => { 
                const newSearch = new SearchObj(video)
                this.search[newSearch.videoID] = newSearch
                const arr = newSearch
                this.searchArr.push(arr)
                const searchString = this.searchArr.map((video) => {
                    return `<div>${video.videoTitle}</div>
                    <iframe width="420" height="315" src="https://www.youtube.com/embed/${video.videoID}" frameborder="0" allowfullscreen></iframe>
                    <button "data-set-id="${video.videoID}"> Select <button>`
                }).join(' ')
                this.searchContainerForm.innerHTML = `${searchString}`
            })
        })
    }

}

        // videoID: video.id.videoId,
            // let videoTitle = video.snippet.title,
            // let description = video.snippet.description,
            // let image = video.snippet.thumbnails.medium)
            // debugger