import httpInstance from "@/utils/http";

export const getDetail = (id) => {
  return httpInstance.get('/goods',{
    params:{
      id
    }
  })
}


export const fetchHotGoodsAPI = (id,type,limit=3) => {
  return httpInstance.get('/goods/hot',{
    params: {
      id,
      type,
      limit
    }
  })
}