// import App component and render it to our root App element
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import App2 from './App2.jsx';
import Table from './Table.jsx';
import State from './State.jsx';

ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<App2 />, document.getElementById('app2'));
ReactDOM.render(<Table />, document.getElementById('dynamic-table'));
ReactDOM.render(<State />, document.getElementById('app'));