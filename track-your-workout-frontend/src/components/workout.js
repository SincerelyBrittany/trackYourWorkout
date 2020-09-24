class Workout{
    constructor(workoutJson){
        this.id = workoutJson.id
        this.name = workoutJson.name
        this.url = workoutJson.url
        this.time = workoutJson.time
        this.category = workoutJson.category_id
    }

    renderHTML(){
        return `
        <div class="${this.id}"data-set-id="${this.id}">
        <h3>${this.name}</h3>
        <iframe width="420" height="315" src="${this.url}/embed" frameborder="0" allowfullscreen></iframe>
        <p> ${this.time} </p>
        <p> ${this.category} </p>
        </div>`
    }
}