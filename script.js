const bookshelf = document.querySelector('.books');
const inputsReadPages = document.querySelectorAll('.pages-read');
const myDomLibrary = new Array();
const myLibrary = [];

function Book(author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
}

let book1 = new Book('I.Efremov', 'Since fantastic', 304, true);
let book2 = new Book('A.Uriev', 'My strange chess', 5, false);
let book3 = new Book('Anonimus', 'Anonimus', 123, false);

myLibrary.push(book1, book2, book3);

class DomBook {
    constructor() {
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
        this.readPages.value = '0';
        this.readPages.type = 'text';
        this.allPages = document.createElement('span');
        this.allPages.classList.add('all-pages');

        this.addBookStructure();
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

function addBookToLibrary() {
    for (let book of myLibrary) {
        const domBook = new DomBook();
        domBook.allPages.textContent = book.pages;
        domBook.author.textContent = book.author;
        domBook.title.textContent = book.title;
        domBook.label.className = book.status ? 'checked'
            : 'unchecked';
        domBook.lastReadPages = '0/';
        
        if (book.status) {
            domBook.readPages.value = book.pages;
        }

        domBook.readPages.value += `/`;

        bookshelf.appendChild(domBook.book);
        myDomLibrary.push(domBook);
    }
}

addBookToLibrary();

const books = document.querySelectorAll('.book');

for (let domBook of myDomLibrary) {

    domBook.label.addEventListener('click', e => {
        if (domBook.label.className === 'unchecked') {
            domBook.label.className = 'checked';
            domBook.lastReadPages = domBook.readPages.value;
            domBook.readPages.value = `${domBook.allPages.textContent}/`;
        } else {
            domBook.label.className = 'unchecked';
            domBook.readPages.value = domBook.lastReadPages;
        }
    });

    domBook.trashWrapper.addEventListener('click', e => {
        domBook.trashWrapper.style.backgroundColor = 'red';
    })
}