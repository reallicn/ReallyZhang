import { queryCarouselList } from '@/services/main';

export default {
  namespace: 'home',
  state: {
    carouselList:[],

  },
  effects: {
    * getCarouselList({ payload }, { call,put }){
      console.log('0000')
      const response = yield call(queryCarouselList);
      console.log('002',response.data)
      yield put({
        type: 'changeCarouselList',
        payload:response.data,
      });
    }
  },
  reducers: {
    changeCarouselList(state,{payload}){
      console.log('001',payload);
      return {
        ...state,
        carouselList:payload
      };
    }
    
  },
};
