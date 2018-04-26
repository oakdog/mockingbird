import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import AreaProvider from './AreaProvider';
import './index.css';

import Mockingbird from './Mockingbird';
import CategoryStore from './cat/CategoryStore';
import TwitterSearch from './tw/TwitterSearch';
import TwitterUser from './tw/TwitterUser';

let store = createStore(
  combineReducers({
    cats : CategoryStore.reducer,
    srch : TwitterSearch.reducer,
    user : TwitterUser.reducer
  })
);
ReactDOM.render(
  <Provider store={store}>
    <Mockingbird />
  </Provider>,
  document.getElementById('root')
);
