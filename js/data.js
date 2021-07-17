const STORAGE_BOOK_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser tidak mendukung Local Storage");
    return false;
  }
  return true;
}

function saveBookData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_BOOK_KEY, parsed);
  document.dispatchEvent(new Event("onbookdatasaved"));
}

function loadBookDataFromStorage() {
  const serializeData = localStorage.getItem(STORAGE_BOOK_KEY);

  let data = JSON.parse(serializeData);

  if (data !== null) {
    books = data;
  }
  document.dispatchEvent(new Event("onbookdataloaded"));
}

function updateBookDataToStorage() {
  if (isStorageExist()) {
    saveBookData();
  }
}

function createBookObject(title, author, year, isCompleted) {
  const bookObject = {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  };
  
  return bookObject;
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) {
      return book;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) {
      return index;
    }
    index++;
  }
  return -1;
}