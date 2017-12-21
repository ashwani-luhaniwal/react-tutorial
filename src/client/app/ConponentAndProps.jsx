/**
 * ---------------------
 * Components and Props
 * ---------------------
 * Components let you split the UI independent, resuable pieces, and think about each
 * piece in isolation.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props")
 * and return React elements decribing what should appear on screen. 
 */

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * ------------------------------
 * Functional and Class Components
 * --------------------------------
 * The simplest way to define a component is to write a JavaScript function
 */
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
// This function is valid React component because it accepts a single "props" (which stands
// for properties) object argument with data and returns a React element. We call such 
// components "functional" because they are literally JavaScript functions.

// You can also use ES6 class to define a component:
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
// The above two components are equivalent from React's point of view.

/**
 * ---------------------
 * Rendering a Component
 * ---------------------
 * Always start the component names with Capital letter
 * <div /> represents DOM tag, but <Welcome /> represents component and requires Welcome in scope.
 */
//Previously, we only encountered React elements that represent DOM tags:
const el = <div />;

// However, elements can also represets user-defined componenets:
const ele = <Welcome name="Ashwani" />;
// When React sees an element representing a user-defined component, it passes JSX attributes
// to this component as a single object. We call this object "props".

ReactDOM.render(ele, document.getElementById('root'));
// React calls the "Welcome" component with {name: 'Ashwani'} as the props.
// Our "Welcome" component returns a <h1>Hello, Ashwani</h1> element as the result.
// React DOM efficiently updates the DOM to match <h1>Hello, Ashwani</h1>

/**
 * Composing Components
 * Components can refer to other components in their output. This lets us use the same
 * component abstraction for any level of detail. A button, a form, a dialog, a screen: in React
 * app, all those are commonly expressed as components.
 */
// Here we are rendering Welcome component many times
function App() {
  return (
    <div>
      <Welcome name="Ashwani" />
      <Welcome name="Megha" />
      <Welcome name="Neeraj" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
// Typically, new React apps have single "App" component at the very top. However, if you 
// integrate React into an existing app, you might start bottom-up with a small component
// like "Button" and gradually work your way to the top of view hierarchy.

/**
 * ---------------------
 * Extracting Components
 * ----------------------
 */
// Don't be afraid to split components into smaller components.

// This component can be tricky to change because of all nesting, and it is also hard to
// raise inidividual parts of it. 

function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}
// The Avatar doesn't need to know that it is being rendered inside a Comment. This is why we have
// given its prop a more generic name: "user" rather than "author"

// We recommend naming props from the component's own point of view rather than the context in which
// it is being used.

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
// It will simplify Comment component as follows: 

// Comment component
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
/**
 * Extracting components might seem like grunt work at first, but having a palette of reusable
 * components pays off in large apps. A good rule of thumb is that if a part of your UI is 
 * used several times (Button, Panel, Avatar), or is complex enough on its own (App, FeedStory,
 * Comment), it is good candidate to be reusable component.
 */

/**
 * -------------------
 * Props are Read-Only
 * -------------------
 */
// Whether you declare a component as a function or a class, it must never modify its own props.
function sum(a, b) {
  return a + b;
}
// Such functions are called "pure" because they do not attempt to change their inputs, and always 
// return the same result for the same inputs.

// In contrast, this function is impure because it changes its own input:
function withdraw(account, amount) {
  account.total -= amount;
}

// React is pretty flexible but it has a single strict rule:

// All React components must act like pure functions with respect to their props.
// State allows React components to change their output over time in response to user actions,
// network responses and anything else, without violating this rule.