import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components/App/index';
import registerServiceWorker from './registerServiceWorker';
import 'antd/dist/antd.css';

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
