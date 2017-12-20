/**
 * React - Keys
 * React keys are useful when working with dynamically created components or when your lists are
 * altered by the users. Setting the key value will keep your components uniquely identified after the change
 */

 import React from 'react';

 class Keys extends React.Component {
    constructor() {
        super();

        this.state = {
            /**
             * If we add or remove some elements in future or change the order of dynamically created
             * elements, React will use the key values to keep track of each element.
             */
            data: [
                {
                    component: 'First...',
                    id: 1
                },
                {
                    component: 'Second...',
                    id: 3
                },
                {
                    component: 'Third...',
                    id: 2
                }
            ]
        }
    }
    render() {
        return (
            /**
             * Create dynamically Content elements with unique index (i)
             * map function will create three elements from our data array.
             * Since the key value needs to be unique for every element, we will assign i as key for each created element
             */
            <div>
                <div>
                    {this.state.data.map((dynamicComponent, i) => <Content key={i} componentData={dynamicComponent} />)}
                </div>
            </div>
        );
    }
 }

 class Content extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.componentData.component}</div>
                <div>{this.props.componentData.id}</div>
            </div>
        );
    }
 }

 export default Keys;