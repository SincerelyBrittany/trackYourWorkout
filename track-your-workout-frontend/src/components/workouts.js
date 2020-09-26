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
        this.coll = document.getElementsByClassName("collapsible");
        this.newWorkoutCategoryInput = document.getElementById("workout-category")
        this.workoutForm = document.getElementById('new-workout-form')
        this.workoutForm.addEventListener("submit", this.createWorkout.bind(this))
    }

    createWorkout(e){
        e.preventDefault()
        // const { name, url, etc} = this.newWorkoutNameInput
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
            workouts.forEach(workout => this.workouts.push(new Workout(workout)))
        })
        .then(() =>{
            this.render()
        })
    }

    render(){
        // console.log(this.workouts)
        const workoutArray = this.workouts.map(workout => workout.renderHTML()).join(' ')
        this.workoutContainer.innerHTML = `${workoutArray}`
        this.coll.addEventListener("click", this.collapseFunc())
        // console.log(this.workoutContainer, "this is workout container")
    }

    collapseFunc(){
        // var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < this.coll.length; i++) {
            this.coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                content.style.display = "none";
                } else {
                content.style.display = "block";
                }
            });
        }
    }
}
