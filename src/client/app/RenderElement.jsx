
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * -------------------
 * Rendering Elements
 * -------------------
 * Elements are the smallest building blocks of React apps.
 * An element describes what you want to see on screen:
 */
const element = <h1>Hello, world</h1>
// Unlike browser DOM elements, React elements are plain objects, and are cheap to create.
// React DOM takes care of updating the DOM to match the React elements.

/**
 * ----------------------------------
 * Rendering an Element into the DOM
 * ----------------------------------
 * We call the following a "root" DOM node because everything inside it will be managed by React DOM.
 * Applications built with just React usually have single root DOM node. If you are integrating 
 * React into an existing app, you may have as many isolated root DOM nodes as you like.
 */
// <div id="root"></div>

// To render a React element into a root DOM node, pass both to ReactDOM.render():
/*
    const el = <h1>Hello, world!</h1>;
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
*/

/**
 * ------------------------------
 * Updating the Rendered Element
 * ------------------------------
 * React elements are immutable. Once you create an element, you can't change its children or 
 * attributes. An element is like a single frame in a movie; it represets the UI at certain point in time.
 * The only way to update the UI is to create a new element and pass it to ReactDOM.render()
 */

function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString();}.</h2>
        </div>
    );
    // In practice, most React apps only call ReactDOM.render() once.
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}
setInterval(tick, 1000);

/**
 * -----------------------------------
 * React only updated what's necessary
 * -----------------------------------
 * React DOM compares the element and its children to the previous one, and only applies the
 * DOM updates necessary to bring the DOM to the desired state.
 * 
 * In the above example, we create an element describing the whole UI tree on every tick, only the text
 * node whose contents has changed gets updated by React DOM.
 */
