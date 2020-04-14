import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

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
    const initialBalance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce((acc, transaction) => {
      switch (transaction.type) {
        case 'income':
          return {
            ...acc,
            income: acc.income + transaction.value,
            total: acc.total + transaction.value,
          };
        case 'outcome':
          return {
            ...acc,
            outcome: acc.outcome + transaction.value,
            total: acc.total - transaction.value,
          };
        default:
          return acc;
      }
    }, initialBalance);

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
