class NavBar{
    constructor(){
        this.removeLogin()
        this.renderNavBar()
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
        const workBtn = document.getElementById("workout-btn")
        const searchBtn = document.getElementById("search-btn")
        // const logoutBtn = document.getElementById("logout-btn")
        workBtn.addEventListener("click", () =>{
            const searchFormContainerForm = document.getElementById('search-form-container')
            const searchContainerForm = document.getElementById('search-container')
            searchFormContainerForm.innerHTML = "" 
            searchContainerForm.innerHTML = ""
            new Workouts()
        })

        searchBtn.addEventListener("click", () =>{
            const container = document.querySelector(".container")
            container.style.display = "block"
            const workoutContainerForm = document.getElementById('new-workout-container')
            const workoutContainer = document.getElementById('workout-container')
            workoutContainer.innerHTML= ""
            workoutContainerForm.innerHTML = ""
            new Search()
        })
        
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


}