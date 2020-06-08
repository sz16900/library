function Book(title, author, pages, status = "Unread") {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.changeStatus = function () {
  if (this.status == "Read") {
    this.status = "Unread";
  } else {
    this.status = "Read";
  }
};

// Initialize the Library object
let library = {};

// Popuate the library
const theHobbit = new Book("The Hobbit", "J.R.R.Tolkien", 295, true);
const theLord = new Book("The Lord of the Rings", "J.R.R.Tolkien", 898, true);
const ulysses = new Book("Ulysses", "James Joyce", 795, true);
let bookArray = [theHobbit, theLord, ulysses];
bookArray.forEach((element) => {
  let theKey = "book-" + Date.now();
  console.log(theKey);
  library[theKey] = element;
  console.log(element);
});

// add the library to localStorage
if (localStorage.getItem("books") == null) {
  localStorage.setItem("books", JSON.stringify(library));
}

function addBookToLibrary() {
  let btitle = document.getElementById("btitle").value;
  let bauthor = document.getElementById("bauthor").value;
  let bpages = document.getElementById("bpages").value;
  let bstatus = document.getElementById("bstatus").value;
  let newBook = new Book(btitle, bauthor, bpages, bstatus);
  let theKey = "book-" + Date.now();
  let booksCopy = JSON.parse(localStorage.getItem("books"));
  booksCopy[theKey] = newBook;
  localStorage.setItem("books", JSON.stringify(booksCopy));
  console.log(localStorage.getItem("books"));
  window.location.reload();
}

function tableCreate() {
  const table = document.getElementById("myTable");
  let cnt = 1;
  let booksCopy = JSON.parse(localStorage.getItem("books"));
  for (const element in booksCopy) {
    let tr = document.createElement("tr");

    // Create number
    let number = document.createElement("th");
    number.setAttribute("scope", "row");
    number.appendChild(document.createTextNode(cnt));

    // Create author
    let title = document.createElement("td");
    title.appendChild(document.createTextNode(booksCopy[element].title));

    // Create author
    let author = document.createElement("td");
    author.appendChild(document.createTextNode(booksCopy[element].author));

    // Create pages
    let pages = document.createElement("td");
    pages.appendChild(document.createTextNode(booksCopy[element].pages));

    // Create status
    let status = document.createElement("button");
    status.setAttribute("id", `status-${element}`);
    status.setAttribute("class", "btn btn-warning");
    status.appendChild(document.createTextNode(booksCopy[element].status));

    // Create button
    let button = document.createElement("button");
    button.setAttribute("id", element);
    button.setAttribute("class", "btn btn-danger myButton");
    button.appendChild(document.createTextNode("X"));

    // Append to row
    tr.appendChild(number);
    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(pages);
    tr.appendChild(status);
    tr.appendChild(button);

    table.appendChild(tr);

    // Event Listener for delete
    document.getElementById(element).addEventListener("click", function () {
      delete booksCopy.element;
      window.location.reload();
    });

    // Event Listener for change status
    document
      .getElementById(`status-${element}`)
      .addEventListener("click", function () {
        updatedBook = new Book(
          booksCopy[element].title,
          booksCopy[element].author,
          booksCopy[element].pages,
          booksCopy[element].status
        );
        // Lets use our prototype function
        updatedBook.changeStatus();
        // Here we pass a copy of the object back to the Local Storage
        // with the same ID (this is just an update)
        booksCopy.element = updatedBook;
        window.location.reload();
      });

    cnt += 1;
  }
}

tableCreate();
