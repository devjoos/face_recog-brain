import React from 'react';
import './App.css';
import Clarifai from 'clarifai'
import Naviagation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecon from './Components/FaceRecon/FaceRecon';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';


const app = new Clarifai.App({
  apiKey: '26f2017e6bb646bba462e7695df3741c'
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }


  loaduser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined

      }
    })
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value })

  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }


  }
  displayFacebox = (box) => {
    this.setState({ box: box })

  }
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localHost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => {
            return response.json()
          }).then(num => {
            this.setState(Object.assign(this.state.user, { entries: num }))
            // this.setState({
            //   users: {
            //     entries: count
            //   }
            // })
          })
        }
        this.displayFacebox(this.calculateFaceLocation
          (response.outputs[0].data.regions[0].region_info.bounding_box))
      })
      .catch(err => console.log('whoops', err));



  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    return (

      <div className="App">
        <Naviagation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecon imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>
          : (
            this.state.route === 'signin'
              ?
              <SignIn loadUser={this.loaduser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loaduser} onRouteChange={this.onRouteChange} />
          )
        }

      </div>
    );
  }
}
export default App;
