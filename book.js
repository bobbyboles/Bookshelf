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