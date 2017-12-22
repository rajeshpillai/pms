import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Greeting from './Components/Greeting';
import Title from './Components/Title';
import ProjectForm from './Components/ProjectForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProjectForm />
      </div>
    );
  }
}

export default App;
