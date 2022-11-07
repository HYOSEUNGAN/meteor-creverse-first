import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../collections/TasksCollection";

Meteor.publish("tasks", function publishTasks() {
  return TasksCollection.find({ userId: this.userId }); //퍼블리시 리턴값
});
