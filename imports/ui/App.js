import "./App.html";
import { Template } from "meteor/templating";
import { TasksCollection } from "../api/collections/TasksCollection";
// import { Packery } from "packery";
// import { Tracker } from "meteor/tracker";
// import { ReactiveDict } from "meteor/reactive-dict";
import "./Task.js";
import "./Login.js";
import "./Wallet.js";

const getUser = () => {
  Meteor.user; //로그인된 유저
};
const isUserLogged = () => {
  if (!getUser) {
    console.log("AIDEN 로그인 x");
  } else {
    console.log(Meteor.user()); //유저 아이디 확인  세션등록
    Meteor.subscribe("tasks"); // 로그인 됬을시 서버 정보 불러옴
    return true;
  }
};

Router.route("/", function () {
  this.render("mainContainer");
});

Router.route("/route", function () {
  this.render("login");
});

// Router.route(
//   "/item",
//   function () {
//     var req = this.request;
//     var res = this.response;
//     res.end("hello from the server\n");
//   },
//   { where: "server" }
// );

Template.mainContainer.helpers({
  tasks() {
    return TasksCollection.find({}, { sort: { creatdAt: -1 } });
  },
  getUser() {
    return getUser();
  },
  isUserLogged() {
    return isUserLogged();
  },
});

Template.form.events({
  "submit .task-form"(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Meteor.call("tasks.insert", text);

    event.target.text.value = ""; //원점으로
  },
});
