/**
 * Stateful example
 * Creating table and tbody elements, where we dynamically insert TableRow for every object from data array
 */
import React from 'react';

class Table extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [
                {
                    "id": 1,
                    "name": "Foo",
                    "age": "20"
                },
                {
                    "id": 2,
                    "name": "Bar",
                    "age": "30"
                },
                {
                    "id": 3,
                    "name": "Baz",
                    "age": "40"
                }
            ]
        }
    }
    render() {
        return (
            <div>
                <Header />
                <table>
                    <tbody>
                        {
                            /**
                             * We are using key = {i} inside map() function. This will help React to update
                             * only necessary elements instead of re-rendering entire list when something
                             * changes. It is a huge performance boost for large number of dynamic elements.
                             */
                        }
                        { this.state.data.map( (person, i) => <TableRow key = {i} data = {person} /> ) }
                    </tbody>
                </table>
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
class TableRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{ this.props.data.id }</td>
                <td>{ this.props.data.name }</td>
                <td>{ this.props.data.age }</td>
            </tr>
        );
    }
}
export default Table;