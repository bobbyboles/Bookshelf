//book class matching data set and adding favorite tag
class Book {
  constructor(author, language, subject, title) {
    this.author = author;
    this.language = language;
    this.subject = subject;
    this.title = title;
    this.favorite = false;
    this.comments = [];
    this.commenting = false
  }

  render() {
    //declarations
    let bookWrapper = document.createElement("section");
    let authorContent = document.createElement("h3");
    let languageContent = document.createElement("h3");
    let subjectWrapper = document.createElement("h3");
    let titleContent = document.createElement("h1");
    let commentContent = document.createElement('div')
    let commentInput = document.createElement('input')
    let favButton = document.createElement("button");
    let commentButton = document.createElement("button");
    let image = document.createElement("img");
    let subjectContent = document.createElement("article");
    let buttonWrapper = document.createElement("article");
    let imageWrapper = document.createElement("article");
    let commentWrapper = document.createElement('form')

    //class for css
    subjectWrapper.classList.add("subjects");
    buttonWrapper.classList.add("favoriteWrapper");
    image.classList.add("startImg");
    imageWrapper.classList.add("imageWrapper");
    commentContent.classList.add('commentText');
    commentWrapper.classList.add('commentWrapper');

    //content
    authorContent.textContent = `Author: ${this.author}`;
    languageContent.textContent = `Language: ${this.language}`;
    titleContent.textContent = `${this.title}`;
    subjectWrapper.textContent = "Subjects ";
    favButton.textContent = "Favorite";
    commentButton.textContent = 'Comment';

    this.comments.map((comment)=>{
      let commentContents = document.createElement('p')
      commentContents.textContent = comment
      commentContent.append(commentContents)
    })

    commentInput.setAttribute('type', 'text');
    commentInput.value ='Comment'

    image.src = "star.png";

    //keep favorite css visibility on re-render
    if (this.favorite) {
      image.style.display = "block";
    }

    //create, append subject content
    this.subject.map((subjects) => {
      let subjectContents = document.createElement("p");
      subjectContents.innerHTML = subjects;
      subjectContent.append(subjectContents);
    });

    commentButton.addEventListener('click',(e)=>{
      if(commentWrapper.style.display !== 'block'){
        commentWrapper.style.display = 'block'
        this.commenting = true
      } else{
        commentWrapper.style.display = 'none'
        this.commenting = false
      }
    })

    if(this.commenting){
      commentWrapper.style.display = 'block';
    }

    commentWrapper.addEventListener('submit',(e)=>{
      e.preventDefault()
      console.log('check')
      this.comments.push(commentInput.value)
      console.log(this.comments)
      bookShelf.render()
    })

    //listener on favorite button for css visibility and counting functionality
    favButton.addEventListener("click", (e) => {
      if (!this.favorite) {
        image.style.display = "block";
        this.favorite = true;
        favoriteCounter();
      } else {
        image.style.display = "none";
        this.favorite = false;
        favoriteCounter();
      }
    });

    //appending for book render
    imageWrapper.append(image);
    buttonWrapper.append(imageWrapper, favButton, commentButton);
    commentWrapper.append(commentInput,commentContent)

    bookWrapper.append(
      titleContent,
      authorContent,
      languageContent,
      subjectWrapper,
      subjectContent,
      commentWrapper,
      buttonWrapper 
    );

    //book class render
    return bookWrapper;
  }
}

//vis array used for all sorting and filtering functions
class BookShelf {
  constructor() {
    this.bookShelfArr = [];
    this.visArr = [];
  }

  //add books to bookshelf
  addBooks(book) {
    this.bookShelfArr.push(book);
  }

  //create book class for each book, add to bookshelf class
  seedBooks(data) {
    data.map((book) => {
      let bookInstance = new Book(
        book.author,
        book.language,
        book.subject,
        book.title,
        book.favorite
      );
      this.addBooks(bookInstance);
    });
  }

  //sort functions as defined
  sortAuthorAZ() {
    this.visArr = this.bookShelfArr.sort((a, b) =>
      a.author[0] < b.author[0] ? -1 : a.author[0] > b.author[0] ? 1 : 0
    );
    this.render();
  }

  sortAuthorZA() {
    this.visArr = this.bookShelfArr.sort((a, b) =>
      a.author[0] < b.author[0] ? 1 : a.author[0] > b.author[0] ? -1 : 0
    );
    this.render();
  }

  sortTitleAZ() {
    this.visArr = this.bookShelfArr.sort((a, b) =>
      a.title < b.title ? -1 : a.title > b.title ? 1 : 0
    );
    this.render();
  }

  sortTitleZA() {
    this.visArr = this.bookShelfArr.sort((a, b) =>
      a.title < b.title ? 1 : a.title > b.title ? -1 : 0
    );
    this.render();
  }

  sortNumSubjectsAZ() {
    this.visArr = this.bookShelfArr.sort(
      (a, b) => a.subject.length - b.subject.length
    );
    this.render();
  }

  sortNumSubjectsZA() {
    this.visArr = this.bookShelfArr.sort(
      (a, b) => b.subject.length - a.subject.length
    );
    this.render();
  }

  sortFavorites() {
    this.visArr = this.bookShelfArr.filter((a) => (a.favorite ? true : false));
    this.render();
  }

  sortSearch(userInput) {
    this.visArr = this.bookShelfArr.filter((book) => {
      return (
        book.title.toLowerCase().includes(userInput) ||
        book.author[0].toLowerCase().includes(userInput)
      );
    });
    this.render();
  }

  //favorite book counter (needs work, not happy with how this was implemented, but it 'works') see: L209
  favoriteNum() {
    this.bookShelfArr.reduce((acc, x) => {
      if (x.favorite) {
        acc = acc + 1;
      }
      numOfFavorites.textContent = acc;
      return acc;
    }, 0);
  }

  render() {
    //declarations
    let main = document.querySelector("main");
    let body = document.querySelector("body");
    let bookShelfWrapper = document.createElement("ul");

    //clearing render
    main.innerHTML = "";

    //using visArr if it has data from sorts or filters if not using bookShelfArr
    this.visArr.length > 1
      ? this.visArr.map((book) => bookShelfWrapper.append(book.render()))
      : this.bookShelfArr.map((book) => bookShelfWrapper.append(book.render()));


    //appending
    main.append(bookShelfWrapper);

    //bookshelf render
    body.append(main);
  }
}

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

