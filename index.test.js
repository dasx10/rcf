import { it, describe } from 'node:test';
import { strictEqual, deepStrictEqual } from 'node:assert';

import $ from './index.js';

const is = (y) => (x) => x === y;
const assortType = (y) => (x) => strictEqual(typeof x, y);
const assortFunction = assortType("function");
const assortNumber = assortType("number");

describe("Array", () => {
  it("map", () => {
    const map = $(Array).map;
    assortFunction(map);

    const inc = x => x + 1;
    const incs = map(inc);
    assortFunction(incs);

    deepStrictEqual(incs([1, 2, 3]), [2, 3, 4]);
  });

  it("find", () => {
    const find = $(Array).find;
    assortFunction(find);

    const find2 = find(is(2));
    assortFunction(find2);
    strictEqual(find2([1, 2, 3]), 2);
    strictEqual(find2([1, 3, 4]), undefined);
  });

  it("findIndex", () => {
    const findIndex = $(Array).findIndex;
    assortFunction(findIndex);

    const findIndex2 = findIndex(is(2));
    assortFunction(findIndex2);

    strictEqual(findIndex2([1, 2, 3]), 1);
    strictEqual(findIndex2([1, 3, 4]), -1);
  });

  it("reduce", () => {
    const reduce = $(Array).reduce;
    assortFunction(reduce);

    const add = (a, b) => a + b;
    const sum = reduce(add, 0);
    assortFunction(sum);
    strictEqual(sum([1, 2, 3]), 6);
  });

  it("reduceRight", () => {
    const reduceRight = $(Array).reduceRight;
    assortFunction(reduceRight);

    const add = (a, b) => a + b;
    const sum = reduceRight(add, 0);
    assortFunction(sum);
    strictEqual(sum([1, 2, 3]), 6);
  });

  it("filter", () => {
    const filter = $(Array).filter;
    assortFunction(filter);

    const isEven = (x) => x % 2 === 0;
    const evens = filter(isEven);
    assortFunction(evens);

    deepStrictEqual(evens([1, 2, 3]), [2]);
  });

  it("some", () => {
    const some = $(Array).some;
    assortFunction(some);

    const isEven = (x) => x % 2 === 0;
    const evens = some(isEven);
    assortFunction(evens);

    strictEqual(evens([1, 2, 3]), true);
  });

  it("every", () => {
    const every = $(Array).every;
    assortFunction(every);

    const isEven = (x) => x % 2 === 0;
    const evens = every(isEven);
    assortFunction(evens);

    strictEqual(evens([2, 4, 6]), true);
  });

  it("forEach", () => {
    const forEach = $(Array).forEach;
    assortFunction(forEach);
    const checker = forEach(assortNumber);
    assortFunction(checker);
    checker([1, 2, 3]);
  });

  it("includes", () => {
    const includes = $(Array).includes;
    assortFunction(includes);
    strictEqual(includes(1)([1, 2, 3]), true);
    strictEqual(includes(4)([1, 2, 3]), false);
  });

  it("indexOf", () => {
    const indexOf = $(Array).indexOf;
    assortFunction(indexOf);
    strictEqual(indexOf(1)([1, 2, 3]), 0);
    strictEqual(indexOf(4)([1, 2, 3]), -1);
  });

  it("lastIndexOf", () => {
    const lastIndexOf = $(Array).lastIndexOf;
    assortFunction(lastIndexOf);
    strictEqual(lastIndexOf(1)([1, 2, 3]), 0);
    strictEqual(lastIndexOf(4)([1, 2, 3]), -1);
  });

  it("slice", () => {
    const slice = $(Array).slice;
    assortFunction(slice);
    deepStrictEqual(slice(1)([1, 2, 3]), [2, 3]);
  });
});

describe("Date", () => {
  it("getDate", () => {
    const now = new Date();
    const getDate = $(Date).getDate;
    assortFunction(getDate);

    strictEqual(getDate(now), now.getDate());
    strictEqual(getDate()(now), now.getDate());
  });

  it("toLocaleDateString", () => {
    const now = new Date();
    const localeDate = $(Date).toLocaleDateString;
    assortFunction(localeDate);

    strictEqual(localeDate('en-US')(now), now.toLocaleDateString('en-US'));
    strictEqual(localeDate()(now), now.toLocaleDateString());
  });

  it("getDay", () => {
    const now = new Date();    
    const getDay = $(Date).getDay;
    assortFunction(getDay);

    strictEqual(getDay(now), now.getDay());
    strictEqual(getDay()(now), now.getDay());
  });

  it("getMonth", () => {
    const now = new Date();    
    const getMonth = $(Date).getMonth;
    assortFunction(getMonth);

    strictEqual(getMonth(now), now.getMonth());
    strictEqual(getMonth()(now), now.getMonth());
  });
});

describe("Custom class", () => {
  class User {
    constructor (name, lastName, birthday) {
      this.name = name;
      this.lastName = lastName;
      this.birthday = birthday;
    }

    get fullName() {
      return `${this.name} ${this.lastName}`;
    }

    get age () {
      const today = new Date();
      const birthDate = new Date(this.birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    get isAdult() {
      return this.age >= 18;
    }

    sayHello() {
      return `Hello, ${this.fullName}!`;
    }
  }

  it("sayHello", () => {
    const user = new User("John", "Doe", "1990-01-01");
    const sayHello = $(User).sayHello;
    assortFunction(sayHello);

    strictEqual(sayHello(user), "Hello, John Doe!");
  });

  it("isAdult", () => {
    const user = new User("John", "Doe", "1990-01-01");
    const isAdult = $(User).isAdult;
    assortFunction(isAdult);

    strictEqual(isAdult(user), true);
  });

  it("fullName", () => {
    const user = new User("John", "Doe", "1990-01-01");
    const fullName = $(User).fullName;
    assortFunction(fullName);

    strictEqual(fullName(user), "John Doe");
  });

  it("age", () => {
    const birthday = "1990-01-01";
    const user = new User("John", "Doe", birthday);
    const age = $(User).age;
    assortFunction(age);

    const today = new Date();
    const birthDate = new Date(birthday);
    const leftTime = today - birthDate;
    const ageD = Math.floor(leftTime / (1000 * 60 * 60 * 24 * 365.25));
    strictEqual(age(user), ageD);
  });
});
