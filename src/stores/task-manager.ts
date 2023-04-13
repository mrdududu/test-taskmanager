import { defineStore } from 'pinia'
import { getCollectionApi } from '@/api'

type Task = { id: number; name: string }
type MyDate = { id: number; isoDateString: string }
type Status = { id: number; name: string }
type MyEvents = { id: number; task: Task; date: MyDate; status: Status }

export const useTaskManagerStore = defineStore('task-manager', () => {
  const apiTasks = getCollectionApi<Task>('tasks')
  const apiDates = getCollectionApi<MyDate>('dates')
  const apiStatuses = getCollectionApi<Status>('statuses')
  const apiEvents = getCollectionApi<MyEvents>('events')

  return {
    tasks: apiTasks,
    dates: apiDates,
    statuses: apiStatuses,
    events: apiEvents
  }
})
