function Book(title, author, pages, status = 'Unread') {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.changeStatus = function () {
  if (this.status === 'Read') {
    this.status = 'Unread';
  } else {
    this.status = 'Read';
  }
};

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
    console.log(theKey);
    library[theKey] = element;
    console.log(element);
  });
  localStorage.setItem('books', JSON.stringify(library));
}

function addBookToLibrary() {
  const btitle = document.getElementById('btitle').value;
  const bauthor = document.getElementById('bauthor').value;
  const bpages = document.getElementById('bpages').value;
  const bstatus = document.getElementById('bstatus').value;
  const newBook = new Book(btitle, bauthor, bpages, bstatus);
  const theKey = `book-${Date.now()}`;
  const booksCopy = JSON.parse(localStorage.getItem('books'));
  booksCopy[theKey] = newBook;
  localStorage.setItem('books', JSON.stringify(booksCopy));
  console.log(localStorage.getItem('books'));
  window.location.reload();
}

function tableCreate() {
  const table = document.getElementById('myTable');
  let cnt = 1;
  const booksCopy = JSON.parse(localStorage.getItem('books'));
  for (const element in booksCopy) {
    const tr = document.createElement('tr');

    // Create number
    const number = document.createElement('th');
    number.setAttribute('scope', 'row');
    number.appendChild(document.createTextNode(cnt));

    // Create author
    const title = document.createElement('td');
    title.appendChild(document.createTextNode(booksCopy[element].title));

    // Create author
    const author = document.createElement('td');
    author.appendChild(document.createTextNode(booksCopy[element].author));

    // Create pages
    const pages = document.createElement('td');
    pages.appendChild(document.createTextNode(booksCopy[element].pages));

    // Create status
    const status = document.createElement('button');
    status.setAttribute('id', `status-${element}`);
    status.setAttribute('class', 'btn btn-warning');
    status.appendChild(document.createTextNode(booksCopy[element].status));

    // Create button
    const button = document.createElement('button');
    button.setAttribute('id', element);
    button.setAttribute('class', 'btn btn-danger myButton');
    button.appendChild(document.createTextNode('X'));

    // Append to row
    tr.appendChild(number);
    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(pages);
    tr.appendChild(status);
    tr.appendChild(button);

    table.appendChild(tr);

    // Event Listener for delete
    document.getElementById(element).addEventListener('click', () => {
      const deleteBook = JSON.parse(localStorage.getItem('books'));
      delete deleteBook[element];
      console.log(deleteBook);
      localStorage.setItem('books', JSON.stringify(deleteBook));
      window.location.reload();
    });

    // Event Listener for change status
    document
      .getElementById(`status-${element}`)
      .addEventListener('click', () => {
        updatedBook = new Book(
          booksCopy[element].title,
          booksCopy[element].author,
          booksCopy[element].pages,
          booksCopy[element].status,
        );
        // Lets use our prototype function
        updatedBook.changeStatus();
        // Here we pass a copy of the object back to the Local Storage
        // with the same ID (this is just an update)
        const updateBooks = JSON.parse(localStorage.getItem('books'));
        updateBooks[element] = updatedBook;
        localStorage.setItem('books', JSON.stringify(updateBooks));
        window.location.reload();
      });

    cnt += 1;
  }
}

tableCreate();
