import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategoryAPI } from "@/apis/layout"


export const useCategoryStore = defineStore('category',()=>{
  const categoryList = ref([])

  const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.data.result
  }

  return {
    categoryList,
    getCategory
  }
})