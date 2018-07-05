class Account {
  // initial key-value pairs
  constructor(username) {
    this.username = username;
    this.balance = 0;
    this.transactions = [];
  }
  // add transaction history
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

// superclass
class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  isAllowed() {
    if (this.value > 0) {
      return true;
    }
    return false;
  }
  commit() {
    // this.value refers to the `value()` getter. Notice there is no '()'
    if (this.isAllowed()) {
      this.account.balance += this.value;
      this.time = new Date();
      this.account.addTransaction(this);
    } else {
      console.log('=========\nYour account balance is $0. Transaction cancelled!\n=========');
    }
  }
}

// subclass
class Deposit extends Transaction {
  get value() {
    // return how much was deposited
    return this.amount;
  }
}

// subclass
class Withdrawal extends Transaction {
  get value() {
    // return how much was withdrawn
    return -this.amount;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('billybob');
console.log(`Starting Balance: ${myAccount.balance}`);

const t1 = new Deposit(120.00, myAccount);
t1.commit();
const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log(`Ending Balance: ${myAccount.balance}`);
console.log(myAccount);