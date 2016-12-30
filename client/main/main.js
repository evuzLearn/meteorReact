import {
    Template
} from 'meteor/templating';

import './main.html';

Template.renderTarget.onRendered(function() {
    this.$(".dropdown-button").dropdown({
        hover: true
    });
    this.$(document).ready(function() {
        Materialize.updateTextFields();
    });
});

Template.renderTarget.events({
    "click .js-first-item": function(event, template) {
        Materialize.toast('I am a toast!', 4000);
    },
});
