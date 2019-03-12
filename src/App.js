import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    clickCount: 0,
    userName: '',
    usernameIsEditable: false,
  }

  componentDidMount() {
    this.getCount();
  }

  handleClick = () => {
    axios.post('/add-click')
      .then(() => this.getCount())
      .catch(error => {
        console.log('error making add click post', error);
      });
  }

  getCount = () => {
    axios.get('/get-clicks')
      .then(response => {
        this.setState({
          ...this.state,
          clickCount: response.data.totalClicks,
          userName: response.data.user
        });
      })
      .catch(error => {
        console.log('error making add click post', error);
      });
  }
  nameChange = (event) => {

    this.setState({
      ...this.state,
      userName: event.target.value
    })
  }
  saveUsername = () => {
    console.log(this.state.userName)
    axios.post('/add-name', {user: this.state.userName})
      .then(() => this.getCount())
      .catch(error => {
        console.log('error making add click post', error);
      });
  
    this.setState({
      ...this.state,
      usernameIsEditable: false,
      userName: '',
    });
  }
  editUsername = () => {
    this.setState({
      usernameIsEditable: true,
    });
  }

  

  render() {
    return (
      <div>
        <center>
          <h1>Click the Cookie!!</h1>
          <p>
            {/* Username should go here */}
            {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
            {this.state.usernameIsEditable ?
              <div>
                <button onClick={this.saveUsername} >Save Username</button>
                <input type='text' onChange={this.nameChange} value={this.state.userName}></input></div> :
              <div><p>Username: {this.state.userName}</p>
                <button onClick={this.editUsername}>Edit Username</button>
              </div>
            }
          </p>
          <p>{this.state.clickCount}</p>
          <span
            role="img"
            aria-label="cookie"
            style={{fontSize: '100px', cursor: 'pointer'}}
            onClick={this.handleClick}
          >
            🍪
          </span>
        </center>
      </div>
    );
  }
}

export default App;
