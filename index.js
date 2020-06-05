let myLibrary = [];

function Book(title, author, num_pages, read = false) {
  this.title = title;
  this.author = author;
  this.num_pages = num_pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title}, by ${this.author}, ${this.num_pages} pages, read status: ${this.read}`;
};

function addBookToLibrary(myLibrary, createdBook) {
  myLibrary.push(createdBook);
}

theHobbit = new Book("The Hobbit", "J.R.R.Tolkien", 295, true);
robinHood = new Book(
  "The Merry Adventures of Robin Hood",
  "Howard Pyle",
  295,
  false
);
addBookToLibrary(myLibrary, theHobbit);
addBookToLibrary(myLibrary, robinHood);

myLibrary.forEach((element) => document.write("<p>" + element.info() + "</p>"));
