document.addEventListener('DOMContentLoaded', function() {
    const submitFormBook = document.getElementById('inputNewBook');
    const submitFormSearch = document.getElementById('searchBook');
    const checkCompletedRead = document.getElementById('inputBookIsComplete');

    checkCompletedRead.addEventListener('click', function() {
        checkCompleted();
    });

    submitFormBook.addEventListener('submit',function(event) {
        event.preventDefault();
        addBook();
    });

    submitFormSearch.addEventListener('submit', function(event) {
       event.preventDefault();
       searchBookList();
    });

    if (isStorageExist()) {
        loadBookDataFromStorage();
    }
});

document.addEventListener('onbookdatasaved', function() {
   console.log('Data berhasil disimpan'); 
});

document.addEventListener('onbookdataloaded', function() {
   refreshBookDataFromBooks(); 
});