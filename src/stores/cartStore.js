import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { delCartAPI, findNewCartListAPI, insertCartAPI } from "@/apis/cart";


export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  const cartList = ref([])
  // 获取最新列表
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.data.result
  }
  // 添加购物车
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      // 登录之后的加入购物车逻辑
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      // 添加购物车操作
      // 已添加过 count + 选择的数量
      // 未添加过 直接push
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }
  }

  // 删除购物车商品
  const delCart = async (skuId) => {
    if (isLogin.value) {
      // 调用接口实现接口购物车的删除功能
      await delCartAPI([skuId])
      updateNewList()
    } else {
      // 思路：
      // 1.找到要删除的数组下标值 - splice
      // 2，使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex(item => skuId === item.skuId)
      cartList.value.splice(idx,1)

      // cartList.value = cartList.value.filter(item => item.skuId !== skuId)
    }
  }

  // 清除购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  // 计算属性
  // 1.总数量
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2.总价
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 购物车列表已选择商品
  // 1.总数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count , 0))
  // 2.总价
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  // 是否全选
  // cartList为空时，返回true 空购物车全选框选上  加上逻辑中断
  const isAll = computed(() => cartList.value.length > 0 && cartList.value.every((item) => item.selected))

  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    clearCart,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    updateNewList
  }
},{
  persist: true
  }
)