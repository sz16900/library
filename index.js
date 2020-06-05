function Book(title, author, pages, status = "Unread") {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

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
  Object.keys(localStorage).forEach(function (key) {
    let element = JSON.parse(localStorage.getItem(key));
    let tr = document.createElement("tr");
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
    let status = document.createElement("td");
    status.appendChild(document.createTextNode(element.status));

    // Create button
    let button = document.createElement("button");
    button.setAttribute("id", key);
    button.appendChild(document.createTextNode("Remove me"));

    // Append to row
    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(pages);
    tr.appendChild(status);
    tr.appendChild(button);

    table.appendChild(tr);
    document.getElementById(key).addEventListener("click", function () {
      localStorage.removeItem(key);
      window.location.reload();
    });
  });
}

tableCreate();
