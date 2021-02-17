import { Book } from 'book/model/Book'
import { BookCollection } from 'book/model/BookCollection'
import { BookSearchCriteria } from 'book/model/BookSearchCriteria'
import { BookSearcher } from 'book/model/BookSearcher'

interface FinnaClientSearchRecord {
    readonly title: string
    readonly cleanIsbn?: string
    readonly year?: string
}

interface FinnaClientSearchResponse {
    readonly resultCount: number
    readonly records: readonly FinnaClientSearchRecord[]
}

function toBook(searchRecord: FinnaClientSearchRecord): Book {
    return {
        title: searchRecord.title,
        isbn: searchRecord.cleanIsbn,
        year: searchRecord.year,
    }
}

// HELMET-KIRJASTOJEN AINEISTOLUETTELOT
// Swagger API documentation:
// https://api.finna.fi/swagger-ui/?url=%2Fapi%2Fv1%3Fswagger#!
export class FinnaLibraryClient implements BookSearcher {
    findBooks({ title,author,year }: BookSearchCriteria): Promise<BookCollection> {
      
        const page = 1
        //todo koodaa parametrit
        const lookFor = `title:` + title + ` year:2017`
        const queryParams = [
            ['lookfor', lookFor],
            ['type', 'AllFields'],
            ['field[]', 'title'],
            ['field[]', 'cleanIsbn'],
            ['field[]', 'year'],
            ['sort', 'relevance,year asc'],
            ['page', `${page}`],
            ['limit', '4'],
            ['prettyPrint', 'false'],
            ['lng', 'fi'],
        ]

        const queryString = queryParams
            .map(([key, value]) => `${key}=${value}`)
            .join('&')



        return fetch(`https://api.finna.fi/api/v1/search?${queryString}`, {
            headers: { Accept: 'application/json' },
        })
            .then(response => response.json())
            .then((booksResponse: FinnaClientSearchResponse) => {
                return {
                    resultCount: booksResponse.resultCount,
                    books:
                        booksResponse.resultCount === 0
                            ? []
                            : booksResponse.records.map(toBook),
                    page,
                }
            })
    }
}
