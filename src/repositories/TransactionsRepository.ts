import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTotals = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'income') {
        return sum + transaction.value;
      }

      return sum;
    }, 0);

    const outcomeTotals = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'outcome') {
        return sum + transaction.value;
      }

      return sum;
    }, 0);

    const balance: Balance = {
      income: incomeTotals,
      outcome: outcomeTotals,
      total: incomeTotals - outcomeTotals,
    };

    return balance;
  }

  public create(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
