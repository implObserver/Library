const bookshelf = document.querySelector('.books');
const bookPlace = document.querySelector('.book-place');
const popup = document.querySelector('.popup');
const form = document.querySelector('.create-book');
const aClosePopup = document.querySelector('.close-popup>a');
const myLibrary = window.localStorage.length > 0 ? JSON.parse(window.localStorage.getItem('library'))
    : [];
console.log(JSON.parse(window.localStorage.getItem('library')));
console.log(myLibrary)
console.log(window.localStorage.length)
console.log('....')
class Book {
    constructor(author, title, pages, status, readPages = 0) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.status = status;
        this.readPages = readPages;
    }
}

class BookNode {
    constructor(book) {
        this.authorKey = book.author;
        this.titleKey = book.title;
        this.lastReadPages = book.readPages;
        this.status = book.status;
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
        this.readPages.value = book.readPages;
        console.log(book.readPages);
        this.allPages.textContent = book.pages;
        this.author.textContent = book.author;
        this.title.textContent = book.title;
        this.label.className = 'unchecked';
        if (book.status) {
            this.label.className = 'checked';
            this.readPages.value = book.pages.replace('/', '');
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
            let book;
            if (this.label.className === 'unchecked') {
                this.label.className = 'checked';
                this.status = true;
                this.lastReadPages = this.readPages.value;
                this.readPages.value = parseInt(this.allPages.textContent.replace('/', ''));
                book = new Book(this.author.textContent, this.title.textContent, this.pages.textContent, this.status, this.lastReadPages);
            } else {
                this.status = false;
                this.label.className = 'unchecked';
                this.readPages.value = this.lastReadPages;
                book = new Book(this.author.textContent, this.title.textContent, this.pages.textContent, this.status, this.lastReadPages);
            }
            replaceBookToLibrary(book);
        });

        this.readPages.addEventListener('input', e => {
            let book = new Book(this.author.textContent, this.title.textContent, this.pages.textContent, this.status, this.readPages.value);
            replaceBookToLibrary(book);
        })

        this.trashWrapper.addEventListener('click', e => {
            if (confirm('Вы хотите удалить эту книгу?')) {
                let book = new Book(this.author.textContent, this.title.textContent, this.pages.textContent, this.status, this.lastReadPages);
                removeBookToLibrary(book);
                bookshelf.removeChild(this.book);
            }
        })
    }
}

if (window.localStorage.length > 0) {
    console.log(myLibrary)
    for (let JSONbook of myLibrary) {
        let book = JSON.parse(JSONbook);
        viewBook(book);
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

function addBookToLibrary(book) {
    let JSONbook = JSON.stringify(book);
    let isHave = false;

    for (let i = 0; i < myLibrary.length; i++) {
        let curBook = JSON.parse(myLibrary[i]);
        console.log(curBook.author);
        console.log(book.author);
        if (curBook.author === book.author && curBook.title === book.title) {
            alert('Эта книга уже есть в библиотеке');
            isHave = true;
        }
    }

    if (!isHave) {
        myLibrary.push(JSONbook);
        localStorage.setItem('library', JSON.stringify(myLibrary));
        viewBook(book);
    }
}

function replaceBookToLibrary(book) {

    for (let i = 0; i < myLibrary.length; i++) {
        let curBook = JSON.parse(myLibrary[i]);
        if (curBook.author === book.author) {
            if (curBook.title === book.title) {
                myLibrary[i] = JSON.stringify(book);
            }
        }
    }
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function removeBookToLibrary(book) {
    let JSONbook = JSON.stringify(book);
    myLibrary.splice(JSONbook, 1);
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function viewBook(book) {
    let bookNode = new BookNode(book);
    bookshelf.appendChild(bookNode.book);
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
    let book = new Book(author.value, title.value, `/${pages.value}`, status.checked);
    addBookToLibrary(book);
    closePopup();
})

bookPlace.addEventListener('click', e => {
    openPopup();
})

popup.addEventListener('click', e => {
    closePopup();
})

aClosePopup.addEventListener('click', e => {
    closePopup();
})

function closePopup() {
    popup.style.visibility = 'hidden';
    popup.style.opacity = 0;
}

function openPopup() {
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;
}