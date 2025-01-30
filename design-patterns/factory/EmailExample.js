class Email {
  static sendMessage(message) {
    console.log("sending EMAIL");
  }
}

class SMS {
  static sendMessage(message) {
    console.log("sending SMS");
  }
}

class NotificationFactory {
  static getNotificationType(type) {
    if (type === "email") {
      return Email;
    } else if (type === "sms") {
      return SMS;
    }
  }
}

const notification = NotificationFactory.getNotificationType("sms");
// notification.sendMessage("hello ")
SMS.sendMessage("Poker");
console.log(notification);
