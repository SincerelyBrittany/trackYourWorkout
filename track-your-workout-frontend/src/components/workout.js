class Workout{
    constructor(workoutJson){
        this.id = workoutJson.id
        this.date = workoutJson.attributes.date
        this.user = workoutJson.attributes.user
        this.workout = workoutJson.attributes.workout
        // this.time = workoutJson.time
        // this.category = workoutJson.category_id
    }

    renderHTML(){
        return `
        <div class="${this.id}"data-set-id="${this.id}">
        <p> ${this.user.name} </p>
        <h3>${this.workout.name}</h3>
        <iframe width="420" height="315" src="${this.workout.url}/embed" frameborder="0" allowfullscreen></iframe>
        <p> ${this.workout.time} </p>
        <p> ${this.date} </p>
        </div>`
    }
}