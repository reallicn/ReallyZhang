import { message } from 'antd';
import { postPublishBlog, getBlogList, getBlogById } from '@/services/user';


const UserModel = {
  namespace: 'blog',
  state: {
    blogList: [],
    blogDetail:{}
  },
  effects: {

    *doGetBlogById({ payload }, { call , put}) {
      const response = yield call(getBlogById,payload);
      yield put({
        type: 'saveBlogDetail',
        payload: response.data
      });
    },

    *doGetList({ payload }, { call , put}) {
      const response = yield call(getBlogList,payload);
      yield put({
        type: 'saveBlogList',
        payload: response.data
      });
    },


    *doPublish({ payload }, { call }) {
      const response = yield call(postPublishBlog,payload);
      message.success(response.msg);
    },
 
  },
  reducers: {

    saveBlogDetail(state, {payload}){
      return {
        ...state,
        blogDetail:payload
      };
    },

    saveBlogList(state, {payload}) {
      const {blogList=[]}=state;
      const {page,pageSize,list}=payload;
      if(page*pageSize>=blogList.length){
        return { ...state, blogList: blogList.concat(list)};
      }
      return { ...state };
    },
  },
};
export default UserModel;
