class Login {
    constructor(){
       console.log("hello work")
       this.adapter = new WorkoutsAdapter()
       this.renderLogin()
    }

    renderLogin(){
        document.body.innerHTML = ""
        const h1 = document.createElement("h1")
        h1.innerText = "What is your name?"
        const form = document.createElement("form")
        const input = document.createElement("input")
        input.name = "username"
        form.appendChild(input)
        // form.addEventListener("submit", this.submit.bind(this))
        form.addEventListener("submit", this.submit)
        document.body.append(h1, form)
    }

    // submit(e){
    //     e.preventDefault()
    //     console.log(this)
    // }

    submit = (e) => {
        e.preventDefault()
        console.log(this, "this is the this in login")
        this.adapter.postUser(e.target.username.value).then(user => {
            console.log(user)
            // state.user = user 
            // new this.workouts
            // this.workouts = new Workouts()
        console.log(e.target.username.value)
        })
    }
}