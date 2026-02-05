import httpInstance from "@/utils/http";

export const getBannerAPI = (params = {}) => {
  const { distributionSite = '1' } = params
  return httpInstance.get('/home/banner',{
    params:{
      distributionSite
    }
  })
}

export const findNewAPI = () => {
  return httpInstance.get('/home/new')
}

export const getHotAPI = () => {
  return httpInstance.get('/home/hot')
}

export const getGoodsAPI = () => {
  return httpInstance.get('/home/goods')
}