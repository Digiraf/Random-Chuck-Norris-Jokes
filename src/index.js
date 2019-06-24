import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import ReduxPromise from 'redux-promise'
import registerServiceWorker from './serviceWorker';
import './App.css';
import App from './home';
const createStoreWithMiddleware= applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
