export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
}
