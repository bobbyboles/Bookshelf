class Book {
  constructor(author, language, subject, title) {
    this.author = author;
    this.language = language;
    this.subject = subject;
    this.title = title;
    this.favorite = false;
  }       

  render() {
    let bookWrapper = document.createElement("section");

    let authorContent = document.createElement("h3");
    authorContent.textContent = `Author: ${this.author}`;

    let languageContent = document.createElement("h3");
    languageContent.textContent = `Language: ${this.language}`;

    let subjectWrapper = document.createElement("h3");
    subjectWrapper.classList.add("subjects");
    subjectWrapper.textContent = "Subjects ";

    let subjectContent = document.createElement("article");

    this.subject.map((subjects) => {
      let subjectContents = document.createElement("p");
      subjectContents.innerHTML = subjects;
      subjectContent.append(subjectContents);
    });

    let titleContent = document.createElement("h1");
    titleContent.textContent = `${this.title}`;

    let button = document.createElement("button");
    button.textContent = "Favorite";

    let image = document.createElement("img");
    image.classList.add("startImg");
    image.src = "star.png";

    if (this.favorite) {
      image.style.display = "block";
    }

    let favoriteWrapper = document.createElement("article");
    favoriteWrapper.classList.add("favoriteWrapper");

    let imageWrapper = document.createElement("article");
    imageWrapper.classList.add("imageWrapper");

    imageWrapper.append(image);
    favoriteWrapper.append(imageWrapper, button);

    button.addEventListener("click", (e) => {
      if (!this.favorite) {
        image.style.display = "block";
        this.favorite = true;
      } else {
        image.style.display = "none";
        this.favorite = false;
      }
    });

    bookWrapper.append(
      titleContent,
      authorContent,
      languageContent,
      subjectWrapper,
      subjectContent,
      favoriteWrapper
    );

    return bookWrapper;
  }
}

class BookShelf {
  constructor() {
    this.bookShelfArr = [];
    this.visArr = [];
  }

  addBooks(book) {
    this.bookShelfArr.push(book);
  }

  render() {
    let main = document.querySelector("main");

    main.innerHTML = "";

    let body = document.querySelector("body");

    let bookShelfWrapper = document.createElement("ul");

    this.bookShelfArr.map((book) => {
      bookShelfWrapper.append(book.render());
    });

    main.append(bookShelfWrapper);

    body.append(main);
  }
}

let bookShelf = new BookShelf();

bookData.map((book) => {
  let bookInstance = new Book(
    book.author,
    book.language,
    book.subject,
    book.title,
    book.favorite
  );
  bookShelf.addBooks(bookInstance);
});

let numOfFavorites = document.querySelector(".numFavorites");
let buttonOfFavorites = document.querySelector(".favoriteButton");

buttonOfFavorites.addEventListener("click", () => {
  bookShelf.bookShelfArr.reduce((acc, x) => {
    if (x.favorite) {
      acc = acc + 1;
    }
    numOfFavorites.textContent = acc;
    return acc;
  }, 0);
});

let selector = document.querySelector("select");
selector.addEventListener("change", () => {
  if (selector.value == "Author (A-Z)") {
    bookShelf.bookShelfArr.sort((a, b) => {
      const nameA = a.author[0];
      const nameB = b.author[0];
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    bookShelf.render();
  }
  if (selector.value == "Title (A-Z)") {
    bookShelf.bookShelfArr.sort((a, b) => {
      const nameA = a.title;
      const nameB = b.title;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    bookShelf.render();
  }
  if (selector.value == "Favorites") {
    let bookShelfFilter = bookShelf.bookShelfArr.filter((a) => {
      if (a.favorite) {
        return true;
      }
      return false;
    });
    let bookShelfFiltered = new BookShelf();
    bookShelfFilter.forEach((book) => {
      let instanceOfBook = new Book(
        book.author,
        book.language,
        book.subject,
        book.title,
        book.favorite
      );
      instanceOfBook.favorite = true;
      bookShelfFiltered.addBooks(instanceOfBook);
    });
    console.log(bookShelfFiltered);
    bookShelfFiltered.render();
  }
  if (selector.value == "Number of Subjects (Least to Most)") {
    bookShelf.bookShelfArr.sort((a, b) => a.subject.length - b.subject.length);
    bookShelf.render();
  }
  if (selector.value == "Number of Subjects (Most to Least)") {
    bookShelf.bookShelfArr.sort((a, b) => b.subject.length - a.subject.length);
    bookShelf.render();
  }
});

bookShelf.render();
