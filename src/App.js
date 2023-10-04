import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg'
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const initialState = {
  input:'',
  imageUrl:'',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: new Date()
  },
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: new Date()
      },
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onChange= (event)=>{
    this.setState({input: event.target.value})
  }

  calculateFace = (result)=>{
    const face = result.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageId');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col*width),
      bottomRow: height -(face.bottom_row*height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box:box})
  }

  onRouteChange=(route)=>{
    if(route==='home') {
      this.setState({isSignedIn:true})
    }
    else {
      this.setState(initialState)
    }
    this.setState({route: route})
  }

  onSubmit=()=>{
    this.setState({imageUrl: this.state.input})

    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": 'angiehm',
          "app_id": 'react-clarifai'
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": this.state.input
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key 8793240e144843a98694a6276daf1515'
      },
      body: raw
  };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response=>response.json())
            .then(count=>{
              this.setState({user:{...this.state.user, entries: count}})
            })
            .catch(console.log)
        }


        this.displayFaceBox(this.calculateFace(result))
      })
      .catch(error => console.log('error', error));
  }

  render(){
    const {isSignedIn, imageUrl, box, route, user} = this.state;
    return (
      <div className="App">
        <ParticlesBg type="circle" className='particles' bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'signin' ?
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          :
          route==='home' ?
          <div>
            <Logo />
            <Rank  name = {user.name} entries = {user.entries}/>
            <ImageLinkForm  onInputChange={this.onChange} onSubmit={this.onSubmit}/>
            <FaceRecognition  imageUrl={imageUrl} box={box}/>
          </div> : <Register onRouteChange={this.onRouteChange}  loadUser={this.loadUser} />
        }
        {/*<ImageLinkForm />
        <FaceREcognition />*/}
      </div>
    );
  }
}

export default App;
