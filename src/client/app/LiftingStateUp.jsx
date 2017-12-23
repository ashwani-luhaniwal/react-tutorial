/**
 * -----------------
 * Lifting State Up
 * -----------------
 * 
 * -------------
 * JSX in Depth
 * -------------
 * Fundamentally, JSX just provides syntactic sugar for React.createElement(component, props, ..children)
 * function.
 */
// JSX code:
<MyButton color="blue" shadowSize={2}>
    Click Me 
</MyButton>
// compiles into:
React.createElement(
    MyButton,
    {color: 'blue', shadowSize: 2},
    'Click Me'
)

// Self-closing form of tag if there are no children:
<div className="sidebar" />
// compiles into:
React.createElement(
    'div',
    {className: 'sidebar'},
    null
)

/**
 * ----------------------------------
 * Specifying the React Element Type
 * ----------------------------------
 * The first part of JSX tag determines the type of React element.
 * Capitalized types indicate that the JSX tag is referring to a React component. These tags get
 * compiled into a direct reference to the named variable, so if you use JSX <Foo /> expression,
 * Foo must be in scope.
 */

/**
 * -----------------------
 * React Must be in Scope
 * -----------------------
 * Since JSX compiles into calls to React.createElement, the React library must also always be in
 * scope from your JSX code.
 */
// both of the imports are necessary in this code, even though React and CustomButton are not directly
// referenced from JavaScript:
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
    // return React.createElement(CustomButton, {color: 'red'}, null);
    return <CustomButton color="red" />;
}
// If you don't use JavaScript bundler and loaded React from <script> tag, it is already in 
// scope as the "React" global.

/**
 * --------------------------------
 * Using Dot Notation for JSX Type
 * -------------------------------
 * You can also refer to React component using dot-notation from within JSX. This is
 * convenient if you have a single module that exports many React components.
 */
// If MyComponents.DatePicker is a component, you cal use it directly from JSX with:
import React from 'react';

const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div>Imagine a {props.color} datepicker here.</div>;
    }
}

function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
}

/**
 * --------------------------------------------
 * User-Defined Components must be Capitalized
 * --------------------------------------------
 * When an element type starts with lowercase letter, it refers to built-in component like
 * <div> or <span> and results in a string 'div' or 'span' passed to React.createElement.
 * Types that starts with capital letter like <Foo /> compile to React.createElement(Foo) and
 * correspond to a component defined or imported in your JavaScript file.
 * 
 * We recommend naming components with a capital letter. If you do have a component
 * that starts with a lowercase letter, assign it to a capitalized variable before using it in JSX.
 */
import React from 'react';

// Wrong: If "hello" then it is wrong as this is a component and should have been capitalized:
// Correct : This is component and should be capitalized:
function Hello(props) {
    // Correct: this use of <div> is legitimate because div is a valid HTML tag:
    return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
    // Wrong: React thinks <hello /> is HTML tag because it's not capitalized:
    // Correct: React knows <Hello /> is a component because it's capitalized:
    return <Hello toWhat="World" />;
}

/**
 * -----------------------------
 * Choosing the Type at Runtime
 * -----------------------------
 * You cannot use a general expression as React element type. IF you do want to use a 
 * general expression to indicate type of element, just assign it to a capitalized 
 * variable first. This often comes up when you want to render a different component
 * based on a prop:
 */
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
    photo: PhotoStory,
    video: VideoStory
};

function Story(props) {
    /*
        Wrong: JSX type can't be an expression:
        return <components[prop.storyType] story={props.story} />;
    */
    // To fix this, we will assign type to capitalized variable first:
    // Correct: JSX type can be capitalized variable.
    const SpecificStory = components[props.storyType];
    return <SpecificStory story={props.story} />
}

/**
 * -------------
 * Props in JSX
 * -------------
 * There are several different ways to specify props in JSX
 */

/**
 * --------------------------------
 * JavaScript Expressions as Props
 * --------------------------------
 * You can pass any JavaScript expression as a prop, by surrounding it with {}
 */
<MyComponent foo={1 + 2 + 3 + 4} />
// the value of props.foo will be 10 because expression 1 + 2 + 3 + 4 gets evaluated

// "if" statements and "for" loops are not expressions in JavaScript, so they can't be used
// in JSX directly, you can put these in surrounding code.
function NumberDescriber(props) {
    let description;
    if (props.number % 2 == 0) {
        description = <strong>even</strong>;
    } else {
        description = <i>odd</i>;
    }
    return <div>{props.number} is an {description} number</div>;
}

/**
 * ----------------
 * String Literals
 * ----------------
 */
// You can pass string literal as a prop. These two JSX expressions are equivalent:
<MyComponent message="hello world" />
<MyComponent message={'hello world'} />

// When you pass string literal, its value is HTML-unescaped. So these two JSX 
// expressions are equivalent:
<MyComponent message="&lt;3" />
<MyComponent message={'<3'} />

/**
 * -----------------------
 * Props Default to "True"
 * -----------------------
 */
// If you pass no value for a prop, it default to "true". These two JSX expressions 
// are equivalent:
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
// We don't recommend using this because it can be confused with ES6 object shorthand {foo}
// which is short for {foo: foo} rather than {foo: true}. 

