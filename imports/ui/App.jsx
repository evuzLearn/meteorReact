import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

// App component - represents the whole app
class App extends Component {
  renderTasks() {
    return this.props.tasks.map((task) => (
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
App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}).fetch(),
  };
}, App);
