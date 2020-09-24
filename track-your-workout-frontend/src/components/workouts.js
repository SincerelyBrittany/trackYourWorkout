class Workouts{
    constructor(){
        this.workouts = []
        this.adapter = new WorkoutsAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadWorkouts()
    }
    
    initBindingsAndEventListeners(){
        this.workoutContainer = document.getElementById('workout-container')
        this.newWorkoutNameInput = document.getElementById("workout-name")
        this.newWorkoutUrlInput = document.getElementById("workout-url")
        this.newWorkoutTimeInput = document.getElementById("workout-time")
        this.newWorkoutCategoryInput = document.getElementById("workout-category")
        this.workoutForm = document.getElementById('new-workout-form')
        this.workoutForm.addEventListener("submit", this.createWorkout.bind(this))
    }

    createWorkout(e){
        e.preventDefault()
        const name = this.newWorkoutNameInput.value
        const url = this.newWorkoutUrlInput.value
        const time = this.newWorkoutTimeInput.value
        const category = this.newWorkoutCategoryInput.value
        this.adapter.createWorkout(name, url, time, category).then(workout => {
            console.log(workout)
        })
    }

    fetchAndLoadWorkouts(){
        this.adapter.getWorkouts().then(workouts =>{
            // workouts["data"].forEach(element => console.log(element["attributes"]["date"]));
            workouts["data"].forEach(workout => this.workouts.push(new Workout(workout)))
        })
        .then(() =>{
            this.render()
        })
    }

    render(){
        console.log(this.workouts)
        const workoutArray = this.workouts.map(workout => workout.renderHTML()).join(' ')
        this.workoutContainer.innerHTML = `${workoutArray}`
    }
}