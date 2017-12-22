/**
 * Conditional Rendering
 * In React, you can create distinct components that encapsulate behavior you need.
 * Then you can render only some of them, depending on the state of your application.
 * Conditional rendering in React works the same way conditions work in JavaScript. Use
 * JavaScript operators like "if" or the "conditional operator" to create elements representing 
 * the current state, and let React update the UI to match them.
 */
function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}
function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}
// We will create a Greeting component which displays either of these components depending on
// whether a user is logged in:
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

ReactDOM.render(
    // try changing to isLoggedIn={true}:
    <Greeting isLoggedIn={false} />,
    document.getElementById('root')
);
// This will renders a different greeting depending on the value of isLoggedIn prop.

/**
 * Element Variables
 * You can use variables to store elements. This can help you conditionally render a part
 * of the component while the rest of output doesn't change.
 */
// Two new components representing Logout and Login buttons:
function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login 
        </button>
    );
}
function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout 
        </button>
    );
}

// Now, we will create a "stateful component" called LoginControl.
// It will render either <LoginButton /> or <LogoutButton /> depending on its current
// state. It will also render a <Greeting /> from the previous example:
class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {
            isLoggedIn: false
        };
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById('root')
);
// While declaring a variable and using an if statement is a fine way to conditionally
// render a component, sometimes you might want to use a shorter syntax.

/**
 * Inline If with Logical && operator
 * You may embed any expressions n JSX by wrapping them in curly braces. This includes the
 * JavaScript logical && operator. It can be handy for conditionally including an element:
 */
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > &&
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
        </div>
    );
}
const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
);
// It works because in JavaScript, "true && expression" always evaluates to "expression",
// and "false && expression" always evaluates to "false".
// Therefore, if the condition is true, the element right after && will appear in the
// output. If it is false, React will ignore and skip it.

/**
 * Inline If-Else with Conditional Operator
 * Another method for conditionally rendering elements inline is to use the JavaScript
 * conditional operator "condition ? true : false"
 */
render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
        <div>
            The user is <b>{isLoggedIn ? 'currently': 'not'}</b> logged in.
        </div>
    );
}
// I can also used for larger expressions although it is less obvious what's going on:
render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
        <div>
            {isLoggedIn ? (
                <LogoutButton onClick={this.handleLogoutClick} />
            ) : (
                <LoginButton onClick={this.handleLoginClick} />
            )}
        </div>
    );
}
// Just like in JavaScript, it is upto you to choose an appropriate style based on
// what you and your team consider more readable.
// Remember that whenever conditions become too complex, it might be good time to 
// extract a component.

/**
 * Preventing Component from Rendering
 * In rare cases you might want a component to hide itself even though it was rendered by
 * another component. To do this return "null" instead of its render output.
 */

// Here, <WarningBanner /> is rendered depending on the value of the prop called "warn".
// If the value of the prop is "false", then the component doesn't render:
function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }

    return (
        <div className="warning">
            Warning!
        </div>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true};
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);
// Returning "null" from a component's "render" method does not affect the firing of the
// component's lifecyle methods. For instance, "componentWillUpdate" and "componentDidUpdate"
// will still be called.