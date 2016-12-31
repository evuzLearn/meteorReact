import React, { Component, PropTypes } from 'react';

import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
    Materialize.toast('Task ' + this.props.task.text +
      ' has been removed', 4000)
  }

  render() {
    const taskClassName = this.props.task.checked ?
      'collection-item active' : 'collection-item';
    return (
      <a href="#" className={taskClassName}
        onClick={this.toggleChecked.bind(this)}>
        <div>
          <span className="text">
          <strong>Added by {this.props.task.username} | </strong>
          {this.props.task.text}
        </span>
          <span href="#!" className="secondary-content">
            <i className="material-icons" onClick={this.deleteThisTask.bind(this)}>
              delete
            </i>
          </span>
        </div>
      </a>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};
