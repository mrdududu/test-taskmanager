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

  const addItem = (value: Omit<T, 'id'>) => {
    // https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers
    const item = { ...value, id: genId() } as T
    state.value = [...state.value, item]
  }

  const delItem = (id: string | number) => {
    // console.log('deleteItem', id)
    state.value = state.value.filter((item) => item.id !== id)
  }

  return { state, fetchItems, addItem, delItem }
}

export const getEventsApi = () => {
  type Events = {
    [key: number]: {
      // TaskId
      [key: number]: number // DateId = StatusId
    }
  }

  // const events: Events = {
  //   [123]: {
  //     [456]: 789
  //   },
  //   [12]: {
  //     [34]: 56
  //   }
  // }
  const defaultStorage: Events = {}
  const state = useStorage('events', defaultStorage)

  const addItem = (taskId: number, dateId: number, statusId: number) => {
    if (!state.value[taskId]) {
      state.value[taskId] = {}
    }

    state.value = { ...state.value, [taskId]: { ...state.value[taskId], [dateId]: statusId } }
  }

  const delItem = (taskId: number, dateId: number) => {
    delete state.value[taskId]?.[dateId]
  }

  const removeItemsByTaskId = (taskId: number) => {
    if (state.value[taskId]) {
      delete state.value[taskId]
    }
  }

  const removeItemsByDateId = (dateId: number) => {
    const taskIds = Object.keys(state.value)
    taskIds.forEach((taskId) => {
      delete state.value[Number(taskId)]?.[dateId]
    })
  }

  const removeItemsByStatusId = (statusId: number) => {
    const taskIds = Object.keys(state.value).map((k) => Number(k))
    taskIds.forEach((taskId) => {
      if (state.value[taskId]) {
        const dateIds = Object.keys(state.value[taskId]).map((k) => Number(k))
        dateIds.forEach((dateId) => {
          const statId = state.value[taskId][dateId]
          if (statId === statusId) {
            delete state.value[taskId][dateId]
          }
        })
      }
    })
  }

  return {
    state,
    addItem,
    delItem,
    removeItemsByTaskId,
    removeItemsByDateId,
    removeItemsByStatusId
  }
}
