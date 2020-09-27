class Workouts{
    constructor(){
        this.workouts = {}
        this.adapter = new WorkoutsAdapter()
        this.initBindingsAndEventListeners()
        this.fetchAndLoadWorkouts()  
    }
    
    initBindingsAndEventListeners(){
        this.workoutContainer = document.getElementById('workout-container')
        this.newWorkoutNameInput = document.getElementById("workout-name")
        this.newWorkoutUrlInput = document.getElementById("workout-url")
        // this.newWorkoutTimeInput = document.getElementById("workout-time")
        this.newMeetingTimeInput = document.getElementById("meeting-time")
        this.newUserInput = document.getElementById("workout-user")
        this.coll = document.getElementsByClassName("collapsible");
        // this.newWorkoutCategoryInput = document.getElementById("workout-category")
        this.workoutForm = document.getElementById('new-workout-form')
        this.workoutForm.addEventListener("submit", this.createWorkout.bind(this))
    }

    createWorkout(e){
        e.preventDefault()
        // const { name, url, etc} = this.newWorkoutNameInput
        const name = this.newWorkoutNameInput.value
        const url = this.newWorkoutUrlInput.value
        const time = this.newMeetingTimeInput.value
        const username = this.newUserInput.value
        // const category = this.newWorkoutCategoryInput.value
        const date = this.newMeetingTimeInput.value
        console.log(name, url, time, username, date)
        this.adapter.createWorkout(name, url, time, date, username).then(workout => {
            console.log(workout)
        })
    }

    fetchAndLoadWorkouts(){
        this.adapter.getWorkouts().then(workouts =>{
            
            workouts.forEach(workout => {
                if (this.workouts[workout.update_date]) {
                    this.workouts[workout.update_date].push(new Workout(workout))
                } else {
                    this.workouts = {...this.workouts, [workout.update_date]: [new Workout(workout)]}
                }
            })
        })
        .then(() =>{
            this.render()
        })
    }

    render(){

        const workoutString = Object.keys(this.workouts).map((date) => {
           return `<button type="button" class="collapsible">${date}</button><div id="all-workouts">
            ${this.workouts[date].map((work) => work.renderHTML()).join(' ')}</div>`
        }).join(' ')
        // const workoutArray = this.workouts.map(workout => workout.renderHTML()).join(' ')
        this.workoutContainer.innerHTML = `${workoutString}`
        this.collapseFunc()
    }

    collapseFunc(){
        let i;
        for (i = 0; i < this.coll.length; i++) {
            this.coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                console.log(content)
                if (content.style.display === "block") {
                content.style.display = "none";
                } else {
                content.style.display = "block";
                }
                // if (content.style.display === "block") {
                // content.style.display = "none";
                // } else {
                // content.style.display = "block";
                // }
            });
        }
    }
}
