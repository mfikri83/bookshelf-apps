const UNCOMPLETED_LIST_BOOK_ID = "uncompletedBookList";
const COMPLETED_LIST_BOOK_ID = "completedBookList";
const BOOK_ID = "bookId";

function addBook() {
  const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

  const titleBook = document.getElementById("inputTitleBook").value;
  const authorBook = document.getElementById("inputAuthorBook").value;
  const yearBook = document.getElementById("inputYearBook").value;
  const isBookCompleted = document.getElementById("inputBookIsComplete").checked;

  const book = makeBook(titleBook, authorBook, yearBook, isBookCompleted);
  const bookObject = createBookObject(titleBook, authorBook, yearBook, isBookCompleted);

  book[BOOK_ID] = bookObject.id;
  books.push(bookObject);

  if (isBookCompleted) {
    completedBookList.append(book);
  } else {
    uncompletedBookList.append(book);
  }

  updateBookDataToStorage();
}

function checkCompleted() {
  const isBookCompleted = document.getElementById("inputBookIsComplete").checked;
  const readBook = document.getElementById("readBook");

  if (isBookCompleted) {
    readBook.innerText = "Selesai dibaca";
  } else {
    readBook.innerText = "Belum selesai dibaca";
  }
}

function makeBook(title, author, year, isBookCompleted) {
  const textTitleBook = document.createElement("h3");
  textTitleBook.innerText = title;

  const textAuthorBook = document.createElement("p");
  textAuthorBook.innerHTML = 'Penulis: <span id="author">' + author + "</span>";

  const textYearBook = document.createElement("p");
  textYearBook.innerHTML = 'Tahun Terbit: <span id="year">' + year + "</span>";

  const action = document.createElement("div");
  action.classList.add("action");

  if (isBookCompleted) {
    action.append(createUncompletedButton(), createDeleteButton());
  } else {
    action.append(createCompletedButton(), createDeleteButton());
  }

  const article = document.createElement("article");
  article.classList.add("book-item");
  article.append(textTitleBook, textAuthorBook, textYearBook, action);

  return article;
}

function createButtonAction(buttonClassName, eventListener, textButton) {
  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.classList.add(buttonClassName);

  button.addEventListener(
    "click",
    function (event) {
      eventListener(event);
    },
    (button.innerText = textButton)
  );

  return button;
}

function createCompletedButton() {
  return createButtonAction(
    "green",
    function (event) {
      addBookToCompleted(event.target.parentElement.parentElement);
    },
    "Selesai dibaca"
  );
}

function createUncompletedButton() {
  return createButtonAction(
    "green",
    function (event) {
      undoBookToUncompleted(event.target.parentElement.parentElement);
    },
    "Belum selesai dibaca"
  );
}

function createDeleteButton() {
  return createButtonAction(
    "red",
    function (event) {
      deleteBookList(event.target.parentElement.parentElement);
    },
    "Hapus buku"
  );
}

function searchBookList() {
  const searchBook = document.getElementById("searchBookTitle").value;

  const bookList = document.querySelectorAll(".book-item");
  for (book of bookList) {
    const textTitleBook = book.innerText.toLowerCase();
    const searchBookTitle = textTitleBook.search(searchBook.toLowerCase());

    if (searchBookTitle == -1) {
      book.style.display = "none";
    } else {
      book.style.display = "";
    }
  }
}

function addBookToCompleted(bookElement) {
  const bookListCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

  const bookTitle = bookElement.querySelector(".book-item > h3").innerText;
  const bookAuthor = bookElement.querySelector("span#author").innerText;
  const bookYear = bookElement.querySelector("span#year").innerText;

  const newBookList = makeBook(bookTitle, bookAuthor, bookYear, true);

  const book = findBook(bookElement[BOOK_ID]);
  book.isCompleted = true;
  newBookList[BOOK_ID] = book.id;

  bookListCompleted.append(newBookList);
  bookElement.remove();

  updateBookDataToStorage();
}

function undoBookToUncompleted(bookElement) {
  const bookListUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);

  const bookTitle = bookElement.querySelector(".book-item > h3").innerText;
  const bookAuthor = bookElement.querySelector("span#author").innerText;
  const bookYear = bookElement.querySelector("span#year").innerText;

  const newBookList = makeBook(bookTitle, bookAuthor, bookYear, false);

  const book = findBook(bookElement[BOOK_ID]);
  book.isCompleted = false;
  newBookList[BOOK_ID] = book.id;

  bookListUncompleted.append(newBookList);
  bookElement.remove();

  updateBookDataToStorage();
}

function deleteBookList(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ID]);
  const confirmDelete = confirm("Yakin dihapus?");
  if (confirmDelete === true) {
    books.splice(bookPosition, 1);
    bookElement.remove();
  }

  updateBookDataToStorage();
}

function refreshBookDataFromBooks() {
  const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  let completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);

  for (book of books) {
    const newBookList = makeBook(book.title, book.author, book.year, book.isCompleted);
    newBookList[BOOK_ID] = book.id;

    if (book.isCompleted) {
      completedBookList.append(newBookList);
    } else {
      uncompletedBookList.append(newBookList);
    }
  }
}
