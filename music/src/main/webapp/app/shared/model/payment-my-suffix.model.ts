export interface IPaymentMySuffix {
  id?: number;
  userActive?: string;
}

export class PaymentMySuffix implements IPaymentMySuffix {
  constructor(public id?: number, public userActive?: string) {}
}
