//Service/adapter - what talks to the backend api
class WorkoutsAdapter {
    constructor(){
        this.baseURL = 
        // "http://localhost:3000/api/v1/workouts"
        "http://localhost:3000/api/v1/user_workouts"
    }

    getWorkouts(){
        return fetch(this.baseURL).then(res => res.json()
        )
    }

    createWorkout(name, url, time, category){
        const data ={
            name: name,
            url: url,
            time: time,
            category_id: category
        }
        return fetch(this.baseURL, {
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify({workout: data})
        })
        .then(res => res.json())
    }
}