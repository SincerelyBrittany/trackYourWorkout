class Workouts{
    constructor(){
        this.workouts = {}
        this.searchedWorkouts = {}
        this.adapter = new WorkoutsAdapter()
        this.initBindingsAndEventListeners()
        this.renderForm()
        this.fetchAndLoadWorkouts()  
    }
    
    initBindingsAndEventListeners(){
        new NavBar
        this.workoutContainerForm = document.getElementById('new-workout-container')
        this.workoutContainer = document.getElementById('workout-container')
        this.coll = document.getElementsByClassName("collapsible");
        this.deleteButton = document.getElementsByClassName("close")
        this.deleteFunc.bind(this)
    }
    
    renderForm(){
        this.workoutContainerForm.innerHTML +=
        `
        <h1> Welcome ${state.user.username} </h1>
            <h2> Your Workout Tracker</h2>
                <form id="new-workout-form">
                    <input id="workout-name" type="text" placeholder="name" required/>
                    <input id="workout-url" type="text" placeholder="Enter embeded URL" required/>
                    <input type="datetime-local" id="meeting-time"
                    name="meeting-time" value="2020-06-14T00:00" min="2020-06-14T00:00"
                    max="2030-06-14T00:00" required>
                    <input type="submit"/>
            </form>`
        this.workoutForm = document.getElementById('new-workout-form')
        this.workoutForm.addEventListener("submit", this.createWorkout.bind(this))
    }

    createWorkout(e){
        e.preventDefault()
        this.newWorkoutNameInput = document.getElementById("workout-name")
        this.newWorkoutUrlInput = document.getElementById("workout-url")
        this.newMeetingTimeInput = document.getElementById("meeting-time")
        this.newUserInput = document.getElementById("workout-user")
        const name = this.newWorkoutNameInput.value
        const url = this.newWorkoutUrlInput.value
        const time = this.newMeetingTimeInput.value
        const date = this.newMeetingTimeInput.value
        this.adapter.createWorkout(name, url, time, date).then(workout => {  
            if (this.workouts[workout.update_date]) {
                this.workouts[workout.update_date].push(new Workout(workout))
                this.render()
            } else {
                this.workouts = {...this.workouts, [workout.update_date]: [new Workout(workout)]}
                this.render()
            }
        })
    }

      fetchAndLoadWorkouts(){
        this.adapter.getWorkouts().then(workouts =>{
            workouts.forEach(workout => {
                if (workout.user_id === state.user.id ){
                if (this.workouts[workout.update_date]) {
                    this.workouts[workout.update_date].push(new Workout(workout))
                } else {
                    this.workouts = {...this.workouts, [workout.update_date]: [new Workout(workout)]}
                }
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
        this.workoutContainer.innerHTML = `${workoutString}`
        this.collapseFunc()
        this.deleteFunc()
        this.searchDate()
    }

    collapseFunc(){
        let i;
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

    searchDate(){
        let dateForm = document.createElement('form')
        dateForm.innerHTML = `<input id="filterworkout" type="text" placeholder="search by date" required/> <input type="submit"/>`
        this.workoutContainerForm.appendChild(dateForm)
        dateForm.addEventListener("submit", this.handleDate.bind(this))
    }

    handleDate(e){
        e.preventDefault()
        let filter = document.getElementById("filterworkout").value
        let allWorkouts = this.workouts
        for (const key in allWorkouts){
            let keyValue = allWorkouts[key]
            keyValue.forEach(workout => {
                if(workout.date === filter){
                    if (this.searchedWorkouts[workout.date]) {
                        this.searchedWorkouts[workout.date].push(workout)
                        this.renderSearch()
                    } else {
                        this.searchedWorkouts = {...this.searchedWorkouts, [workout.date]: [workout]}
                        this.renderSearch()
                    }
                }
            })
        }
    }

    renderSearch(){
        const workoutString = Object.keys(this.searchedWorkouts).map((date) => {
            return `<button type="button" class="collapsible">${date}</button><div id="all-workouts">
             ${this.searchedWorkouts[date].map((work) => work.renderHTML()).join(' ')}</div>`
         }).join(' ')
         this.workoutContainer.innerHTML = `${workoutString}`  
         this.collapseFunc()
         this.deleteFunc()
      }

    deleteFunc(){
        const that = this
        let i;
        for (i = 0; i < this.deleteButton.length; i++) {
            this.deleteButton[i].addEventListener("click", function() {
                const theDivElement = this.parentElement
                const theDivID = this.parentElement.dataset.setId
                that.adapter.deleteWorkout(theDivID).then(() => {
                    if (theDivElement.parentElement.innerHTML !== ""){
                            theDivElement.remove()
                    }
                    else{
                         theDivElement.parentElement.remove()
                         theDivElement.remove()
                    }
                })
            });
        }
    }
}
