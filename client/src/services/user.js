import request from '@/utils/request';

export async function getCurrentUser() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}


export async function postUserLogin(data) {

  return request('/api/user/login',{
    requestType: 'form',
    method:'POST',
    data,
    
  });
}

export async function postUserRegister(data) {
  return request('/api/user/register',{
    requestType: 'form',
    method:'POST',
    data
  });
}


export async function postPublishBlog(data) {
  return request('/api/blog/publish',{
    requestType: 'form',
    method:'POST',
    data
  });
}

export async function getBlogList(data) {
  return request('/api/blog/list',{params:data});
}

export async function getBlogById(data) {
  return request('/api/blog/id',{params:data});
}