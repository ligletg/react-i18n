import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from 'react-intl';
import App from './app';

ReactDOM.render(
    <IntlProvider locale='en'>
      <App/>
    </IntlProvider>,
    document.getElementById('app')
);
