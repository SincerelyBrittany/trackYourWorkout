class Workout{
    constructor(workoutJson){
        this.id = workoutJson.id
        this.name = workoutJson.name
        this.url = workoutJson.url
        this.time = workoutJson.time
        this.category = workoutJson.category_id
    }
}