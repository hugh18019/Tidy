// import { useReducer } from 'react';
import {
  UPDATE_TASKS,
  ADD_TASK,
  UPDATE_CONTACTS,
  ADD_CONTACTS,
  UPDATE_CURRENT_USER,
  UPDATE_EVENTS,
  UPDATE_MESSAGES,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_ACCOUNT_STATUS,
  UPDATE_ACCOUNT_NAME,
  UPDATE_LOGIN_STATUS,
  UPDATE_SHOW_ALERT
} from './actions';

var initState = {
  isLoggedIn: false,
  username: 'admin',
  tasks_current_user: [],
  contacts_current_user: [],
  current_user: {},
  showAlert: false
}

export const reducer = (state = initState, action) => {
  switch (action.type) {

    case UPDATE_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };

    case UPDATE_TASKS:
      return {
        ...state,
        tasks_current_user: [...action.tasks_current_user],
      };
    case ADD_TASK:
      return {
        ...state,
        tasks_current_user: [
          ...state.tasks_current_user,
          action.tasks_current_user,
        ],
      };
    case ADD_CONTACTS:
      return {
        ...state,
        contacts_current_user: [
          ...state.contacts_current_user,
          action.contacts_current_user,
        ],
      };
    case UPDATE_CONTACTS:
      return {
        ...state,
        contacts_current_user: [...action.contacts_current_user],
      };
    case UPDATE_CURRENT_USER:
      
      console.log(action.current_user);

      return {
        ...state,
        current_user: action.current_user
      }
    case UPDATE_ACCOUNT_STATUS:
      console.log('UPDATE_ACCOUNT_STATUS dispatched');
      return {
        ...state,
        isLoggedIn: !action.isLoggedIn,
      };
    case UPDATE_ACCOUNT_NAME:
      console.log('UPDATE_ACCOUNT_NAME dispatched');
      return {
        ...state,
        userName: action.userName,
      };
    case UPDATE_SHOW_ALERT:
      return {
        ...state,
        showAlert: action.showAlert
      }
    default:
      console.log('Hit default case');
      return state;
  }
};

export default reducer;
