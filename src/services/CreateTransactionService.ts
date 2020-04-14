import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (value > balance.total) {
        throw new Error('Invalid transaction amount');
      }
    }

    const transaction = this.transactionsRepository.create(title, value, type);

    return transaction;
  }
}

export default CreateTransactionService;
