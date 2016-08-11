import { store } from '../store';
import validCookieExists from './validCookieExists';
import { getModule } from '../actions/module';
import { getDashboard } from '../actions/dashboard';
import { loadUserState } from './userState';
import { getUserDetails } from '../actions/user';
import getUserID from './getUserID';


/**
 * Checks if user is authenticated.  Redirects  to '/' if they're not
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function authenticate (nextState, replace, callback) {
    if (!validCookieExists()) {
        replace('/');
    } else if (!loadUserState() && !store.getState().user.user_id) {
        store.dispatch(getUserDetails(getUserID()));
    }
    callback();
}

/**
 * Checks if user is authenticated in the indexRoute.  Redirects to dashboard if they are.
 * Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function shouldUserRedirect (nextState, replace, callback) {

    if (validCookieExists()) {
        replace('/dashboard');
    }
    callback();
}

/**
 * Fetches module information for the selected module.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function fetchModule (nextState, replace, callback) {

    if (validCookieExists()) {
        store.dispatch(getModule(nextState.params.module_id));
    }
    callback();
}

/**
 * Fetches module List when user enters the dashboard.  Is used as an onEnter hook for React Router
 * Matches the signature of a React Router hook: https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
 * @param {object} nextState - the next router state
 * @param {function} replace - function to redirect to another path
 * @param {function} callback - (optional) can be used to make the transition block
 */
export function fetchModuleList (nextState, replace, callback) {
    if (validCookieExists()) {
        store.dispatch(getDashboard());
    }
    callback();
}