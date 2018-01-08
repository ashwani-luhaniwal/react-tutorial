/**
 * -----------------
 * Refs and the DOM
 * -----------------
 * In the typical React dataflow, props are the only way that parent components interact with their
 * children. To modify a child, you re-render it with new props. However, there are a few cases where
 * you need to imperatively modify a child outside of the typical dataflow. The child to be modified 
 * could be an instance of a React component, or it could be a DOM element. For both of these cases,
 * React provides an escape hatch.
 */

/**
 * ------------------
 * When to use Refs ?
 * ------------------
 * There are few good use cases for refs:
 * - Managing focus, text selection or media playback.
 * - Triggering imperative animations.
 * - Integrating with third-party DOM libraries.
 * 
 * Avoid using refs for anything that can be done declaratively. For example, instead of exposing open()
 * and close() methods on a Dialog component, pass an isOpen prop to it.
 */

/**
 * -------------------
 * Don't Overuse Refs
 * -------------------
 * Your first inclination may be to use refs to "make things happen" in your app. If this is the case, take
 * a moment and think more critically about where state should be owned in the component hierarchy. It 
 * becomes clear that the proper place to "own" that state is at a higher level in the hierarchy.
 */

/**
 * ------------------------------
 * Adding a Ref to a DOM element
 * ------------------------------
 * React supports a special attribute that you can attach to any component. The "ref" attribute takes a 
 * callback function, and the callback will be executed immediately after the component is mounted or
 * unmounted. 
 * When the "ref" attribute is used on HTML element, the "ref" callback receives the underlying DOM
 * element as its argument. The following code uses the "ref" callback to store a reference to DOM node:
 */
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.focusTextInput = this.focusTextInput.bind(this);
    }
    focusTextInput() {
        // Explicitly focus the text input using the raw DOM API
        this.focusTextInput.focus();
    }
    render() {
        // Use the `ref` callback to store a reference to the text input DOM element in an instance
        // field (eg, this.textInput)
        return (
            <div>
                <input type="text" ref={(input) => { this.textInput = input; }} />
                <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
            </div>
        );
    }
}
/**
 * React will call the "ref" callback with the DOM element when the component mounts and call it with
 * null when it unmounts. "ref" callbacks are invoked before "componentDidMount" or "componentDidUpdate"
 * lifecycle hooks.
 * Using the "ref" callback just to set a property on the class is a common pattern for accessing DOM
 * elements. The preferred way is to set the property in the "ref" callback like above.
 */

/**
 * ----------------------------------
 * Adding a Ref to a Class Component
 * ----------------------------------
 * When the "ref" attribute is used on a custom component declared as a class, the "ref" callback receives 
 * the mounted instance of the component as its argument. Here, if we wanted to wrap the CustomTextInput
 * above to simulate it being clicked immediately after mounting:
 */
class AutoFocusTextInput extends React.Component {
    componentDidMount() {
        this.textInput.focusTextInput();
    }
    render() {
        return (
            <CustomTextInput ref={(input) => { this.textInput = input; }} />
        );
    }
}
// Note that this only works if CustomTextInput is declared as a class:

/**
 * ------------------------------
 * Refs and Functional Component
 * ------------------------------
 * You may not use the ref attribute on functional components because they don't have instances:
 */
function MyFunctionalComponent() {
    return <input />;
}

class Parent extends React.Component {
    render() {
        // This will not work
        return (
            <MyFunctionalComponent ref={(input) => { this.textInput = input; }} />
        );
    }
}
// You should convert the component to a class if you need a ref to it, just like you do when you 
// need lifecycle methods or state.

// You can use the ref attribute inside a functional component as long as you refer to a DOM
// element or a class component:
function CustomTextInput(props) {
    // textInput must be declared here so the ref callback can refer to it
    let textInput = null;

    function handleClick() {
        textInput.focus();
    }

    return (
        <div>
            <input type="text" ref={(input) => { textInput = input; }} />
            <input type="button" value="Focus the text input" onClick={handleClick} />
        </div>
    );
}

/**
 * ---------------------------------------
 * Exposing DOM Refs to Parent Components
 * ---------------------------------------
 * In rare cases, you might want to have access to a child's DOM node from a parent component. This is
 * generally not recommended because it breaks component encapsulation but it can occasionally be 
 * useful for triggering focus or measuring the size or position of child DOM node.
 * While you could add a ref to the child component, this is not an ideal solution, as you would only get
 * a component instance rather than a DOM node. Additionally, this wouldn't work with functional 
 * components.
 * Instead, in such cases we recommend exposing a special prop on the child. The child would take a function
 * prop with an arbitrary name (inputRef) and attach it to the DOM node as a ref attribute. This lets the 
 * parent pass its ref callback to the child's DOM node through the component in the middle.
 */
// This works both for classes and for functional components
function CustomTextInput(props) {
    return (
        <div>
            <input ref={props.inputRef} />
        </div>
    );
}

class Parent extends React.Component {
    render() {
        return (
            <CustomTextInput inputRef={el => this.inputElement = el} />
        );
    }
}
// Above, Parent passes its ref callback as an inputRef prop to the CustomTextInput and the
// CustomTextInput passes the same function as a special ref attribute to the <input>. As a result,
// this.inputElement in Parent will set to the DOM node corresponding to the <input> element in the
// CustomTextInput.

// Note that the name of the inputRef prop in the above example has no special meaning, as it is
// regular component prop. However, using the ref attribute on the <input> itself is important, as
// it tells React to attach a ref to its DOM node.
// This works even though CustomTextInput is a functiona component. Unlike special ref attribute
// which can only be specified for DOM elements and for class components, there are no restrictions
// on regular component props like inputRef.

// Another benefit of this pattern is that it works several components deep. For example, imagine 
// Parent didn't need that DOM node, but a component that rendered Parent (Grandparent) needed 
// access to it. Then we could let the Grandparent specify the inputRef prop to the Parent, and let
// Parent "forward" it to the CustomTextInput:
function CustomTextInput(props) {
    return (
        <div>
            <input ref={props.inputRef} />
        </div>
    );
}

function Parent(props) {
    return (
        <div>
            My input: <CustomTextInput inputRef={props.inputRef} />
        </div>
    );
}

class Grandparent extends React.Component {
    render() {
        return (
            <Parent inputRef={el => this.inputElement = el} />
        );
    }
}
// Here, ref callback is first specified by Grandparent. It is passed to Parent as a regular prop
// called inputRef, and Parent passes it to CustomTextInput as prop too. Finally, the CustomTextInput
// reads the inputRef prop and attaches the passed function as a ref attribute to <input>. As a result,
// this.inputElement in Grandparent will be set to the DOM node corresponding to <input> element in
// CustomTextInput.

// We advice against exposing DOM nodes whenever possible, but this can be useful escape hatch. Note
// that this approach requires you to add some code to the child component. If you have absolutely
// no control over the child component implementation, your last option is to use findDOMNode(), but 
// it is discouraged.

/**
 * --------
 * Caveats
 * --------
 * If the ref callback is defined as an inline function, it will get called twice during updates, first
 * with "null" and then again with the DOM element. This is because a new instance of the function is
 * created with each render, so React needs to clear the old ref and set up the new one. You can avoid
 * this by defining the ref callback as a bound method on the class, but note that it shouldn't
 * matter in most cases.
 */