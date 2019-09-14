
const getCookies = name => {
    var arr, reg=new RegExp(`(^| )${name}=([^;]*)(;|$)`); 
		if(arr=document.cookie.match(reg)){
      return unescape(arr[2]);
    }
		return null;
};

const clearCookies = () => {
  console.log('logout------------------');
  document.cookie=`userInfo=;expires=${new Date()}; path=/`;
};

export { 
  getCookies,
  clearCookies
};
