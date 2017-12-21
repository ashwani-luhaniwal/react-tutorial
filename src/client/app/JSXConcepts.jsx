/**
 * -------------
 * JSX Concepts
 * -------------
 * JSX is syntax extension to JavaScript.
 * It might reminds you template language, but comes with full power of JavaScript.
 */

/**
 * ---------
 * Why JSX ?
 * ---------
 * Instead of artificially separating technologies by putting markup and logic in separate files,
 * React separates concerns with loosely coupled units called "components" that contain both.
 * React doesn't require using JSX, but most people find it helpful as a visual aid when working
 * with UI inside JavaScript code.
 * It also allows React to show more useful error and warning messages.
 */
import React from 'react';

class JSXConcepts extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to React - JSX</h1>
            </div>
        );
    }
}
export default JSXConcepts;