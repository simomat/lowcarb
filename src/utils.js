import { Maybe } from 'wellmaybe';

export const safeMaybeOf = fn => {
  try {
    return Maybe.of(fn());
  } catch (e) {
    console.log('api call threw an error: ' + e);
    return Maybe.of();
  }
};
