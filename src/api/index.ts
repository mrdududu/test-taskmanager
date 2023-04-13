import { useStorage } from '@vueuse/core'

interface WithId {
  id: string | number
}

const genId = () => new Date().getTime()

export const getCollectionApi = <T extends WithId>(collectionName: string) => {
  const defaultStorage: T[] = []

  const state = useStorage(collectionName, defaultStorage)

  const fetchItems = () => {
    return state.value
  }

  const addItem = (value: Record<string, unknown>) => {
    const item = { ...value, id: genId() } as T
    state.value = [...state.value, item]
  }

  const delItem = (id: string | number) => {
    // console.log('deleteItem', id)
    state.value = state.value.filter((item) => item.id !== id)
  }

  return { state, fetchItems, addItem, delItem }
}
