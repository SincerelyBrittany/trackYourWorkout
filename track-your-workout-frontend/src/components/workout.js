class Workout{
    constructor(workoutJson){
        this.id = workoutJson.id
        this.date = workoutJson.date
        this.user = workoutJson.user.name
        this.workout = workoutJson.workout
        // this.time = workoutJson.time
        // this.category = workoutJson.category_id
    }

 

    renderHTML(){
        // const btn = document.createElement('button')
        // btn.className = 'collapsible'
        // btn.addEventListener("click", function() {
        //     this.classList.toggle("active");
        //     var content = this.nextElementSibling;
        //     if (content.style.display === "block") {
        //     content.style.display = "none";
        //     } else {
        //     content.style.display = "block";
        //     }
        // })
        // const div = document.createElement('div')
        // div.dataset.id = this.id
        // div.className = this.workout.name
        // const p = document.createElement('p')
        // p.innerText = `The user is: ${this.user}`
        // btn.append(div,p)
        return `
        <button type="button" class="collapsible">${this.date}</button>
            <div class="${this.id} content"data-set-id="${this.id}">
                <p> The user is: ${this.user} </p>
                <h3> The workout name is: ${this.workout.name}</h3>
                <iframe width="420" height="315" src="${this.workout.url}/embed" frameborder="0" allowfullscreen></iframe>
                <p> The time is ${this.workout.time} </p>
        </div>`
    }

   
}