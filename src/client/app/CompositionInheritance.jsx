/**
 * Composition vs Inheritance
 * ---------------------------
 * React has powerful composition model, and we recommend using composition instead
 * of inheritance to reuse code between components.
 */

/**
 * Containment
 * ------------
 * Some components don't know their children ahead of time. This is especially common for
 * components like "Sidebar" or "Dialog" that represent generic "boxes".
 * We recommend that such components use the special children prop to pass children
 * elements directly into their output:
 */
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

// This lets other components pass arbitrary children to them by nesting the JSX:
function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome 
            </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
        </FancyBorder>
    );
}
// Anything inside <FancyBorder> JSX tag gets passed into the FancyBorder component as a 
// children prop. Since FancyBorder renders {props.children} inside a <div>, the passed
// elements appear in the final output.

// While this is less common, sometimes you might need multiple "holes" in component. In such
// cases you may come up with you own convention instead of using "children":
function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function App() {
    return (
        <SplitPane left={<Contacts />} right={<Chat />} />
    );
}
// React elements like <Contacts /> and <Chat /> are just objects, so you can pass them as props
// like any other data. This approach may remind you of "slots" in other libraries but there
// are no limitations on what you can pass as props in React.

/**
 * Specialization
 * ---------------
 * In Reactm this is also achieved by composition, where a more "specific" component renders a
 * more "generic" one and configures it with props:
 */
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
        </FancyBorder>
    );
}

function WelcomeDialog() {
    return (
        <Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />
    );
}

// Composition works equally well for components defined as classes:
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
    }

    render() {
        return (
            <Dialog title="Mars Exploration Program" message="How should we refer to you?">
                <input value={this.state.login} onChange={this.handleChange} />
                <button onClick={this.handleSignUp}>
                    Sign Me Up!
                </button>
            </Dialog>
        );
    }

    handleChange(e) {
        this.setState({login: e.target.value});
    }

    handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
    }
}

/**
 * So What About Inheritance ?
 * ----------------------------
 * At Facebook, they have use React in thousands of components, and they haven't found any
 * use cases where they would recommend creating component inheritance hierarchies.
 * 
 * Props and composition give you all the flexibility you need to customize a component's
 * look and behavior in an explicit and safe way. Remember that components may accept 
 * arbitrary props, including primitive values, React elements or function.
 * 
 * If you want to reuse non-UI functionality between components, we suggest extracting it into
 * a separate JavaScript module. The components may import it and use that function, object
 * or class without extending it.
 */