import { Book } from '../models/book';

const WISHLIST_STORAGE_KEY = 'wishlist';

export const getWishlistFromStorage = (): Book[] => {
  const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
  return JSON.parse(storedWishlist || '[]');
};

let wishlistMap: Object = {};

export const saveWishlistToStorage = (wishlist: Book[]): void => {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));

  wishlistMap = wishlist.reduce(
    (acc, book) => ({ ...acc, [book.id]: true }),
    {},
  );
};

export const addToWishlist = (book: Book): void => {
  const wishlist = getWishlistFromStorage();

  saveWishlistToStorage([...wishlist, book]);
};

export const removeFromWishlist = (book: Book): void => {
  const wishlist = getWishlistFromStorage();

  saveWishlistToStorage(wishlist.filter((b) => b.id !== book.id));
};

export const isInWishlist = (id: string): boolean =>
  wishlistMap.hasOwnProperty(id);
