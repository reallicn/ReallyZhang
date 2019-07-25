import request from '@/utils/request';


export async function queryCarouselList() {
  return request('/home/getCarouselList');
}
