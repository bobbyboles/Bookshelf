
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