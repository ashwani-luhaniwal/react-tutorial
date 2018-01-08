/**
 * ------------------
 * React without ES6
 * ------------------
 * Normally you would define a React component as a plain JavaScript class:
 */
class Greeting extends React.Component {
    render() {
        return (
            <h1>Hello, {this.props.name}</h1>
        );
    }
}

// If you don't use ES6 yet, you may use the create-react-class module instead:
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
    render: function() {
        return <h1>Hello, {this.props.name}</h1>;
    }
});
// The API of ES6 classes is similar to createReactClass() with a few exceptions.

/**
 * ------------------------
 * Declaring Default Props
 * ------------------------
 * With functions and ES6 classes "defaultProps" is defined on the component itself:
 */
class Greeting extends React.Component {
    // ...
}

Greeting.defaultProps = {
    name: 'Ashwani'
};

// With createReactClass(), you need to define getDefaultProps() as a function on the passed object:
var Greeting = createReactClass({
    getDefaultProps: function() {
        return {
            name: 'Ashwani'
        };
    },
    //...
});

/**
 * --------------------------
 * Setting the Initial State
 * --------------------------
 * In ES6 classes, you can define the initial state by assigning this.state in the constructor:
 */
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: props.initialCount};
    }
    //...
}

// With createReactClass(), you have to provide a separate getInitialState method that returns the
// initial state:
var Counter = createReactClass({
    getInitialState: function() {
        return {count: this.props.initialCount};
    },
    //....
});

/**
 * ------------
 * Autobinding
 * ------------
 * In React components declared as ES6 classes, methods follow the same semantics as regular ES6 classes.
 * This means that they don't automatically bind "this" to the instance. You'll have to explicitly use
 * .bind(this) in the constructor:
 */
class SayHello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: 'Hello!'};
        // This line is important!
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        alert(this.state.message);
    }
    render() {
        // Because `this.handleClick` is bound, we can use it as an event handler.
        return (
            <button onClick={this.handleClick}>
                Say Hello
            </button>
        );
    }
}

// With createReactClass(), this is not necessary because it binds all methods:
var SayHello = createReactClass({
    getInitialState: function() {
        return {message: 'Hello!'};
    },

    handleClick: function() {
        alert(this.state.message);
    },

    render: function() {
        return (
            <button onClick={this.handleClick}>
                Say Hello
            </button>
        );
    }
});

// This means writing ES6 classes comes with a little more boilerplat code for event handlers, but
// the upside is slightly better performance in large applications.

// If boilerplate code is too unattractive to you, you may enable the experimental class properties
// syntax proposal with Babel:
class SayHello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: 'Hello!'};
    }
    // WARNING: this syntax is experimental!
    // Using an arrow here binds the method:
    handleClick = () => {
        alert(this.state.message);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Say Hello 
            </button>
        );
    }
}
// Please note that the syntax above is experimental and the syntax may change, or the proposal
// might not make it into the language.
/**
 * If you'd rather play it safe, you have a few options:
 * - Bind methods in the constructor.
 * - Use arrow functions, like onClick={(e) => this.handleClick(e)}
 * - Keep using createReactClass
 */