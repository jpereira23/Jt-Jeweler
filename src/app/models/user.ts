export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  streetAddress: string;
  city: string;
  state: string;
  wishList: number[];
  orders: number[];
  constructor()
  {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.streetAddress = "";
    this.city = "";
    this.state = "";
    this.wishList = [];
    this.orders = [];
  }

}

