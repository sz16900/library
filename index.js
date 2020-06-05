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

function addBookToLibrary() {
  let btitle = document.getElementById("btitle").value;
  let bauthor = document.getElementById("bauthor").value;
  let bpages = document.getElementById("bpages").value;
  let bstatus = document.getElementById("bstatus").value;

  newBook = new Book(btitle, bauthor, bpages, bstatus);

  theKey = Date.now();
  localStorage.setItem(`book-${theKey}`, JSON.stringify(newBook));

  window.location.reload();
}

function tableCreate() {
  let table = document.getElementById("myTable");
  let cnt = 1;
  Object.keys(localStorage).forEach(function (key) {
    let element = JSON.parse(localStorage.getItem(key));
    let tr = document.createElement("tr");

    // Create number
    let number = document.createElement("th");
    number.setAttribute("scope", "row");
    number.appendChild(document.createTextNode(cnt));

    // Create author
    let title = document.createElement("td");
    title.appendChild(document.createTextNode(element.title));

    // Create author
    let author = document.createElement("td");
    author.appendChild(document.createTextNode(element.author));

    // Create pages
    let pages = document.createElement("td");
    pages.appendChild(document.createTextNode(element.pages));

    // Create status
    let status = document.createElement("button");
    status.setAttribute("id", `status-${key}`);
    status.setAttribute("class", "btn btn-warning");
    status.appendChild(document.createTextNode(element.status));

    // Create button
    let button = document.createElement("button");
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
    document.getElementById(key).addEventListener("click", function () {
      localStorage.removeItem(key);
      window.location.reload();
    });

    // Event Listener for change status
    document
      .getElementById(`status-${key}`)
      .addEventListener("click", function () {
        updatedBook = new Book(
          element.title,
          element.author,
          element.pages,
          element.status
        );
        // Lets use our prototype function
        updatedBook.changeStatus();
        // Here we pass a copy of the object back to the Local Storage
        // with the same ID (this is just an update)
        localStorage.setItem(key, JSON.stringify(updatedBook));
        window.location.reload();
      });

    cnt += 1;
  });
}

tableCreate();
