import React from 'react'



import { Button, Input } from 'reactstrap';
import 'semantic-ui-css/semantic.min.css'
import { Icon } from 'semantic-ui-react'

interface BookSearchControlProps {
    readonly bookTitle: string
    readonly bookAuthor: string
    readonly bookYear: string
    readonly pageNumber: number
    readonly onBookTitleChange: (bookTitle: string) => void
    readonly onBookAuthorChange: (bookTitle: string) => void
    readonly onBookYearChange: (bookTitle: string) => void
    readonly onPageNumberChange: (page: number) => void
    
    readonly onSearchSubmit: () => void
    readonly searching: boolean
}

const BookSearchControl: React.FunctionComponent<BookSearchControlProps> = ({
    bookTitle,
    onBookYearChange,
    onBookTitleChange,
    onSearchSubmit,
    onBookAuthorChange,
    pageNumber,
    onPageNumberChange,

    searching
}: BookSearchControlProps) => (

        <div className="flex flex-col">
    
            <h2 className="text-3xl">Hae kirjoja </h2>
            <div className="font-light text-sm">Kirjan nimi</div>

            <form
                onSubmit={event => {
                    event.preventDefault()
                    onSearchSubmit()
                }}
             
            >
                <label><b>Title</b>        <i className="ni ni-air-baloon"></i></label>
                <Input type="text" name="title" onChange={event => onBookTitleChange(event.target.value)} id="title" placeholder="title" />

                <label><b>Author</b></label>
                <Input type="text" name="author"  onChange={event => onBookAuthorChange(event.target.value)}  id="author" placeholder="author" />

                <label><b>Year</b></label>
                <Input type="text" onChange={event => onBookYearChange(event.target.value)} name="Year" id="Year" placeholder="Year" />
       
                <Button color="primary"
                    className="text-white font-bold px-8 py-2 bg-gray-700 hover:bg-gray-800 ml-2 focus:outline-none disabled:opacity-50"
                    type="submit"
                    disabled={searching}
                >
                    Hae
                </Button>

                <br />
                <h3>  <Button onClick={event => { onPageNumberChange(pageNumber - 1 < 1 ? pageNumber = 1 : pageNumber = pageNumber - 1 ); }}> <Icon name='arrow left' /></Button><span style={{ margin: 25 }}>{pageNumber}</span><Button onClick={event => { onPageNumberChange(pageNumber + 1);   }}><Icon name='arrow right' /></Button></h3>
 
            </form>
        </div>
    )

export default BookSearchControl

