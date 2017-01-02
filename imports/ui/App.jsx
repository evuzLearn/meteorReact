import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrappers.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="row">
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Meteor React</a>
          </div>
        </nav>
        <div className="container">
          <header>
            <h3>Todo List<span className="badge">{this.props.incompleteCount}</span></h3>
          </header>
          <AccountsUIWrapper />
          <form action="#">
            <p>
              <input
                type="checkbox"
                id="checkHideCompleted"
                className="filled-in"
                readOnly
                checked={this.state.hideCompleted}
                onClick={this.toggleHideCompleted.bind(this)}
              />
              <label htmlFor="checkHideCompleted">Hide Complete</label>
            </p>
          </form>
          { this.props.currentUser ?
            <div className="row">
              <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
                <div className="input-field col s12">
                  <input
                    type="text"
                    id="newTask"
                    ref="textInput"
                    className="validate"
                    />
                  <label htmlFor="newTask">New Task</label>
                </div>
              </form>
            </div> : " "
          }
          <ul className="collection">
          {this.renderTasks()}
          </ul>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, {sort: { createdAt: -1}}).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);
