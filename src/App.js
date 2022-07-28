import React from 'react';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const USER_ID = 'uzistacks';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'cadeda396d454d61a535c203b71a4436';
const APP_ID = 'Facedetection';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';
const IMAGE_URL = 'https://samples.clarifai.com/face-det.jpg';

const raw = JSON.stringify({
  user_app_id: {
    user_id: USER_ID,
    app_id: APP_ID,
  },
  inputs: [
    {
      data: {
        image: {
          url: IMAGE_URL,
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

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    };
  }
  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch(
      'https://api.clarifai.com/v2/models/' +
        MODEL_ID +
        '/versions/' +
        MODEL_VERSION_ID +
        '/outputs',
      requestOptions
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
