class YoutubeAdapter {
  constructor() {
    this.baseURL = 'https://www.googleapis.com/youtube/v3'
  }

  searchYoutube(query) {
    const params = new URLSearchParams({
      part: 'snippet',
      maxResults: 5,
      order: 'relevance',
      q: query,
      type: 'video',
      videoEmbeddable: true,
      videoSyndicated: true,
      key: YOUTUBEAPIKEY
    })
    return fetch(`${this.baseURL}/search?${params}`)
      .then(res => res.json())
  }
}
