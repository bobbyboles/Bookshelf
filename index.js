//declarations
let bookShelf = new BookShelf();

let numOfFavorites = document.querySelector(".numFavorites");
let searchBar = document.querySelector("#searchBar");
let selector = document.querySelector("select");

//seeding data in bookshelf class and book classes
bookShelf.seedBooks(bookData);

//favorite counter workaround, able to call bookshelf function in book class
const favoriteCounter = () => {
  bookShelf.favoriteNum();
};

//listen on search bar and sort
searchBar.addEventListener("input", () => {
  var userInput = searchBar.value.toLowerCase();
  bookShelf.sortSearch(userInput);
});

//listen on drop down and sort
selector.addEventListener("change", () => {
  if (selector.value == "Author (A-Z)") {
    bookShelf.sortAuthorAZ();
  }
  if (selector.value == "Author (Z-A)") {
    bookShelf.sortAuthorZA();
  }
  if (selector.value == "Title (A-Z)") {
    bookShelf.sortTitleAZ();
  }
  if (selector.value == "Title (Z-A)") {
    bookShelf.sortTitleZA();
  }
  if (selector.value == "Favorites") {
    bookShelf.sortFavorites();
  }
  if (selector.value == "Number of Subjects (Least to Most)") {
    bookShelf.sortNumSubjectsAZ();
  }
  if (selector.value == "Number of Subjects (Most to Least)") {
    bookShelf.sortNumSubjectsZA();
  }
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const author = document.querySelector("#authorAdd").value;
  const title = document.querySelector("#titleAdd").value;
  const language = document.querySelector("#languageAdd").value;
  const subjects = document.querySelector("#subjectsAdd").value.split(' ')
  const bookInstance = new Book(author, language, subjects, title)
  bookShelf.addBooks(bookInstance)
  bookShelf.render()
  form.reset()
});

//final render
bookShelf.render();

