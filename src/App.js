import React from 'react';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const USER_ID = 'uzistacks';
const PAT = 'cadeda396d454d61a535c203b71a4436';
const APP_ID = 'Facedetection';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
    };
  }

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  calculateAllBoxes = data => {
    const clairifaiBoxes = data.outputs[0].data.regions;
    const loopedData = clairifaiBoxes.map(box => {
      const boundingBoxes = box.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: boundingBoxes.left_col * width,
        topRow: boundingBoxes.top_row * height,
        rightCol: width - boundingBoxes.right_col * width,
        bottomRow: height - boundingBoxes.bottom_row * height,
      };
    });
    return loopedData;
  };

  displayFaceBoxes = boxes => {
    this.setState({ boxes: boxes });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.imageUrl,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Key ' + PAT,
      },
      body: raw,
    };

    fetch(
      'https://api.clarifai.com/v2/models/' +
        MODEL_ID +
        '/versions/' +
        MODEL_VERSION_ID +
        '/outputs',
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        this.displayFaceBoxes(this.calculateAllBoxes(result));
      })
      .catch(error => console.log('error', error));
  };

  onRouteChange = route => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
          </>
        ) : route === 'signin' ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
