export type Loading = 'idle' | 'pending'

export interface JockInterface {
  categories: Array<string>,
  created_at: string,
  icon_url: string,
  id: string,
  updated_at: string,
  url: string,
  value: string,
}

export interface ErrorInterface {
  timestamp: string,
  status: number,
  error: string,
  message: string,
  violations: {
    "search.query": string
  }
}
