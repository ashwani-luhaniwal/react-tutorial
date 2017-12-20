// import App component and render it to our root App element
import React from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// import App from './App.jsx';
// import App2 from './App2.jsx';
// import Table from './Table.jsx';
// import State from './State.jsx';
// import Props from './Props.jsx';
// import StateProps from './StateProps.jsx';
// import PropsValidation from './PropsValidation.jsx';
// import ComponentAPI from './ComponentAPI.jsx';
// import ComponentLifeCycle from './ComponentLifeCycle.jsx';
// import Forms from './Forms/Forms.jsx';
// import ComplexForm from './Forms/ComplexForm.jsx';
// import Event from './Events/Event.jsx';
// import ChildEvents from './Events/ChildEvents.jsx';
// import Refs from './Refs/Refs.jsx';
// import Keys from './Keys/keys.jsx';
import RouterApp from './Router/RouterApp.js';
// import { setTimeout } from 'timers';

// ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render(<App2 />, document.getElementById('app2'));
// ReactDOM.render(<Table />, document.getElementById('dynamic-table'));
// ReactDOM.render(<State />, document.getElementById('state'));
// ReactDOM.render(<Props headerProp = "Header from props..." contentProp = "Content from props..." />, document.getElementById('props'));
// ReactDOM.render(<StateProps />, document.getElementById('stateprops'));
// ReactDOM.render(<PropsValidation />, document.getElementById('props-validation'));
// ReactDOM.render(<ComponentAPI />, document.getElementById('component-api'));
// ReactDOM.render(<ComponentLifeCycle />, document.getElementById('component-lifecycle'));
// ReactDOM.render(<Forms />, document.getElementById('forms'));
// ReactDOM.render(<ComplexForm />, document.getElementById('complex-form'));
// ReactDOM.render(<Event />, document.getElementById('event'));
// ReactDOM.render(<ChildEvents />, document.getElementById('child-event'));
// ReactDOM.render(<Refs />, document.getElementById('refs'));
// ReactDOM.render(<Keys />, document.getElementById('keys'));
ReactDOM.render(<RouterApp />, document.getElementById('router'));

/* setTimeout(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('component-lifecycle'));
}, 2000); */