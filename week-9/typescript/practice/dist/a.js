"use strict";
function runAfter3Sec(fn) {
    setTimeout(fn, 3000);
}
runAfter3Sec(() => console.log('Hello'));
function isLegal(user) {
    if (user.age > 18) {
        console.log("Legal");
    }
}
const obj = {
    name: "Umer",
    age: 40,
    email: "Umer@gmail.com"
};
isLegal(obj);
