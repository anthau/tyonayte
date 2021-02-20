import { BookCollection } from 'book/model/BookCollection'
import BookListHeader from './BookListHeader'
import React from 'react'
import { RemoteData } from 'langextensions/RemoteData'
import { assertNever } from 'langextensions/assertNever'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Button, Input } from 'reactstrap';
import { Icon } from 'semantic-ui-react'

interface BookListProps {
    readonly bookCollection: RemoteData<BookCollection>
    readonly onPageNumberChange: (page: number) => void
    readonly pageNumber: number

}

const BookList: React.FunctionComponent<BookListProps> = ({
    bookCollection,
    pageNumber,
    onPageNumberChange
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
        ,
        {
            Header: 'Year',
            accessor: 'year'
        }
        ,
        {
            Header: 'Isbn',
            accessor: 'isbn'
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
          //<Button onClick={event => { onPageNumberChange(pageNumber - 1 < 1 ? pageNumber = 1 : pageNumber = pageNumber - 1); }}> <Icon name='arrow left' /></Button><span style={{ margin: 25 }}>{pageNumber}</span><Button onClick={event => { onPageNumberChange(pageNumber + 1); }}><Icon name='arrow right' /></Button>

          const pageLength = Math.trunc(bookCollection.value.resultCount/4)
          return (
              <>
            

                  <BookListHeader bookCollection={bookCollection.value} />
                  <h3><Button onClick={() => onPageNumberChange(pageNumber - 1 < 0 ? pageNumber = 0 : pageNumber = pageNumber - 1)}><Icon name='arrow left' /></Button>   {pageNumber + 1} / {pageLength + 1}<Button onClick={() => onPageNumberChange(pageNumber >= pageLength ? pageNumber = pageNumber : pageNumber = pageNumber + 1)}><Icon name='arrow right' /></Button>   </h3>
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
