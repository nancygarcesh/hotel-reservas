export interface ApiResponse<T = any> {
  data: T
  message?: string
}

export interface ApiError {
  message: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}