class Login {
  constructor() {
    this.adapter = new WorkoutsAdapter()
    this.renderLogin()
  }

  renderLogin() {
    const container = document.querySelector('.container')
    container.style.display = 'none'
    const loginContainer = document.getElementById('login')
    const h1 = document.createElement('h1')
    h1.className = 'loginh1'
    h1.innerText = 'What is your name?'
    const form = document.createElement('form')
    const input = document.createElement('input')
    input.id = 'username'
    input.name = 'username'
    input.placeholder = 'Enter your name'
    input.required = true
    const submitBtn = document.createElement('button')
    submitBtn.type = 'submit'
    submitBtn.innerText = 'Get Started'
    submitBtn.className = 'btn'
    form.append(input, submitBtn)
    form.addEventListener('submit', this.submit)
    loginContainer.append(h1, form)
  }

  submit = (e) => {
    e.preventDefault()
    this.adapter.postUser(e.target.username.value)
      .then(user => {
        state.user = user
        page.name = 'home'
        new NavBar()
      })
  }
}
