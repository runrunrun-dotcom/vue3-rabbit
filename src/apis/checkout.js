import httpInstance from "@/utils/http";

export const getCheckInfoAPI = () => {
  return httpInstance.get('/member/order/pre')
}

// 创建订单
export const createOrderAPI = (data) => {
  return httpInstance.post('/member/order',data)
}