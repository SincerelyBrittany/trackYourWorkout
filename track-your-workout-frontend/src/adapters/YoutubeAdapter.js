class YoutubeAdapter {
    constructor(){
        this.baseURL = 
        "https://www.googleapis.com/youtube/v3"
    }

    searchYoutube(params){
        return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&q=${params}&type=video&videoEmbeddable=true&videoSyndicated=true&key=${YOUTUBEAPIKEY}`, {
          })
          .then(res=> res.json())
    }
}



// `https://www.youtube.com/embed/${videoID}`