/**
 * ------------------
 * Spread Attributes
 * ------------------
 * Spread attributes can be useful but they also make it easy to pass unnecessary props to components
 * that don't care about them or to pass invalid HTML attributes to DOM. We recommend using this 
 * syntax sparingly.
 * 
 * If you already have "props" as an object, and you want to pass it in JSX, you can use "..."
 * as a "spread" operator to pass the whole props object.
 */
// These two components are equivalent:
function App1() {
    return <Greeting firstName="Ashwani" lastName="Luhaniwal" />;
}

function App2() {
    const props = {firstName: 'Ashwani', lastName: 'Luhaniwal'};
    return <Greeting {...props} />;
}

// You can also pick specific props that your component will consume while passing all other
// props using the spread operator.
const Button = props => {
    const {kind, ...other} = props;
    const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
    return <button className={className} {...other} />;
}

const App = () => {
    return (
        <div>
            <button kind="primary" onClick={() => console.log("clicked!")}>
                Hello World!
            </button>
        </div>
    );
};
// Above, the "kind" prop is safely consumed and is not passed on to the <button> element
// in the DOM. All other props are passed via the "...other" object making this component
// really flexible. You can see that it passes an "onClick" and "children" props.

/**
 * ----------------
 * Children in JSX
 * ----------------
 * In JSX expression that contain both an opening tag and closing tag, the content between
 * those tags is passed as a special prop: "props.children". These are several different ways 
 * to pass children:
 */

/**
 * ----------------
 * String Literals
 * ----------------
 */
// You can put string between opening and closing tags and "props.children" will just be 
// that string. This is useful for many of built-in HTML elements:
<MyComponent>Hello World!</MyComponent>
// This is valid JSX and "props.children" in "MyComponent" will simply be the string
// "Hello World!".

// HTML is unescaped, so you can write JSX as follows:
<div>This is valid HTML &amp; JSX at the same time.</div>

// JSX removes whitespaces at the beginning and ending of line. It also removes blank lines.
// New lines adjacent to tags are removed; new lines that occur in the middle of string 
// literals are condensed into a single space. So these all render to same thing:
<div>Hello World</div>

<div>
    Hello World
</div>

<div>
    Hello
    World
</div>

<div>

    Hello World
</div>

/**
 * -------------
 * JSX Children
 * -------------
 */
// You can provide more JSX elements as children.
<MyContainer>
    <MyFirstComponent />
    <MySecondComponent />
</MyContainer>

// You can mix together different types of children, so you can use string literals
// together with JSX children. Here, JSX is like HTML:
<div>
    Here is a list:
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
</div>

// React component can also return an array of elements:
render() {
    // No need to wrap list items in an extra element
    return [
        // Don't forget the keys
        <li key="A">First item</li>,
        <li key="B">Second item</li>,
        <li key="C">Third item</li>
    ];
}

/**
 * -----------------------------------
 * JavaScript Expressions as Children
 * -----------------------------------
 */
// You can pass any JavaScript expression as children, by enclosing it within {}
<MyComponent>foo</MyComponent>
<MyComponent>{'foo'}</MyComponent>

// This is often useful rendering a list of JSX expressions of arbitrary length.
function Item(props) {
    return <li>{props.message}</li>;
}

function TodoList() {
    const todos = ['finish doc', 'submit pr', 'nag dan to review'];
    return (
        <ul>
            {todos.map((message) => <Item key={message} message={message} />)}
        </ul>
    );
}

// JavaScript expressions can be mixed with other types of children. This is often useful
// in lieu of string templates:
function Hello(props) {
    return <div>Hello {props.addressee}!</div>;
}

/**
 * ----------------------
 * Functions as Children
 * ----------------------
 */
// JavaScript expressions inserted in JSX will evaluate to string, a React element or a list
// of those things. However, "props.children" works just like any other prop in that it can 
// pass any sort of data, not just the sorts that React knows how to render. 

// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
    }
    return <div>{items}</div>;
}

function ListOfTenThings() {
    return (
        <Repeat numTimes={10}>
            {(index) => <div key={index}>This is item {index} in the list</div>}
        </Repeat>
    );
}
// Children passed to a custom component can be anything, as long as that component transforms
// them into something React can understand before rendering. This usage is not common,
// but it works if you want to stretch what JSX is capable of.

/**
 * ----------------------------------------
 * Boolean, Null and Undefined are ignored
 * ----------------------------------------
 * false, null, undefined and true are valid children. They simply don't render.
 */
<div />
<div></div>
<div>{false}</div>
<div>{null}</div>
<div>{undefined}</div>
<div>{true}</div>

// This can be useful to conditionally render React elements. This JSX only renders a 
// <Header /> if showHeader is true:
<div>
    {showHeader && <Header />}
    <Content />
</div>

// One caveat is that some "falsy" values, such as 0 number, are still rendered by React.
// The following code will not behave as you might expect because 0 will be printed when
// "props.messages" is an empty array:
<div>
    {props.messages.length && <MessageList messages={props.messages} />}
</div>

// To fix this, make sure that the expression before && is always boolean:
<div>
    {props.messages.length > 0 && <MessageList messages={props.messages} />}
</div>

// Conversely, if you want a value like false, true, null or undefined to appear in the 
// output, you have to convert it to string first:
<div>
    My JavaScript variable is {String(myVariable)}.
</div>