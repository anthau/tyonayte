import React from 'react'

interface BookSearchControlProps {
  readonly bookTitle: string
  readonly onBookTitleChange: (bookTitle: string) => void
  readonly onSearchSubmit: () => void
  readonly searching: boolean
}

const BookSearchControl: React.FunctionComponent<BookSearchControlProps> = ({
  bookTitle,
  onBookTitleChange,
  onSearchSubmit,
  searching,
}: BookSearchControlProps) => (
  <div className="flex flex-col">
            <h2 className="text-3xl">Hae kirjoja</h2>

    <div className="font-light text-sm">Kirjan nimi</div>
    <form

      onSubmit={event => {
        event.preventDefault()
        onSearchSubmit()
      }}
            >
       <label><b>tekij&auml;</b></label>
      <input
             
        type="text"
        value={bookTitle}
        onChange={event => onBookTitleChange(event.target.value)}
                /> <br />
       
            <label><b>vuosi</b></label>
                <input
                 
                    type="text"
             
                  
                />

                <br />

      <button
        className="text-white font-bold px-8 py-2 bg-gray-700 hover:bg-gray-800 ml-2 focus:outline-none disabled:opacity-50"
        type="submit"
        disabled={searching}
                >
                    Hae
      </button>
               <br />
    </form>
  </div>
)

export default BookSearchControl
