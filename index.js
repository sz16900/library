function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// Initialize the Library object
if (localStorage.getItem('books') === null) {
  const library = {};

  // Popuate the library
  const theHobbit = new Book('The Hobbit', 'J.R.R.Tolkien', 295, 'Read');
  const theLord = new Book(
    'The Lord of the Rings',
    'J.R.R.Tolkien',
    898,
    'Unread',
  );
  const ulysses = new Book('Ulysses', 'James Joyce', 795, 'Read');
  const bookArray = [theHobbit, theLord, ulysses];
  bookArray.forEach((element) => {
    const theKey = `book-${Date.now()}`;
    library[theKey] = element;
  });
  localStorage.setItem('books', JSON.stringify(library));
}

// WE DISABLE THIS FUNCTIONS ESLINT DUE TO UNUSED FUNCTION ERROR,
// HOWEVER, WE ARE CALLING THIS FUNCTION IN THE index.html

/* eslint-disable */
const addBookToLibrary = () => {
  const btitle = document.getElementById("btitle").value;
  const bauthor = document.getElementById("bauthor").value;
  const bpages = document.getElementById("bpages").value;
  const bstatus = document.getElementById("bstatus").value;
  const newBook = new Book(btitle, bauthor, bpages, bstatus);
  const theKey = `book-${Date.now()}`;
  const booksCopy = JSON.parse(localStorage.getItem("books"));
  booksCopy[theKey] = newBook;
  localStorage.setItem("books", JSON.stringify(booksCopy));
  window.location.reload();
};
/* eslint-enable */

function tableCreate() {
  const table = document.getElementById('myTable');
  let cnt = 1;
  const booksCopy = JSON.parse(localStorage.getItem('books'));
  /* eslint-disable */
  for (const [key, value] of Object.entries(booksCopy)) {
    const tr = document.createElement("tr");

    // Create number
    const number = document.createElement("th");
    number.setAttribute("scope", "row");
    number.appendChild(document.createTextNode(cnt));

    // Create author
    const title = document.createElement("td");
    title.appendChild(document.createTextNode(value.title));

    // Create author
    const author = document.createElement("td");
    author.appendChild(document.createTextNode(value.author));

    // Create pages
    const pages = document.createElement("td");
    pages.appendChild(document.createTextNode(value.pages));

    // Create status
    const status = document.createElement("button");
    status.setAttribute("id", `status-${key}`);
    status.setAttribute("class", "btn btn-warning");
    status.appendChild(document.createTextNode(value.status));

    // Create button
    const button = document.createElement("button");
    button.setAttribute("id", key);
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
    document.getElementById(key).addEventListener("click", () => {
      const deleteBook = JSON.parse(localStorage.getItem("books"));
      delete deleteBook[key];
      localStorage.setItem("books", JSON.stringify(deleteBook));
      window.location.reload();
    });

    // Event Listener for change status
    document.getElementById(`status-${key}`).addEventListener("click", () => {
      if (value.status === "Read") {
        value.status = "Unread";
      } else {
        value.status = "Read";
      }
      // Here we pass a copy of the object back to the Local Storage
      // with the same ID (this is just an update)
      const updateBooks = JSON.parse(localStorage.getItem("books"));
      updateBooks[key] = value;

      localStorage.setItem("books", JSON.stringify(updateBooks));
      window.location.reload();
    });

    cnt += 1;
  }
  /* eslint-enable */
}

tableCreate();
