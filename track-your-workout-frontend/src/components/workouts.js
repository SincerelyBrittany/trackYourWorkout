class Workouts{
    constructor(){
        this.workouts = {}
        this.adapter = new WorkoutsAdapter()
        this.initBindingsAndEventListeners()
        this.renderForm()
        this.fetchAndLoadWorkouts()  
    }
    
    initBindingsAndEventListeners(){
        document.getElementById("login").remove()
        this.workoutContainerForm = document.getElementById('new-workout-container')
        this.workoutContainer = document.getElementById('workout-container')
        this.coll = document.getElementsByClassName("collapsible");
        this.deleteButton = document.getElementsByClassName("close")
        this.deleteFunc.bind(this)
        
    //    this.workoutForm = document.getElementById('new-workout-form')
        // this.workoutContainerForm.children
        // this.newWorkoutCategoryInput = document.getElementById("workout-category")
    }


    fetchAndLoadForm(){
        // var today = new Date();
        // var dd = today.getDate();
        // var mm = today.getMonth()+1; //January is 0!
        // var yyyy = today.getFullYear();
        // if(dd<10){
        //         dd='0'+dd
        //     } 
        //     if(mm<10){
        //         mm='0'+mm
        //     } 

        // today = yyyy+'-'+mm+'-'+dd;
    }

    renderForm(){
        this.workoutContainerForm.innerHTML +=
        `<form id="new-workout-form">
        <input id="workout-name" type="text" placeholder="name"/>
        <input id="workout-url" type="text" placeholder="url"/>
        <!-- <input id="workout-time" type="text" placeholder="time"/> -->
        <input id="workout-user" type="text" placeholder="user"/>
          <input type="datetime-local" id="meeting-time"
          name="meeting-time" value="" max=""
          max="2030-06-14T00:00">
        <input type="submit"/>
      </form>`
       this.workoutForm = document.getElementById('new-workout-form')
        //    this.workoutForm.addEventListener("submit", this.createWorkout.bind(this))
        this.workoutForm.addEventListener("submit", this.createWorkout.bind(this))
    }
    

    createWorkout(e){
        e.preventDefault()
        // const { name, url, etc} = this.newWorkoutNameInput
        // console.log(this.newMeetingTimeInput, "this is the input")
        this.newWorkoutNameInput = document.getElementById("workout-name")
        this.newWorkoutUrlInput = document.getElementById("workout-url")
        this.newMeetingTimeInput = document.getElementById("meeting-time")
        this.newUserInput = document.getElementById("workout-user")
        const name = this.newWorkoutNameInput.value
        const url = this.newWorkoutUrlInput.value
        const time = this.newMeetingTimeInput.value
        const username = this.newUserInput.value
        // const category = this.newWorkoutCategoryInput.value
        const date = this.newMeetingTimeInput.value
        // console.log(name, url, time, username, date)
        this.adapter.createWorkout(name, url, time, date, username).then(workout => {  
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
                if (workout.id === state.user.id){
                if (this.workouts[workout.update_date]) {
                    this.workouts[workout.update_date].push(new Workout(workout))
                } else {
                    this.workouts = {...this.workouts, [workout.update_date]: [new Workout(workout)]}
                }
            } else {
                console.log(workout.id, "the workout id")
                console.log(state.user.id, "this state id")
            }
            })
        })
        .then(() =>{
            this.render()
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


    // fetchAndLoadWorkouts(){
    //     this.adapter.getWorkouts().then(workouts =>{
    //         workouts.forEach(workout => {
    //             debugger
    //             if (workout.id === state.user.id && this.workouts[workout.update_date]) {
    //                 this.workouts[workout.update_date].push(new Workout(workout))
    //             } else if (workout.id === state.user.id && !this.workouts[workout.update_date]) {
    //                 this.workouts = {...this.workouts, [workout.update_date]: [new Workout(workout)]}
    //             } else {
    //             console.log(workout.id, "the workout id")
    //             console.log(state.user.id, "this state id")
    //         }
    //         })
    //     })
    //     .then(() =>{
    //         this.render()
    //     })
    // }

    render(){
        const workoutString = Object.keys(this.workouts).map((date) => {
           return `<button type="button" class="collapsible">${date}</button><div id="all-workouts">
            ${this.workouts[date].map((work) => work.renderHTML()).join(' ')}</div>`
        }).join(' ')
            // debugger
            // console.log(date)})
    //     return `<button type="button" class="collapsible">${date}</button><div id="all-workouts">
    //     ${this.workouts[date].map((work) => work.renderHTML()).join(' ')}</div>`
    // }).join(' ')


        // const workoutArray = this.workouts.map(workout => workout.renderHTML()).join(' ')
        // console.log(workoutString, "this is workout")
        this.workoutContainer.innerHTML = `${workoutString}`
        this.collapseFunc()
        this.deleteFunc()
    }

    collapseFunc(){
        let i;
        for (i = 0; i < this.coll.length; i++) {
            this.coll[i].addEventListener("click", function() {
                // console.log(this, "this is this")
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

    deleteFunc(){
        const that = this
        let i;
        for (i = 0; i < this.deleteButton.length; i++) {
            this.deleteButton[i].addEventListener("click", function() {
                const theDivElement = this.parentElement
                const theDivID = this.parentElement.dataset.setId
                that.adapter.deleteWorkout(theDivID).then(() => {
                    if (theDivElement.parentElement.innerHTML !== ""){
                            // debugger
                            // theDivElement.parentElement.remove()
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
