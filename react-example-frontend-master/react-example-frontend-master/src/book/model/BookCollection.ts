import { Book } from './Book'

export interface BookCollection {
  readonly resultCount: number
   books:  Book[]
  readonly page: number
}
