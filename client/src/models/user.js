import { routerRedux } from 'dva/router';
import { stringify, parse } from 'qs';
import { message } from 'antd';
import { query as queryUsers, queryCurrent, postUserRegister, postUserLogin } from '@/services/user';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    /**
     * Do --> Post --> change
     */
    * doUserRegister({ payload }, { call, put}) {

      const response = yield call(postUserRegister, payload);
      if(response.code === 0){
        yield put(routerRedux.push('/page/main'));
      }
      message.success(response.msg);
    },

    * doUserLogin({ payload }, { call, put }) {

      const response = yield call(postUserLogin, payload);
      if(response.code === 0){
        yield put(routerRedux.push('/page/main'));
      }
      message.success(response.msg);
    },






    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },




    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {

    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status, type: payload.type };
    },

    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
