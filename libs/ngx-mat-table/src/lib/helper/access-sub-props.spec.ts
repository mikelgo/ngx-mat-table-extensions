import { accessSubProp } from './access-sub-props';

interface TestModel {
  id: number;
  user: User;
}

interface User {
  name: string;
  address: Address;
}
interface Address {
  street: string;
  zipcode: string;
}

describe('AccessSubProps()', () => {
  const arg: TestModel = {
    id: 123,
    user: {
      name: 'Michael',
      address: {
        street: 'x-street',
        zipcode: '238sd',
      },
    },
  };
  it('should access subproperty on 1st level', () => {
    expect(accessSubProp(arg, 'id')).toEqual(arg.id);
  });

  it('should access subproperty on 2nd level', () => {
    expect(accessSubProp(arg, 'user.name')).toEqual(arg.user.name);
  });

  it('should access subproperty on 3rd level', () => {
    expect(accessSubProp(arg, 'user.address.street')).toEqual(
      arg.user.address.street
    );
  });
});
