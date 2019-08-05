import store from '../../store';

/**
 * Checks if user is authorized
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
export function authGuard(to, from, next) {
  if (!store.getters.user) {
    // TODO: better notification
    console.log('Unauthorized user!');
    next({name: 'login'});
    return;
  }
  next();
}
