import {
  aceptarAmistad
} from '../modules/users';

test('thunk', async () => {
  const fakeDispatch = jest.fn();
  const fakeData = 42;

  await aceptarAmistad(fakeData)(fakeDispatch);
  expect(fakeDispatch).toHaveBeenCalled();
  expect(fakeDispatch.mock.calls.length).toBe(1);
  expect(fakeDispatch.mock.calls[0][0]).toEqual({type: 'users/ACEPTAR_AMISTAD', data: 42})
});
