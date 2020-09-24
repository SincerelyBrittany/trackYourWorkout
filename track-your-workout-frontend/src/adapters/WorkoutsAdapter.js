//Service/adapter - what talks to the backend api
class WorkoutsAdapter {
    constructor(){
        this.baseURL = 
        "http://localhost:3000/api/v1/workouts"
    }

    getWorkouts(){
        return fetch(this.baseURL).then(res => res.json()
        )
    }
}