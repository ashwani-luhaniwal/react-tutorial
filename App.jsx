// React uses JSX for templating instead of plain JavaScript. 
/* Pros for using JSX :-
    - faster enough because it performs optimization while compiling code to JavaScript
    - Also, type-safe and most of the errors can be caught during compilation
    - Easier and faster to write templates
*/
// JSX looks like regular HTML 

// first react component
import React from 'react';

class App extends React.Component {
    render() {
        var i = 1;
        var myStyle = {
            fontSize: 100,
            color: '#FF0000'
        }
        return (
            // If we want to return more elements, we need to wrap it with one container element
            // We can also use custom attributes with data- prefix along with HTML properties and attributes
            // JavaScript expressions { } can also used inside JSX
            // We cannot use if else statements inside JSX, instead use conditional (ternary) expression
            /**
             * Comments
             * To write comments put curly brackets {} when you want to write comment within children section of tag
             */
            /**
             * Naming Convention
             * HTML tags always use lowercase tag names, while React component starts with Uppercase
             * Since JSX is JavaScript, identifiers such as "class" and "for" are discouraged as XML 
             * attribute names. Instead, ReactDOM components expect DOM property names such as "className"
             * and "htmlFor".
             */
            <div>
                {/**
                  * Styling
                  * React recommends using inline styles. While using inline styles, use camelCase syntax
                  * React will automatically append px after the number value on specific elements.
                  */}
                <h1 style={myStyle}>Header</h1>
                <h2>Content</h2>
                <p data-myattribute="someValue">This is the content!!!</p>
                <p>{1 + 1}</p>
                <p>{i == 1 ? 'True' : 'False'}</p>
            </div>
        );
    }
}
export default App; // export the component when you want use it in other parts of app