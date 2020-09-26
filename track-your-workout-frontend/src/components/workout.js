class Workout{
    constructor(workoutJson){
        this.id = workoutJson.id
        this.date = workoutJson.date
        this.user = workoutJson.user.name
        this.workout = workoutJson.workout
    }

    renderHTML(){
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