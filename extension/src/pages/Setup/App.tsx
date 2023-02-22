import React, { useLayoutEffect } from 'react';

import { ChromeStorage } from '../../utils/custom/ChromeStorage';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { T_CONFIG_ACTIONS } from './redux/actions/configActions';
import { useSelector } from 'react-redux';
import { T_APP_STATE } from './redux/reducers';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useConfig } from './hooks/useConfig';

import Main from './views/Main/Main';
import ConfigGenerator from './views/ConfigGenerator/ConfigGenerator';
import ExperimentSetup from './views/ExperimentSetup/ExperimentSetup';
import About from './views/About/About';

import "./style.module.scss";



const App = () => {
  const config = useSelector((state:T_APP_STATE) => state.config)
  const configDispatch = useDispatch<Dispatch<T_CONFIG_ACTIONS>>()
  
  const {is_config_experiment_applicable, is_config_mapping_applicable} = useConfig()

  console.log("Hello from Setup")
 
  // Update before rendering
  useLayoutEffect(() => {
    const init = async () => {
      const settings = await ChromeStorage.get_experiment_settings()
      const experiment_applicable = await is_config_experiment_applicable(settings.config)
      const mapping_applicable = await is_config_mapping_applicable(settings.config)

      configDispatch({
        type: "SET_VALUE",
        payload: settings.config
      })
      configDispatch({
        type: "SET_EXPERIMENT_APPLICABLE",
        payload: experiment_applicable
      })
      configDispatch({
        type: "SET_MAPPING_APPLICABLE",
        payload: mapping_applicable
      })
    }
    init()
  }, [])


  return(
    <>
      <HashRouter>
        <Routes>
          <Route 
            path="/"
            element={<Main />}
          />
          <Route 
            path="/config-generator"
            element={<ConfigGenerator />}
          />
          <Route 
            path="/experiment-setup"
            element={<ExperimentSetup />}
          />
          <Route 
            path="/about"
            element={<About />}
          />
        </Routes>
      </HashRouter>
    </>
  )
};

export default App;