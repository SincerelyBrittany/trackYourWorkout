class NavBar{
    constructor(){
        this.removeLogin()
        this.renderNavBar()
        this.initBindingsAndEventListeners()
        this.toggle()
    }

    removeLogin(){
        const login = document.getElementById("login")
        if(login){
            login.style.display = "none"
            login.remove()
        }
    }

    renderNavBar(){
        let nav = document.querySelector("nav")
        nav.innerHTML = `
                <nav class="navbar navbar-expand-lg">
                
                <ul class="navbar-nav justify-content-around w-100">
               
                <li class="nav-item">
                <button id="workout-btn" class="nav-item nav-link btn"> workouts </button> 
                </li>
                <li class="nav-item">
                <button id="search-btn" class="nav-item nav-link btn"> search </button>
                </li>
                </ul>
                </nav>
                `
    }

    initBindingsAndEventListeners(){
        this.container = document.querySelector(".container")
        this.container.style.display = "block"
        this.workBtn = document.getElementById("workout-btn")
        this.searchBtn = document.getElementById("search-btn")
        this.searchFormContainerForm = document.getElementById('search-form-container')
        this.searchContainerForm = document.getElementById('search-container')
        this.workoutContainerForm = document.getElementById('new-workout-container')
        this.workoutContainer = document.getElementById('workout-container')
    }

    toggle(){
        if (page.name === "home"){
            this.renderSearch()
            this.renderWorkouts()
        } else if (page.name === "workouts"){
            this.renderWorkouts()
        } else if (page.name === "search"){
            this.renderSearch()
        }
        else{
            debugger
        }
    }
       
    renderWorkouts = () => {
        this.workBtn.addEventListener("click", () =>{
            this.searchFormContainerForm.innerHTML = "" 
            this.searchContainerForm.innerHTML = ""
            if (this.workoutContainerForm.children.length === 0){
                page.name = "search"
                this.workBtn.disabled = true;
                this.searchBtn.disabled = false;
                new Workouts()
            } else if (this.workoutContainerForm.children.length === 1 && this.workoutContainer.children.length === 0){
                page.name = "search"
                this.workBtn.disabled = true;
                this.searchBtn.disabled = false;
                new Workouts()
            } else {
                debugger
            }
        })
    }

    renderSearch = () => {
        this.searchBtn.addEventListener("click", () =>{
            this.workoutContainer.innerHTML= ""
            this.workoutContainerForm.innerHTML = ""
            if (this.searchContainerForm.children.length === 0){
                page.name = "workouts"
                this.workBtn.disabled = false;
                this.searchBtn.disabled = true;
                new Search()
            } else {
                debugger
            }
        })
    }
}