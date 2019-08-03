import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const Index = () => {
  return <Grommet theme={theme}><div>Welcome to Reactfsdfds!</div></Grommet>;
};
ReactDOM.render(<Index />, document.getElementById('root'));
