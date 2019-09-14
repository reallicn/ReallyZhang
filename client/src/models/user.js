import { routerRedux } from 'dva/router';
import { stringify, parse } from 'qs';
import { message } from 'antd';
import { postUserRegister, postUserLogin, getCurrentUser } from '@/services/user';
import { getCookies, clearCookies } from '@/utils/brower';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function initCurrentUser() {
  const userInfo =getCookies('userInfo');
  console.log('init---',userInfo);
  if(userInfo){
    return JSON.parse(userInfo);
  }
  return null;
}

const UserModel = {
  namespace: 'user',
  state: {
  currentUser: initCurrentUser(),
  },
  effects: {
    *doCurrentUser({ payload }, { call, put }) {
      const response = yield call(getCurrentUser,payload);
      yield put({
        type: 'saveCurrentUser',
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
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },

    * doUserLogin({ payload }, { call, put }) {

      const response = yield call(postUserLogin, payload);
      if(response.code === 0){
        yield put(routerRedux.push('/page/main'));
      }
      message.success(response.msg);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },






    *logout(_, { put }) {
      // const { redirect } = getPageQuery(); // redirect
      // if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/page/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
        clearCookies();
      // }
    },

  },
  reducers: {

    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status, type: payload.type };
    },

    saveCurrentUser(state, {payload}) {
      return { ...state, currentUser: payload };
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
          ...state.userInfo,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
