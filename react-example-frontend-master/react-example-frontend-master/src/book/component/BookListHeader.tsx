import { BookCollection } from 'book/model/BookCollection'
import React from 'react'

interface BookListHeaderProps {
  readonly bookCollection: BookCollection
}

const BookListHeader: React.FunctionComponent<BookListHeaderProps> = ({
  bookCollection,
}: BookListHeaderProps) => (
  <div className="flex flex-col sm:flex-row text-2xl font-medium mb-2">
            <span>Tuloksia yhteensä: {Math.trunc(bookCollection.resultCount) }</span>
  </div>
)

export default BookListHeader
