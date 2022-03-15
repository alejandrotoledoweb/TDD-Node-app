import { add } from './calc';

describe('calculator', function () {
  it('add two numbers', function () {
    expect(add(1, 2)).toEqual(3);
  });
});

// describe('calculator', () => {
//   it('should perform addition', () => {});
//   it('should perform subtraction', () => {});
//   it('should perform multiplication', () => {});
//   it('should perform division', () => {});
// });

// describe('calculator', () => {
//   describe('should perform addition', () => {
//     it('adds two positive numbers', () => {});
//     it('adds two negative numbers', () => {});
//     it('adds one positive and one negative numbers', () => {});
//   });
// });

// describe('addition', () => {
//   it('adds two positive numbers', () => {
//     const options = { precision: 2 };
//     const calc = new Calculator(options);
//     const result = calc.add(1.333, 3.2);
//     expect(result).toEqual(4.53);
//   });
//   it('adds two negative numbers', () => {
//     const options = { precision: 2 };
//     const calc = new Calculator(options);
//     const result = calc.add(-1.333, -3.2);
//     expect(result).toEqual(-4.53);
//   });
// });

// toEqual()

it('basic usage', () => {
  expect(1 + 1).toEqual(2);
  expect('Juntao').toEqual('Juntao');
  expect({ name: 'Juntao' }).toEqual({ name: 'Juntao' });
});

// toBe()

it('basic usage', () => {
  expect(1 + 1).toBe(2); //pass
  expect('Juntao').toBe('Juntao'); //pass
  // expect({ name: 'Juntao' }).toBe({ name: 'Juntao' }); //fail for Objects use toEqual
  expect({ name: 'Juntao' }).toEqual({ name: 'Juntao' }); //pass for Objects use toEqual
});

// not

it('basic usage', () => {
  expect(1 + 2).not.toEqual(2);
});

// toMatch

it('match regular expression', () => {
  expect('juntao').toMatch(/\w+/);
});

it('match numbers', () => {
  expect('185-3345-3343').toMatch(/^\d{3}-\d{4}-\d{4}$/);
  expect('1853-3345-3343').not.toMatch(/^\d{3}-\d{4}-\d{4}$/);
});

// toBeGreaterThan
// toBeGreaterThanOrEqual

it('compare numbers', () => {
  expect(1 + 2).toBeGreaterThan(2);
  expect(1 + 2).toBeGreaterThanOrEqual(2);
  expect(1 + 2).toBeLessThan(4);
  expect(1 + 2).toBeLessThanOrEqual(4);
});

// toContainEqual
// toContain

const users = ['Juntao', 'Abruzzi', 'Alex'];
it('match arrays', () => {
  expect(users).toContainEqual('Juntao');
  expect(users).toContain(users[0]);
});

it('object in array', () => {
  const users = [{ name: 'Juntao' }, { name: 'Alex' }];
  expect(users).toContainEqual({ name: 'Juntao' }); // PASS
  // expect(users).toContain({ name: 'Juntao' }); // FAIL
});

it('match object', () => {
  const user = { name: 'Juntao', address: 'Xian, Shaanxi, China' };
  expect(user.name).toBeDefined();
  expect(user.age).not.toBeDefined();
});

it('string contains', () => {
  const givenName = expect.stringContaining('Juntao');
  expect('Juntao Qiu').toEqual(givenName);
});

describe('array', () => {
  const users = ['Juntao', 'Abruzzi', 'Alex'];
  it('array containing', () => {
    const userSet = expect.arrayContaining(['Juntao', 'Abruzzi']);
    expect(users).toEqual(userSet);
  });
});

// jsonpath query

import jsonpath from 'jsonpath';
const user = {
  name: 'Juntao Qiu',
  address: 'Xian, Shaanxi, China',
  projects: [
    { name: 'ThoughtWorks University' },
    { name: 'ThoughtWorks Core Business Beach' }
  ]
};
const result = jsonpath.query(user, '$.projects');
console.log(JSON.stringify(result));

// would get [[{"name":"ThoughtWorks University"},{"name":"ThoughtWorks Core Business Beach"}]]

const result1 = jsonpath.query(user, '$.projects[0].name');
console.log(JSON.stringify(result1));
// would get ["ThoughtWorks University"]

// Create a matcher with jsonpath
expect.extend({
  toMatchJsonPath(received, argument) {
    const result = jsonpath.query(received, argument);
    if (result.length > 0) {
      return { pass: true, message: () => 'matched' };
    } else {
      return {
        pass: false,
        message: () =>
          `expected ${JSON.stringify(received)} to match jsonpath ${argument}`
      };
    }
  }
});

describe('jsonpath', () => {
  it('matches jsonpath', () => {
    const user = { name: 'Juntao' };
    expect(user).toMatchJsonPath('$.name');
  });
  it('does not match jsonpath', () => {
    const user = { name: 'Juntao', address: 'ThoughtWorks' };
    expect(user).not.toMatchJsonPath('$.age');
  });
});

// MOCKS

it('create a callable function', () => {
  const mock = jest.fn();
  mock('Juntao');
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith('Juntao');
  expect(mock).toHaveBeenCalledTimes(1);
});

it('mock implementation', () => {
  const fakeAdd = jest.fn().mockImplementation((a, b) => 5);
  expect(fakeAdd(1, 1)).toBe(5);
  expect(fakeAdd).toHaveBeenCalledWith(1, 1);
});

export const fetchUser = (id, process) => {
  return fetch(`http://localhost:4000/users/${id}`);
};

describe('mock API call', () => {
  const user = { name: 'Juntao' };
  it('mock fetch', () => {
    // given
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ user }));
    const process = jest.fn(); // when
    fetchUser(111).then((x) => console.log(x)); // then
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:4000/users/111'
    );
  });
});
