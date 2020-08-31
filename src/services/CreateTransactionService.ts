import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private _transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this._transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {

    const transactions = this._transactionsRepository.all();
    const {total} = this._transactionsRepository.getBalance();

    if ( type === 'outcome' && value > total){
      throw Error('Transaction with type outcome can be greater then income');
    }


    const transaction =  this._transactionsRepository.create({
      title,
      type,
      value
    })

    return transaction;
  }
}

export default CreateTransactionService;
