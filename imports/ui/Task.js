import { Template } from "meteor/templating";

import { TasksCollection } from "../api/collections/TasksCollection";

import "./Task.html";

Template.task.events({
  "click .toggle-checked"() {
    // Set the checked property to the opposite of its current value
    TasksCollection.update(this._id, {
      $set: { isChecked: !this.isChecked },
    });
  },
  "click .delete"() {
    Meteor.call("tasks.remove", this._id); //수정했음
  },
});
