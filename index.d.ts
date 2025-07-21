type New = { new (..._: any): any }
type $ = {
  <T extends New>(x: T): { 
    readonly [Key in keyof T["prototype"]]: T["prototype"][Key] extends (..._: infer A) => infer R
      ? A extends ({ readonly [K in number]?: any } | readonly [])
        ? {
          <C extends InstanceType<T>>(self: C): ReturnType<C[Key]>
          <
            A1 extends Parameters<InstanceType<T>[Key]>,
            C1 extends InstanceType<T> = InstanceType<T>,
            R1 extends ReturnType<InstanceType<T>[Key]> = ReturnType<InstanceType<T>[Key]>
          >(..._: A1): <
            R2 extends R1 = R1,
            C2 extends C1 = C1,
          >(self: C2) => R2
        }
        : {
            <
              A1 extends Parameters<InstanceType<T>[Key]>,
              C1 extends InstanceType<T> = InstanceType<T>,
              R1 extends ReturnType<InstanceType<T>[Key]> = ReturnType<InstanceType<T>[Key]>
            >(..._: A1): <
              R2 extends R1 = R1,
              C2 extends C1 = C1,
            >(self: C2) => R2
        }
      : <C extends InstanceType<T>>(self: C) => C[Key]
  }

  <
    C extends any,
    T extends New = New,
  >(constructor: T): { 
    readonly [Key in Exclude<keyof C, number>]: C[Key] extends (..._: infer A) => infer R
    ? A extends { readonly [K in number]?: any }
      ? {
        <
          R1 extends R,
          C1 extends C = C,
        >(self: C1): C1[Key] extends (..._: infer A) => infer R ? R & R1 : R1

        <
          A1 extends A,
          C1 extends C = C,
          R1 extends R = R,
        >(..._: A1): <
          R2 extends R1,
          C2 extends C1,
        >(self: C2) => R2
      }
      : {
        <
          A1 extends A,
          C1 extends C = C,
          R1 extends R = R,
        >(..._: A1): <
          R2 extends R1,
          C2 extends C1 = C1,
        >(self: C2) => R2
      }
    : <C1 extends C>(self: C1) => C1[Key]
  }
}

/**
 * @description A tiny utility for creating functional, curried access to class prototype methods and properties.
 * @example
 * ```typescript
 * const incs = $(Array<number>).map(x => x + 1);
 * incs([1, 2, 3]); // [2, 3, 4]
 *
 * const sum = $<readonly number[]>(Array).reduce(<T extends number>(a: T, b) => a + b, 0);
 * sum([1, 2, 3]); // 6
 *
 * const getDate = $(Date).getDate;
 * getDate(new Date()); // 3
 *
 * const localeDate = $(Date).toLocaleDateString;
 * const EN_date = localeDate('en-US');
 * const DE_date = localeDate('de-DE');
 *
 * EN_date(new Date()); // "3/1/2022"
 * DE_date(new Date()); // "1.3.2022"
 * localeDate(new Date()); // "3/1/2022"
 *
 * class User {
 *   constructor(public name: string, public lastName: string) {}
 *   get fullName() {
 *     return `${this.name} ${this.lastName}`;
 *   }
 * }
 *
 * const fullName = $(User).fullName;
 * fullName(new User('Bohdan', 'Khmelnytsky')); // "Bohdan Khmelnytsky"
 * fullName(new User('Taras', 'Shevchenko')); // "Taras Shevchenko"
 * ```
 */
declare const $: $;
export default $;
