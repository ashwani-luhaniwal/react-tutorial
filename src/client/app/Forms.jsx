/**
 * --------------
 * React - Forms
 * --------------
 * HTML form elements work a little bit differently from other DOM elements in React, because
 * form elements naturally keep some internal state.
 */
// HTML form
<form>
    <label>
        Name:
        <input type="text" name="name" />
    </label>
    <input type="submit" value="Submit" />
</form>
// This form has the default HTML form behavior of browsing to a new page when the user submits
// the form. If you want this behavior in React, it just works. But in most cases, it's convenient
// to have JavaScript function that handles the submission of the form and has access to the data
// that the user entered into the form. The standard way to achieve this is with a technique called
// "controlled components".

/**
 * ----------------------
 * Controlled Components
 * ----------------------
 * In HTML, form elements such as <input>, <textarea> and <select> typically maintain their own state
 * and update it based on user input. In React, mutable state is typically kept in the state property
 * of components, and only updated with setState().
 * 
 * We can combine the two by making the React state be the "single source of truth". Then the React
 * component that renders a form also controls what happens in that form on subsequent user input.
 * An input form element whose value is controlled by React in this way is called a "controlled component".
 */
// Controlled Component Example
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
// Since the "value" attribute is set on our form element, the displayed value will be always be 
// "this.state.value", making the React state the source of truth. Since "handleChange" runs on every
// keystroke to update the React state, the displayed value will update as the user types.

// With controlled component, every state mutation will have an associated handler function. This makes
// it straightforward to modify or validate user input. 
// Like here, we are enforcing names to be written in uppercase letters:
handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
}

/**
 * -----------------
 * The textarea Tag
 * -----------------
 */
// In HTML, a <textarea> element defines its text by its children:
<textarea>
    Hello there, this is some text in a textarea.
</textarea>

// In React, a <textarea> uses a "value" attribute instead. This way, a form using a
// <textarea> can be written very similarly to a form which uses a single-line input:
class EassyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write an eassy about your favorite DOM element'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('An eassy was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Eassy:
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
// Above, "this.state.value" is initialized in the constructor, so that textarea starts off
// with some text in it.

/**
 * ---------------
 * The select Tag
 * ---------------
 */
// In HTML, <select> creates a drop-down list.
<select>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option selected value="cocunut">Cocunut</option>
    <option value="mango">Mango</option>
</select>

// "Cocunut" option is initially selected, because of the "selected" attribute. React, 
// instead of using this "selected" attribute, uses a "value" attribute on the root
// "select" tag. This is more convenient in a controlled component because you only need
// to update it in one place.
class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite fruit flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Cocunut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

// Overall, this makes it so that <input type="text">, <textarea> and <select> all work
// very similarly - they all accept a "value" attribute that you can use to implement a
// controlled component.
// You can pass an array into "value" attribute, allowing you to select multiple options in a 
// "select" tag:
<select multiple={true} value={['B', 'C']}></select>

/**
 * -------------------------
 * Handling Multiple Inputs
 * -------------------------
 * When you need to handle multiple controlled "input" elements, you can add a "name" attribute
 * to each element and let the handler function choose what to do based on value of
 * "event.target.name".
 */
class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            // We have used ES6 computed property syntax to update the state key corresponding to
            // given input name:
            [name]: value
            // The above is equivalent to ES5 code:
            /*
                var partialState = {};
                partialState[name] = value;
                this.setState(partialState);
            */
            // since setState() automatically merges a partial state into current state, we only
            // needed to call it with the changed parts.
        });
    }

    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input name="numberOfGuests" type="number" value={this.state.numberOfGuests} onChange={this.handleInputChange} />
                </label>
            </form>
        );
    }
}

/**
 * ----------------------------
 * Controlled Input Null Value
 * ----------------------------
 * Specifying the value prop on a controlled component prevents the user from changing the input
 * unless you desire so. If you've specified a "value" but the input is still editable, you may
 * have accidentally set "value" to "undefined" or "null"
 */
ReactDOM.render(<input value="hi" />, mountNode);   // input is locked

setTimeout(function() {
    ReactDOM.render(<input value={null} />, mountNode); // becomes editable after 1 second
}, 1000);

/**
 * --------------------------------------
 * Alternatives to Controlled Components
 * --------------------------------------
 * It can sometimes be tedious to use controlled components, because you need to write an event 
 * handler for every way your data can change and pipe all of the input state through a React 
 * component. This can become particularly annoying when you are converting a preexisting 
 * codebase to React, or integrating a React application with non-React library. In these situations
 * you might want to check out uncontrolled components, an alternative technique for implementing
 * input forms.
 */