class Workout{
    constructor(workoutJson){
        this.id = workoutJson.id
        this.date = workoutJson.update_date
        this.user = workoutJson.user.username
        this.workout = workoutJson.workout
    }

    renderHTML(){
        return `
            <div class="${this.id} content"data-set-id="${this.id}"><span class="close">x</span>
                <h3> ${this.workout.name}</h3>
                <iframe width="420" height="315" src="${this.workout.url}/embed" frameborder="0" allowfullscreen></iframe>
                <p> ${this.workout.time_updated} </p>
        </div>`
    }   
}