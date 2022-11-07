import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import "./Login.html";

Template.login.events({
  "submit .login-form"(e) {
    e.preventDefault();

    const target = e.target;

    const username = target.username.value;
    const password = target.password.value;
    console.log("username:", username);
    console.log("password:", password);

    Meteor.loginWithPassword(username, password);

    console.log("로그인완료");
  },
});
