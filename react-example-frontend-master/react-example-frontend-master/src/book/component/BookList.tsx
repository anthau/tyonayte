import { BookCollection } from 'book/model/BookCollection'
import BookListHeader from './BookListHeader'
import React from 'react'
import { RemoteData } from 'langextensions/RemoteData'
import { assertNever } from 'langextensions/assertNever'
import ReactTable from 'react-table'
import 'react-table/react-table.css'




interface BookListProps {
  readonly bookCollection: RemoteData<BookCollection>
}


const BookList: React.FunctionComponent<BookListProps> = ({
  bookCollection,
}: BookListProps) => {
    const columns = [
        {
            Header: <b>Title</b>,
            accessor: 'title'
        }
        ,
        {
        
       
            Header: 'Author',
            accessor: 'author'
         
        }
    ]


  switch (bookCollection.type) {
    case 'NotAsked':
      return <div>Voit hakea kirjoja ylläolevasta hakupaneelista.</div>
    case 'Loading':
      return <div>Ladataan kirjoja...</div>
    case 'Failure':
      return <div>Hups! Haku epäonnistui.</div>
      case 'Success':

          return (
              <>
                  <BookListHeader bookCollection={bookCollection.value} />
                  <ReactTable
                      data={bookCollection.value.books}
                      columns={columns}
                      className={"-striped"}
                  /> 

                  </>
      )
    default:
      assertNever(bookCollection)
  }
}

export default BookList
