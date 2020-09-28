//Service/adapter - what talks to the backend api
class WorkoutsAdapter {
    constructor(){
        this.baseURL = 
        // "http://localhost:3000/api/v1/workouts"
        "http://localhost:3000/api/v1/user_workouts"
    }

    postUser = (username) => {
    return fetch("http://localhost:3000/api/v1/users", {
        method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({user_workout: data})
        })
        .then(res => res.json())
    }

    getWorkouts(){
        return fetch(this.baseURL).then(res => res.json()
        )
    }

    createWorkout(name, url, time, date, username){
        const data ={
            name: name,
            url: url,
            time: time,
            date: date, 
            username: username
        }
        return fetch(this.baseURL, {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({user_workout: data})
        })
        .then(res => res.json())
    }

    deleteWorkout(id){
        console.log(id, "this is in the delete adapater")
        return fetch(`${this.baseURL}/${id}`, {
            method: "DELETE"
          })
          .then(res=> res.json())
    }
}