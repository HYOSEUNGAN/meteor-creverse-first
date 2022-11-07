import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/collections/TasksCollection";
import { Accounts } from "meteor/accounts-base";
import "/imports/api/publications/TasksPublication"; // => 서버시작시 퍼블리케이션으로 db데이터 보냄
import "/imports/api/methods/tasksMethods.js"; // => 서버시작시 메서드 등록됌

const insertTask = (taskText, user) => {
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });
};

const SEED_USERNAME = "AIDEN";
const SEED_PASSWORD = "1234";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD, //데모 아이디, 패스워드
    });
    // console.log(Accounts.forgotPassword);
  }

  // 데이터 없을때
  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach(insertTask);
  }
  console.log("메 테  오  서  버  연 결 완 료 !!!");
});
