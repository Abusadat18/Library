/* 1) Ek book store krne ka array chayiee.
2) Book ka sara details add krne ka constructor
3) new book ko array me dalna  
4) Print krna
 */
let myLibrary = [];
const body = document.querySelector("body");
const dialog = document.querySelector(".dialogBox");
const addBtn = document.querySelector(".addBook");
const cancelBtn = document.querySelector(".cancelBtn");
const confirmBtn = document.querySelector(".confirmBtn")

const booksContainer = document.querySelector(".books-container");

/* FORM INPUTS */
const bookName = document.getElementById("name");
const bookAuthor = document.getElementById("author");
const pageCount = document.getElementById("no_of_pages");
let readStatus = document.querySelector('input[type="checkbox"]');

function Book(name, author, no_of_pages, status) {
    this.name = name;
    this.author = author;
    this.no_of_pages = no_of_pages;
    this.status = status;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function emptyDisplay() {
    booksContainer.innerHTML = "";
}

function checkStatus(status) {
    if (status) {
        return "read";
    } else {
        return "not-read"
    }
}

function display() {
    emptyDisplay(); 
    if (myLibrary.length == 0) {
        body.classList.add("js-centre");
    } else {
        body.classList.remove("js-centre")
    }
    myLibrary.forEach((newBook,index) => {
        booksContainer.innerHTML += `<div class="book-card">
        <div class="card-grid1">
          <h3>${newBook.name}</h3>
          <p>${newBook.author}</p>
        </div>
        <div class="card-grid2">
          <p>${newBook.no_of_pages} pages</p>
          <i class="fa-solid fa-book-open-reader book-icon ${checkStatus(newBook.status)}"></i>
          <i class="fa-solid fa-trash delete-icon" data-key="${index}"></i>
        </div>
      </div>`;
    })
    setReadToggle();
    setDeleteBtn();
}

function setReadToggle() {
    if (myLibrary.length > 0) {
        const statusBtns = document.querySelectorAll(".book-icon");
        statusBtns.forEach((btn,index) => {
            btn.addEventListener("click", () => {
                if (btn.classList.contains("read")) {
                    btn.classList.remove("read");
                    btn.classList.add("not-read");
                    myLibrary[index].status = false; 
                } 
                else {
                    btn.classList.remove("not-read");
                    btn.classList.add("read");
                    myLibrary[index].status = true;
                }
            })
        })
    }
}

function setDeleteBtn() {
    if (myLibrary.length > 0) {
        const deleteBtns = document.querySelectorAll(".delete-icon");
        deleteBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                myLibrary = myLibrary.filter((newBook,index) => {
                    return (index != btn.dataset.key);
                })
                display();
            })
        })
        
    }
}

addBtn.addEventListener("click", () => {
    dialog.showModal();
})

confirmBtn.addEventListener("click", (e) => {
    if (bookName.value && bookAuthor.value && pageCount.value) {
        e.preventDefault();
        const newBook = new Book(bookName.value, bookAuthor.value, pageCount.value, readStatus.checked);
        addBookToLibrary(newBook);
        display();
        reset();
        dialog.close();
    }
})

cancelBtn.addEventListener("click", () => {
    dialog.close();
})

function reset() {
    bookName.value = "";
    bookAuthor.value = "";
    pageCount.value = "";
    readStatus.checked = false;
}





