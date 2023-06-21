import { Book } from '../models/book';

interface BookResponse {
  books: Book[];
  total: number;
}

const PAGE_SIZE = 20;
const googleUrl = `https://www.googleapis.com/books/v1/volumes?printType=books&maxResults=${PAGE_SIZE}`;

export async function fetchBooks(
  query: string,
  page: number = 0,
): Promise<BookResponse> {
  try {
    //TODO: implmement params embedding in cleaner way
    const response = await fetch(
      `${googleUrl}&startIndex=${page * PAGE_SIZE}&q=${query}`,
    );
    const data = await response.json();
    const books = data.items.map((item: any) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        image: item.volumeInfo.imageLinks?.thumbnail,
        authors: item.volumeInfo.authors || [],
        wishlist: false,
      };
    });
    return { books, total: data.totalItems };
  } catch (error) {
    console.error('Error fetching books:', error);
    return { books: [], total: 0 };
  }
}
