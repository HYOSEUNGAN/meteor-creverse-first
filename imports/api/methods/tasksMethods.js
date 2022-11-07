import { check } from "meteor/check";
import { TasksCollection } from "../collections/TasksCollection";

// DB를 미니몽고에서 작업한다 !!!
Meteor.methods({
  "tasks.insert"(text) {
    //텍스트 넣을거임
    check(text, String); // 체크

    // if (!this.userId) {
    //   throw new Meteor.Error("this.userId 없음");
    // }

    TasksCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId, //accounts 메서드
    });
  },
  "tasks.remove"(taskId) {
    check(taskId, String);

    // if (!this.userId) {
    //   throw new Meteor.Error("this.userId 없음");
    // }
    TasksCollection.remove(taskId);
  },
});
