import React, { Component } from 'react';

import Task from './Task.jsx';

// App component - represents the whole app
export default class App extends Component {
  getTasks() {
    return [
      { _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 3' },
    ];
  }

  renderTasks() {
    return this.getTasks().map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="row">
      <nav>
        <div className="nav-wrapper">
          <div className="col s12">
            <a href="#" className="brand-logo">Meteor React</a>
          </div>
        </div>
      </nav>
      <div className="container">
        <ul className="collection with-header">
          <li className="collection-header"><h3>Todo List</h3></li>
          {this.renderTasks()}
        </ul>
        </div>
      </div>
    );
  }
}
