import { defineStore } from 'pinia'
import { getCollectionApi, getEventsApi } from '@/api'

type Task = { id: number; name: string }
type MyDate = { id: number; isoDateString: string }
type Status = { id: number; name: string }

export const useTaskManagerStore = defineStore('task-manager', () => {
  const apiTasks = getCollectionApi<Task>('tasks')
  const apiDates = getCollectionApi<MyDate>('dates')
  const apiStatuses = getCollectionApi<Status>('statuses')
  const apiEvents = getEventsApi()

  return {
    tasks: apiTasks,
    dates: apiDates,
    statuses: apiStatuses,
    events: apiEvents
  }
})
