import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Page from './Page';
import * as apis from 'axios';
import { AlitaProvider, setConfig } from 'redux-alita';
import "antd/dist/antd.css";
import './assets/styles/main.scss'

setConfig(apis);

ReactDOM.render(
  <AlitaProvider>
    <Page />
  </AlitaProvider>,
  document.getElementById('root')
);

serviceWorker.register();
