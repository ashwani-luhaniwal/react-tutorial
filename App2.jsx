/**
 * In this we will discuss the concepts of ReactJS Components
 */

import React from 'react';

/**
 * Stateless example
 * App is owner of Header and Content
 * Creating Header and Content separately and adding them inside JSX tree in App component
 * Only App component needs to be exported
 */
class App2 extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        );
    }
}
class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Header</h1>
            </div>
        );
    }
}
class Content extends React.Component {
    render() {
        return (
            <div>
                <h2>Content</h2>
                <p>The content text!!!</p>
            </div>
        );
    }
}
export default App2;