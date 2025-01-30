class Stripe {
 processPayment(amount) {
    console.log("Payment processed through Stripe");
  }
}

class PayPal {
  processPayment(amount) {
    console.log("Payment processed through Paypal");
  }
}

class PaymentGateway {
  static getPaymentGateway(type) {
    switch (type) {
      case "stripe":
        return new Stripe();
      case "paypal":
        return new PayPal();
      default:
        throw new Error("Invalid payment gateway");
    }
  }
}

const payment = PaymentGateway.getPaymentGateway("stripe");
payment.processPayment(100);
