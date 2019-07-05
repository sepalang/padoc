const obj = {
  foo: {
    bar: {
      baz: 42,
    },
  },
};

const baz = obj?.foo?.bar?.baz;

const safe = obj?.qux?.baz;

const exactBar = obj?.foo.bar?.baz;

const stringVar = obj?.['foo']?.bar?.baz;

export default { baz, safe, exactBar, stringVar };