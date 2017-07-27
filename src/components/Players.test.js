import React from 'react';
import ReactDOM from 'react-dom';
import Players from './Players';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Players />, div);
});
