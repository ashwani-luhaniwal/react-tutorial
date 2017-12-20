import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import JSXConcepts from './JSXConcepts.jsx';

/**
 * -----------------------------
 * Embedding Expressions in JSX
 * -----------------------------
 * You can embed any JavaScript expression in JSX by wrapping it in curly braces.
 */
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}
const user = {
    firstName: 'Ashwani',
    lastName: 'Luhaniwal'
};
// JSX tags may contain children:
const element = (
    <div>
        <h1>
            Hello, {formatName(user)}!
        </h1>
    </div>
);

/**
 * -------------------------
 * JSX is an Expression too
 * -------------------------
 * After compilation, JSX expression become regular JavaScript function calls and evaluates
 * to JavaScript objects.
 * This means you can use JSX inside if statements and for loops, assign it to variables,
 * accept it as arguments, and return it from functions.
 */
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>
}

/**
 * ------------------------------
 * Specifying Attributes with JSX
 * ------------------------------
 * Since JSX is closed to JavaScript than HTML, React DOM uses camelCase property naming
 * convention instead of HTML attribute names. Like "class" becomes "className" and 
 * "tabindex" becomes "tabIndex".
 */
// You may use quotes to specify string literals as attributes:
const el = <div tabIndex="0"></div>;
// You may use curly braces to embed JavaScript expression in an attribute:
// If a tag is empty, you may close it immediately with />, like XML
const ele = <img src={user.avatarUrl} />;
// Don't put quotes around curly braces when embedding JavaScript expression in an attribute.
// You should either use quotes (for string values) or curly braces (for expressions), but not
// both in same attribute.

/**
 * -------------------------------
 * JSX prevents Injection Attacks
 * -------------------------------
 * It is safe to embed user input in JSX
 * By default, React DOM escapes any values embedded in JSX before rendering them. Thus it
 * ensures that you can never inject anything that's not explicitly written in your 
 * application. Everything is converted to a string before being rendered. This helps 
 * prevent XSS (cross-site-scripting) attacks.
 */
/*
    const title = response.potentiallyMaliciousInput;
    // This is safe:
    const elem = <h1>{title}</h1>;
*/

/**
 * JSX represents Objects
 * Babel compiles JSX down to React.createElement() calls.
 */
// Following two examples are identical: 
const elt = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);
const emt = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
);
// React.createElement() performs a few clicks to help your write bug-free code but 
// essentially it creates an object as follows: -
const et = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello world!'
    }
};
// These objects are called "React elements". You can think of them as description of what you
// want to see on screen. React reads these objects and uses them to construct the DOM and 
// keep it up to date.

// Main App component
class App extends React.Component {
    render() {
        return (
            <div>
                <p>Hello React</p>
                <JSXConcepts />
            </div>
        );
    }
}

// render(element, document.getElementById('hello'));
render(<App/>, document.getElementById('app'));