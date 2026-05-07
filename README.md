# trackYourWorkout
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <img src="https://github.com/SincerelyBrittany/trackYourWorkout/blob/master/track-your-workout-frontend/styles/workout_img.png" alt="Logo" >

  <h3 align="center"> Track Your Workout</h3>

  <p align="center">
    This is a single page application ("SPA") for keeping track of your workouts. I really enjoy working out and since COVID, it has been hard to keep track of the workouts on youtube. Although playlist are nice, I thought it would be cool to have a place to see all workouts for a particular date and/or time.
    <br />
    <i>Live Site - Coming Soon</i>
    &middot;
    <a href="https://www.youtube.com/watch?v=yA5mG-l8TuA&ab_channel=BuildWithBrittany">View Youtube Demo</a> 
    &middot;
    <a href="https://dev.to/sincerelybrittany/javascript-and-rails-single-page-application-spa-3opc">Blog</a> 
    &middot;
    <a href="https://github.com/SincerelyBrittany//trackYourWorkout/issues">Report Bug</a>
    &middot;
    <a href="https://github.com/SincerelyBrittany//trackYourWorkout/issues">Request Feature</a> 
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot][product-screenshot]

This application was built with a Rails backend and JavaScript frontend. Users can search YouTube directly within the app to find workout videos, save them to a personal calendar organized by date, and delete them when done.

### Built With
* [Ruby-on-Rails](https://guides.rubyonrails.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Bootstrap 4](https://getbootstrap.com/docs/4.0/)
* [YouTube Data API v3](https://developers.google.com/youtube/v3)
*  Love ❤️


<!-- GETTING STARTED -->
## Getting Started

To get the application running locally you will need Ruby, Rails, and PostgreSQL installed. Check out the [Rails getting started guide](https://guides.rubyonrails.org/v5.0/getting_started.html) and [PostgreSQL docs](https://www.postgresql.org/about/) if you need to install either.

You will also need a free [YouTube Data API v3 key](https://console.developers.google.com/) to enable workout search.

### Prerequisites

* Ruby 2.7+
* Rails 6+
* PostgreSQL
* A YouTube Data API v3 key

### Installation

1. Clone the repo
```sh
git clone git@github.com:SincerelyBrittany/trackYourWorkout.git
```

2. Set up and start the backend — cd into [track_your_workout_backend](https://github.com/SincerelyBrittany/track_your_workout_backend) and run:
```sh
bundle install
rails db:create db:migrate db:seed
rails s
```

3. Add your YouTube API key — create a `config.js` file inside `track-your-workout-frontend/` (this file is gitignored):
```js
const YOUTUBEAPIKEY = 'your_api_key_here'
```

4. Open the frontend — navigate to `track-your-workout-frontend/` and open `index.html` in your browser. No build step needed!


<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/SincerelyBrittany//trackYourWorkout/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Connect/Follow me:

[![Linkedin][linkedin-shield]][linkedin-url]
[![Twitter][twitter-shield]][twitter-url]
[![Dev.to][dev-to-shield]][dev-to-url]


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Youtube](https://youtube.com)
* [Google](https://google.com)
* [Flatiron School](https://flatironschool.com/)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/SincerelyBrittany/trackYourWorkout.svg?style=flat-square
[contributors-url]: https://github.com/SincerelyBrittany/trackYourWorkout/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/SincerelyBrittany/trackYourWorkout.svg?style=flat-square
[forks-url]: https://github.com/SincerelyBrittany//trackYourWorkout/network/members
[stars-shield]: https://img.shields.io/github/stars/SincerelyBrittany/trackYourWorkout.svg?style=flat-square
[stars-url]: https://github.com/SincerelyBrittany/trackYourWorkout/stargazers
[issues-shield]: https://img.shields.io/github/issues/SincerelyBrittany/trackYourWorkout.svg?style=flat-square
[issues-url]: https://github.com/SincerelyBrittany/trackYourWorkout/issues
[license-shield]: https://img.shields.io/github/license/SincerelyBrittany/trackYourWorkout.svg?style=flat-square
[license-url]: https://github.com/SincerelyBrittany/trackYourWorkout/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/sincerelybrittany/
[twitter-shield]:https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FSincerelyBrittt
[twitter-url]: https://twitter.com/SincerelyBrittt
[dev-to-url]: https://dev.to/sincerelybrittany
[dev-to-shield]:https://img.shields.io/badge/-Dev.to-black.svg?style=flat-square&logo=dev.to&colorB=555
[product-screenshot]: https://github.com/SincerelyBrittany/trackYourWorkout/blob/master/track-your-workout-frontend/styles/workout_gif.gif
