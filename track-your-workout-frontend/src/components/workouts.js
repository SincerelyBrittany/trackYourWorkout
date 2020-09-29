class Workouts{
    constructor(){
        this.workoutArray = []
        this.workouts = {}
        this.adapter = new WorkoutsAdapter()
        this.initBindingsAndEventListeners()
        this.renderForm()
        this.fetchAndLoadWorkouts()  
    }
    
    initBindingsAndEventListeners(){
        document.getElementById("login").remove()
        const container = document.querySelector(".container")
        container.style.display = "block"
        this.workoutContainerForm = document.getElementById('new-workout-container')
        this.workoutContainer = document.getElementById('workout-container')
        this.coll = document.getElementsByClassName("collapsible");
        this.deleteButton = document.getElementsByClassName("close")
        this.deleteFunc.bind(this)
        this.editButton = document.getElementsByClassName("new-edit")
        this.editFunc.bind(this)
        console.log(this.deleteButton)
        console.log(this.editButton)
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
        <input id="workout-url" type="text" placeholder="Enter embeded URL"/>
          <input type="datetime-local" id="meeting-time"
          name="meeting-time" value="" max=""
          max="2030-06-14T00:00">
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
        // const username = state.user.id
        // const category = this.newWorkoutCategoryInput.value
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
            this.workoutArray.push(workouts)
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
        this.editFunc()
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

    editFunc(){
        const that = this
        let i;
         for (i = 0; i < this.editButton.length; i++) {
          this.editButton[i].addEventListener("click", function() {
                const theDivElement = this.parentElement
                const theDivID = this.parentElement.dataset.setId
                that.openModal(theDivID, theDivElement)
               })
        }
    }

    openModal(user_workout_id, div){
        let modal = document.getElementById("myModal");
        let modalContent = document.querySelector(".modal-content")
        let updateform = document.createElement("form")
        let span = document.getElementsByClassName("close")[0];
        let currentWorkout = []
        this.workoutArray[0].forEach(function(id) {
            if (id.id == user_workout_id){
                currentWorkout.push(id)
            }
          })
        updateform.innerHTML = 
        `
        <input id="workout-name" type="text" value="${currentWorkout[0].workout.name}" name="name"/>
        <input id="workout-url" type="text" value="${currentWorkout[0].workout.url}" name="url"/>
          <input type="datetime-local" id="meeting-time"
          name="meeting" value="${currentWorkout[0].date}" max=""
          max="2030-06-14T00:00">
        <input type="submit"/>`
      modalContent.appendChild(updateform)
      modal.style.display = "block";
  
        span.onclick = function() {
            modal.style.display = "none";
            modal.querySelector("form").remove()
         }

         updateform.addEventListener("submit", (e)=>{
            e.preventDefault();
            // console.log(div)
            // console.log(this, "this is this")
            // console.log(e.target.name)
            const data = {
                id: user_workout_id,
                name: e.target.name.value,
                url: e.target.url.value,
                date: e.target.meeting.value,
                time: e.target.meeting.value,
            }
            this.adapter.editWorkout(data).then((workout) => {
                if (this.workouts[workout.update_date]) {
                    this.workouts[workout.update_date].push(new Workout(workout))
                    div.remove()
                    //have to remove div from the this.workouts
                    this.render()
                } else {
                    this.workouts = {...this.workouts, [workout.update_date]: [new Workout(workout)]}
                    div.remove()
                      //have to remove div from the this.workouts
                    this.render()
                }
                // debugger
                // this.fetchAndLoadWorkouts() 
                // this.workouts = {}
            })
        })
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
