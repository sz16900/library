for (let index = 0; index < localStorage.length; index++) {
  var element = JSON.parse(localStorage.getItem(`book-${index}`));
  document.write("<p>" + element.title + "</p>");
}

function Book(title, author, num_pages, read = "Unread") {
  this.title = title;
  this.author = author;
  this.num_pages = num_pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title}, by ${this.author}, ${this.num_pages} pages, read status: ${this.read}`;
};

function addBookToLibrary() {
  let btitle = document.getElementById("btitle").value;
  let bauthor = document.getElementById("bauthor").value;
  let bpages = document.getElementById("bpages").value;
  let bstatus = document.getElementById("bstatus").value;

  newBook = new Book(btitle, bauthor, bpages, bstatus);
  theKey = localStorage.length;
  localStorage.setItem(`book-${theKey}`, JSON.stringify(newBook));
}
