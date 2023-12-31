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

class Book {

    constructor(name, author, no_of_pages, status) {
        this.name = name;
        this.author = author;
        this.no_of_pages = no_of_pages;
        this.status = status;
    }

    addBookToLibrary(newBook) {
        myLibrary.push(newBook);
    }

    static emptyDisplay() {
        booksContainer.innerHTML = "";
    }
    
    static checkStatus(status) {
        if (status) {
            return "read";
        } else {
            return "not-read"
        }
    }
    
    static isRead(status) {
        if (status) {
            return "Read";
        } else {
            return "Not Read"
        }
    }
    
    static display() {
        Book.emptyDisplay(); 
        if (myLibrary.length == 0) {
            body.classList.add("js-centre");
        } else {
            body.classList.remove("js-centre")
        }
        myLibrary.forEach((newBook,index) => {
            booksContainer.innerHTML += `<div class="book-card">
            <div class="card1">
              <p>${newBook.no_of_pages} pages</p>
              <i class="fa-solid fa-trash delete-icon" data-key="${index}"></i>
            </div>
            <div class="card2">
              <h3>${newBook.name}</h3>
              <p>By ${newBook.author}</p>
            </div>
            <div class="card3">
              <p class="status-text">${Book.isRead(newBook.status)}</p>
              <i
                class="fa-solid fa-book-open-reader book-icon ${Book.checkStatus(newBook.status)}"
              ></i>
            </div>
          </div>`;
        })
        Book.setReadToggle();
        Book.setDeleteBtn();
    }
    
    static setReadToggle() {
        if (myLibrary.length > 0) {
    
            const gridCards3 = document.querySelectorAll(".card3");
            const statusBtns = document.querySelectorAll(".book-icon");
            const statusTextArr = document.querySelectorAll(".status-text")  
            gridCards3.forEach((card,index) => {
                card.addEventListener("click", () => {
                    if (statusBtns[index].classList.contains("read")) {
                        statusBtns[index].classList.remove("read");
                        statusBtns[index].classList.add("not-read");
                        statusTextArr[index].textContent = "Not Read"
                        myLibrary[index].status = false; 
                    } 
                    else {
                        statusBtns[index].classList.remove("not-read");
                        statusBtns[index].classList.add("read");
                        statusTextArr[index].textContent = "Read"
                        myLibrary[index].status = true;
                    }
                    
                })
            })
        }
    }
    
    static setDeleteBtn() {
        if (myLibrary.length > 0) {
            const deleteBtns = document.querySelectorAll(".delete-icon");
            deleteBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    myLibrary = myLibrary.filter((newBook,index) => {
                        return (index != btn.dataset.key);
                    })
                    Book.display();
                })
            })
            
        }
    }

    static reset() {
        bookName.value = "";
        bookAuthor.value = "";
        pageCount.value = "";
        readStatus.checked = false;
    }
    
}

addBtn.addEventListener("click", () => {
    dialog.showModal();
})

confirmBtn.addEventListener("click", (e) => {
    if (bookName.value && bookAuthor.value && pageCount.value) {
        e.preventDefault();
        const newBook = new Book(bookName.value, bookAuthor.value, pageCount.value, readStatus.checked);
        newBook.addBookToLibrary(newBook);
        Book.display();
        Book.reset();
        dialog.close();
    }
})

cancelBtn.addEventListener("click", () => {
    Book.reset();
    dialog.close();
})

