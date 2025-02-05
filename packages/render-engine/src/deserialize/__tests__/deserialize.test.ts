import instatiateFuncSpec from '../instantiate';
import dummyCTX from '../../ctx/__tests__/fixtures/dummy-ctx';

test('deserialize_keep_n_unchanged', () => {
  const n = { foo: 'bar', bar: 123 };
  const _n = Object.assign({}, n);

  expect(instatiateFuncSpec(n, dummyCTX)).toStrictEqual(_n);
});

test('deserialize_instantiate_function', () => {
  const n = { fn: { type: '', args: '', body: '' } };
  instatiateFuncSpec(n, dummyCTX);

  expect(typeof n.fn).toBe('function');
});

test('deserialize_return_expected_value', () => {
  const n = {
    fn1: { type: '', args: 'state', body: 'return state.foo' },
    fn2: { type: 'state_convert_expression', expression: '10;' },
    children: [
      {
        fn1: { type: '', args: 'state', body: 'return state.foo' },
        fn2: { type: 'state_convert_expression', expression: '10;' },
      },
    ],
  };

  instatiateFuncSpec(n, dummyCTX);

  expect(typeof n.fn1).toBe('function');
  // @ts-ignore
  expect(n.fn1({ foo: 'bar' })).toBe('bar');
  expect(typeof n.fn2).toBe('function');
  // @ts-ignore
  expect(n.fn2({ foo: 'bar' })).toBe(10);

  expect(typeof n.children[0].fn1).toBe('function');
  // @ts-ignore
  expect(n.children[0].fn1({ foo: 'bar' })).toBe('bar');

  expect(typeof n.children[0].fn2).toBe('function');
  // @ts-ignore
  expect(n.children[0].fn2({ foo: 'bar' })).toBe(10);
});
