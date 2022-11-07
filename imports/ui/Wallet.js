import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import Lightwallet from "eth-lightwallet";

import "./Wallet.html";

Template.wallet.events({
  "click .add"() {
    alert("🚀You need to take notes!!!");
    const mnemonic = Lightwallet.keystore.generateRandomSeed();
    console.log(mnemonic); //니모닉 단어 생성
    var password = prompt("Enter password for encryption", "password");
    console.log(password);
    Lightwallet.keystore.createVault(
      {
        password: password,
        seedPhrase: mnemonic,
        hdPathString: "m/0'/0'/0'",
      },
      function (err, ks) {
        ks.keyFromPassword(password, function (err, pwDerivedKey) {
          if (!ks.isDerivedKeyCorrect(pwDerivedKey)) {
            throw new Error("Incorrect derived key!");
          }

          try {
            ks.generateNewAddress(pwDerivedKey, 1);
          } catch (err) {
            console.log(err);
            console.trace();
          }
          var address = ks.getAddresses()[0];
          var privatekey = ks.exportPrivateKey(address, pwDerivedKey);

          console.log("address and key: ", address, privatekey);
          Session.set("address", address);
          Session.set("privatekey", privatekey);
        });
      }
    );
  },
});

Template.wallet.helpers({
  address() {
    // return "sss";
    return "지갑주소 :" + Session.get("address");
  },
  privatekey() {
    return "🚨프라이빗키 :" + Session.get("privatekey");
  },
});
