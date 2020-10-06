class SearchObj{
    constructor(video){
         this.videoTitle = video.snippet.title
         this.videoID = video.id.videoId
    }

    renderSearchHTML(){
        return `
        <div class="${this.videoID} content"data-set-id="${this.videoID}">
            <span class="selected"> Selected </span>
            <iframe width="420" height="315" src="https://www.youtube.com/embed/${this.videoID}" frameborder="0" allowfullscreen></iframe>
            <p> https://www.youtube.com/embed/${this.videoID}</p>
        </div>`
    }

}