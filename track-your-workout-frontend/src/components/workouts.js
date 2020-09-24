class Workouts{
    constructor(){
        this.workouts = []
        this.adapter = new WorkoutsAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadWorkouts()
    }
    
    initBindingsAndEventListeners(){
        this.workoutContainer = document.getElementById('workout-container')
        this.workoutForm = document.getElementById('new-workout-form')
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
        // const workoutContainer = document.getElementById("workout-container")
        const workoutArray = this.workouts.map(workout => workout.renderHTML()).join(' ')
        console.log(this.workoutContainer)
        this.workoutContainer.innerHTML = `${workoutArray}`
    }
}