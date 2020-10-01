class NavBar{
    constructor(){
        this.renderNavBar()
    }

    renderNavBar(){
        let nav = document.querySelector("nav")
        nav.innerHTML = `
                <button id="workout-btn"> workouts </button> 
                <button id="search-btn"> search </button>`
        const workBtn = document.getElementById("workout-btn")
        const searchBtn = document.getElementById("search-btn")
        workBtn.addEventListener("click", () =>{
            const login = document.getElementById("login")
            if(login){
                login.remove()
            }
            new Workouts()
        })

        searchBtn.addEventListener("click", () =>{
            const login = document.getElementById("login")
            if(login){
                login.remove()
            }
            const container = document.querySelector(".container")
            container.style.display = "block"
            new Search()
        })
    }


}