import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from "@/apis/cart";


export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref({})
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.data.result
    // 合并购物车的操作
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
  }

  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 执行清除购物车的action
    cartStore.clearCart()
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},{
  persist: true
})