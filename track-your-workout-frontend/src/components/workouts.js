class Workouts{
    constructor(){
        this.workouts = []
        this.adapter = new WorkoutsAdapter()
        // this.bindEventListeners()
        this.fetchAndLoadWorkouts()
    }
    fetchAndLoadWorkouts(){
        this.adapter.getWorkouts().then(workouts =>{
            workouts.forEach(workout => this.workouts.push(new Workout(workout)))
            // return console.log(workout)
        }).then(() =>{
            this.render()
        })
    }

    render(){
        console.log(this.workouts)
        const workoutContainer = document.getElementById("workout-container")
        // workoutContainer.dataset.id = this.workout.id
        const workoutArray = this.workouts.map(workout => `
        <div class="${workout.id}"data-set-id="${workout.id}">
        <h3>${workout.name}</h3>
        <iframe width="420" height="315" src="${workout.url}/embed" frameborder="0" allowfullscreen></iframe>
        <p> ${workout.time} </p>
        <p> ${workout.category} </p>
        </div>`).join(' ')
        console.log(workoutArray)
        workoutContainer.innerHTML = `${workoutArray}`
    }
}