class Login {
    constructor(){
       this.adapter = new WorkoutsAdapter()
       this.renderLogin()
    }

    renderLogin(){
        const container = document.querySelector(".container")
        container.style.display = "none"
        const loginContainer = document.getElementById("login")
        const h1 = document.createElement("h1")
        h1.innerText = "What is your name?"
        const form = document.createElement("form")
        const input = document.createElement("input")
        input.name = "username"
        form.appendChild(input)
        form.addEventListener("submit", this.submit)
        loginContainer.append(h1, form)
    }

    submit = (e) => {
        e.preventDefault()
        console.log(this, "this is the this in login")
        this.adapter.postUser(e.target.username.value).then(user => {
            state.user = user 
            page.name = "home"
            new NavBar()
            // new Workouts()
            // new Search()
        })
    }
}