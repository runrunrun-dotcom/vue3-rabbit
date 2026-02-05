import httpInstance from "@/utils/http";

export const loginAPI = (account,password) => {
  return httpInstance.post('/login',
    account,
    password
  )
}

export const getLikeListAPI = (limit = 4) => {
  return httpInstance.get('/goods/relevant',{
    params: {
      limit
    }
  })
}