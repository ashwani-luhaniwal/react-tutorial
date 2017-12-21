/**
 * -------------------
 * State and Lifecylce
 * -------------------
 */

 import React from 'react';
 import ReactDOM from 'react-dom';

// Here, we will see how to make Clock component truely reusable and encapsulated.
// It will setup its own timer and update itself every second.
/*
    function Clock(props) {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {props.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }

    function tick() {
        ReactDOM.render(
            <Clock date={new Date()} />,
            document.getElementById('root')
        );
    }

    setInterval(tick, 1000);
*/

// Ideally we want to write this once and have the Clock update itself:
/*
    ReactDOM.render(
        <Clock />,
        document.getElementById('root')
    );
*/
// To implement this, we need to add "state" to the Clock component.

/**
 * State is similar to props, but it is private and fully controlled by the component.
 * We mentioned before that components defined as classes have some additional features.
 * Local state is exactly that: a feature available only to classes.
 */

/**
 * -------------------------------------
 * Converting a Function to a Component
 * -------------------------------------
 * You can convert a functional component like Clock to a class in five steps: 
 * - Create an ES6 class, with the same name, that extends React.Component.
 * - Add a single empty method to it called render().
 * - Move the body of the function into the render() method.
 * - Replace props with this.props in the render() body.
 * - Delete the remaining empty functon declaration
 */
/*
    class Clock extends React.Component {
        render() {
            return (
                <div>
                    <h1>Hello, world!</h1>
                    <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
                </div>
            );
        }
    }
*/
// This lets us use additional features such as local state and lifecycle hooks.

/**
 * ---------------------------
 * Adding Local State to Class
 * ---------------------------
 */
// We will move the date from props to state in 2 steps: 
// 1. Replace this.props.date with this.state.date in the render() method.
// 2. Add a class constructor that assigns the initial "this.state".
// 3. Remove the date prop from the <Clock /> element.
class Clock extends React.Component {
    constructor(props) {
        // here we pass props to the base constructor
        // Class components should always call the base constructor with props.
        super(props);
        this.state = {
            date: new Date()
        };
    }
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);

/**
 * ------------------------------------
 * Adding Lifecylce Methods to a Class
 * ------------------------------------
 * In applications with many components, it's very important to free up resources taken by the 
 * components when they are destroyed.
 */
// We want to setup a timer whenever the Clock is rendered to the DOM for the first time.
// This is called "mounting" in React.
// We also want to clear that timer whenever the DOM produced by the Clock is removed. 
// This is called "unmounting" in React.

// We can declare special methods on the component class to run some code when a component
// mounts and unmounts.
// These types of methods are called "lifecylce hooks"
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    // The componentDidMount() hook runs after the component output has been rendered to
    // the DOM. This is good place to setup a timer:
    componentDidMount() {
        // While this.props is set up by React itself and this.state has a special meaning,
        // you are free to add additional fields to the class manually if you need to store 
        // something that is not used for visual output.
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    // We will tear down the timer in the componentWillUnmount() lifecylce hook:
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    // tick() method which Clock component will run every second
    tick() {
        // uses this.setState() to schedule updates to the component local state:
        this.setState({
            date: new Date()
        });
    }

    // If you don't use something in render(), it shouldn't be in the state.
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);

/**
 * Execution order
 * ----------------
 * 1. When <Clock /> is passed to ReactDOM.render(), React calls the constructor of the 
 * Clock component. Since Clock needs to display the current time, it initializes 
 * this.state with an object including the current time. We will later update this state.
 * 2. React then calls the Clock component's render() method. This is how React learns what
 * should be displayed on the screen. React then updats the DOM to match the Clock's render output.
 * 3. When the Clock output is inserted in DOM, React calls the componentDidMount() lifecylce
 * hook. Inside it, the Clock component asks the browser to setup a timer to call the 
 * component's tick() emthod once a second.
 * 4. Every second the browser calls the tick() method. Inside it, the Clock component schedules
 * a UI update by calling setState() with an object containing the current time. Thanks to the
 * setState() call, React knows the state has changed, and calls render() method again to learn
 * what should be on screen. This time, this.state.date in the render() method will be different,
 * and so the render output will include the updated time. React updates the DOM accordingly.
 * 5. If the Clock component is ever removed from the DOM, React calls the componentWillUnmount()
 * lifecylce hook so the timer is stopped.
 */

 /**
  * ---------------------
  * Using State Correctly
  * ----------------------
  * There are 3 things you should know about setState()
  */

/**
 * ----------------------------
 * Do not modify State directly
 * ----------------------------
 */
// this will not re-render a component:
this.state.comment = 'Hello';   // Wrong

// Instead, use setState():
this.setState({comment: 'Hello'});  // Correct
// The only place where you can assign this.state is the constructor.

/**
 * ----------------------------------
 * State Updates may be Asynchronous
 * ----------------------------------
 */
// React may batch multiple setState() calls into a single update for performance.
// Because this.props and this.state may be updated asynchronously, you should not rely
// on their values for calculating the next state.
this.setState({ // Wrong
    counter: this.state.counter + this.props.increment,
});

// To fix it, use a second form of setState() that accepts a function rather than a object.
// That function will receive the previous state as the first argument, and the props at the time
// the update is applied as the second argument:
this.setState((prevState, props) => ({  // Correct
    counter: prevState.counter + props.increment
}));
// We used an arrow function above, but it also works with regular functions:
this.setState(function(prevState, props) {
    return {
        counter: prevState.counter + props.increment
    };
});

/**
 * -------------------------
 * State Updates are Merged
 * -------------------------
 * When you call setState(), React merges the object you provide into the current state.
 */

// your state may contain several independent variables:
constructor(props) {
    super(props);
    this.state = {
        posts: [],
        comments: []
    };
}
// Then you can update them independently with separate setState() calls:
componentDidMount() {
    fetchPosts().then(response => {
        this.setState({
            posts: response.posts
        });
    });

    fetchComments().then(response => {
        this.setState({
            comments: response.comments
        });
    });
}
// the merging is shallow, so this.setState({comments}) leaves this.state.posts intact,
// but completely replaces this.state.comments

/**
 * --------------------
 * The Data Flows Down
 * --------------------
 * Neither parent not child components can know if a certain component is stateful or stateless,
 * and they shouldn't care whether it is defined as function or a class.
 * This is why state is often called local or encapsulated. It is not accessible to any component
 * other than the one that owns and sets it.
 */

// A component may choose to pass its state down as props to its child components:
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
// This also works for user-defined components:
<FormattedDate date={this.state.date} />
// The FormattedDate component would receive the date in its props and wouldn't know
// whether it came from the Clock's state, from the Clock's props or was typed by hand:
function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

/**
 * This is commonly called a "top-down" or "unidirectional" data flow. Any state us always 
 * owned by some specific component, and any data or UI derived from that state can only affect
 * components "below" then in the tree.
 * If you imagine a component tree as a waterfall of props, each component's state is like an 
 * additional water source that joins it at an arbitrary point but also flows down.
 */

// To show all components ate truely isolated, we can create an App component that renders 3 <Clock>s:
function App() {
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
// Each Clock sets up its own timer and updates independently

/**
 * In React apps, whether a component is stateful or stateless is considered an implementation
 * detail of the component that may change over time. You can use stateless components 
 * inside stateful components, and vice versa.
 */