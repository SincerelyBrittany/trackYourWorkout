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
                <button id="workout-btn"> workouts </button> 
                <button id="search-btn"> search </button>
                <button id="logout-btn"> logout </button>`
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
        if (this.searchContainerForm.children.length === 0 && this.workoutContainerForm.children.length === 0){
            this.renderSearch()
            this.renderWorkouts()
        } else if (this.workoutContainerForm.children.length === 0 && this.searchContainerForm.children.length != 0){
            this.renderWorkouts()
        } else (this.workoutContainerForm.children.length != 0 && this.searchContainerForm.children.length != 0)
            this.renderSearch()
    }
       
        // const logoutBtn = document.getElementById("logout-btn")
    renderWorkouts = () => {
        this.workBtn.addEventListener("click", () =>{
            this.searchFormContainerForm.innerHTML = "" 
            this.searchContainerForm.innerHTML = ""
            if (this.workoutContainerForm.children.length === 0){
                new Workouts()
            }
        })
    }

    renderSearch = () => {
        this.searchBtn.addEventListener("click", () =>{
            this.workoutContainer.innerHTML= ""
            this.workoutContainerForm.innerHTML = ""
            if (this.searchFormContainerForm.children.length === 0){
                new Search()
            }
        })
    }
        
        // logoutBtn.addEventListener("click", () =>{
        //     const searchFormContainerForm = document.getElementById('search-form-container')
        //     const searchContainerForm = document.getElementById('search-container')
        //     searchFormContainerForm.innerHTML = "" 
        //     searchContainerForm.innerHTML = ""
        //     const workoutContainerForm = document.getElementById('new-workout-container')
        //     const workoutContainer = document.getElementById('workout-container')
        //     workoutContainer.innerHTML= ""
        //     workoutContainerForm.innerHTML = ""
        //     new Login()
        // })
    
 

}