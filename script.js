const bookshelf = document.querySelector('.books');
const inputsReadPages = document.querySelectorAll('.pages-read');
const bookPlace = document.querySelector('.book-place');
const popup = document.querySelector('.popup');
const form = document.querySelector('.create-book');
const myLibrary = [];

class Book {
    constructor(author, title, pages, status) {
        this.numPages = pages;

        this.book = createElement('book');
        this.spine = createElement('spine');
        this.cover = createElement('cover');
        this.bookHeader = createElement('book-header');
        this.bookMiddle = createElement('book-middle');
        this.bookFooter = createElement('book-footer');
        this.bookMarkWrapper = createElement('bookmark-wrapper');
        this.label = document.createElement('label');
        this.author = createElement('author');
        this.title = createElement('title');
        this.trashWrapper = createElement('trash-wrapper');
        this.pages = createElement('pages');
        this.readPages = document.createElement('input');
        this.readPages.classList.add('pages-read');
        this.readPages.type = 'number';
        this.allPages = document.createElement('span');
        this.allPages.classList.add('all-pages');

        this.readPages.value = 0;

        this.allPages.textContent = `/${pages}`;
        this.author.textContent = author;
        this.title.textContent = title;
        this.label.className = 'unchecked';
        
        this.lastReadPages = '0';
        if (status) {
            this.label.className = 'checked';
            this.readPages.value = pages;
        }

        this.addBookStructure();
        this.addBookListeners();
    }

    addBookStructure() {
        appendChildrens(this.book, this.spine, this.cover);
        appendChildrens(this.cover, this.bookHeader, this.bookMiddle, this.bookFooter);
        appendChildrens(this.bookMiddle, this.author, this.title);
        appendChildrens(this.bookFooter, this.trashWrapper, this.pages);
        appendChildrens(this.pages, this.readPages, this.allPages);
        this.bookHeader.appendChild(this.bookMarkWrapper);
        this.bookMarkWrapper.appendChild(this.label);
    }

    addBookListeners() {
        this.label.addEventListener('click', e => {
            if (this.label.className === 'unchecked') {
                this.label.className = 'checked';
                this.lastReadPages = this.readPages.value;
                this.readPages.value = this.numPages;
            } else {
                this.label.className = 'unchecked';
                this.readPages.value = this.lastReadPages;
            }
        });
    }
}

function createElement(className, el = 'div') {
    const element = document.createElement(el);
    element.className = className;
    return element;
}

function appendChildrens(element, ...childrens) {
    for (let child of childrens) {
        element.appendChild(child);
    }
}

function addBookToLibrary(domBook) {
    myLibrary.push(domBook);
}

function viewBook(book) {
    bookshelf.appendChild(book.book);
}

form.addEventListener('click', e => {
    e.stopPropagation();
})

form.addEventListener('submit', e => {
    e.preventDefault();
    let author = document.querySelector('.book-author');
    let title = document.querySelector('.book-title');
    let pages = document.querySelector('.book-pages');
    let status = document.querySelector('.is-read');
    let book = new Book(author.value, title.value, pages.value, status.checked);
    addBookToLibrary(book);
    viewBook(book);
})

bookPlace.addEventListener('click', e => {
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;
})

popup.addEventListener('click', e => {
    popup.style.visibility = 'hidden';
    popup.style.opacity = 0;
})