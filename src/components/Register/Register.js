import React from 'react'

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      name: ''
    }
  }

  onNameChange = (event) =>{
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) =>{
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) =>{
    this.setState({password: event.target.value})
  }

  onSubmitSignIn = (event) =>{
    event.preventDefault()
    fetch('https://backend-app-xj26.onrender.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response=>{
        return response.json()
      })
      .then(user=>{
        console.log(user)
        if(user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home')
        }
      })
  }

  render() {
    const { onRouteChange } = this.props;

    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-100-m w-25-l mw5 center">
        <main className="pa4 black-80">
          <form className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange = { this.onNameChange }/>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange = { this.onEmailChange }/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange = { this.onPasswordChange }/>
              </div>
            </fieldset>
            <div className="lh-copy mt3">
              <p
                onClick={ this.onSubmitSignIn }
                className="f6 link dim black db pointer">Register</p>
            </div>
          </form>
        </main>
      </article>
    )
  }
}

export default Register;
