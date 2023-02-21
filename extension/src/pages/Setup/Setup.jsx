import React from 'react';
import './Setup.css';
import './Setup.scss';

import SubjectID from './Components/SubjectID';
import StartButton from './Components/StartButton';

const Setup = () => {

  const handleChange = (e) => {
    console.log(e.target.value)
  }

  return (
    <div className="App">

      <SubjectID />
      <StartButton />
    </div>
    );
};

export default Setup;