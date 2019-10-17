import { queryCarouselList } from '@/services/main';

export default {
  namespace: 'home',
  state: {
    carouselList:[],
  },
  effects: {
    * getCarouselList({ payload }, { call,put }){
      const response = yield call(queryCarouselList);
      yield put({
        type: 'changeCarouselList',
        payload:response.data,
      });
    }
  },
  reducers: {
    changeCarouselList(state,{payload}){
      // console.log('001',payload);
      return {
        ...state,
        carouselList:payload
      };
    }
    
  },
};
