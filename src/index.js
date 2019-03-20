import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function Hi() {
  return <p>Hi</p>;
}

render(
  <Router>
    <Hi />
  </Router>,
  document.getElementById('app')
);
