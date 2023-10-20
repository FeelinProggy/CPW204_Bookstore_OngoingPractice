/*
*Represents an individual book that can be purchased
*/
class Book {
    isbn!: string;
    title! : string;
    price! : number;
    releaseDate : Date | undefined;

}

// Book object test code
let myBook = new Book();
myBook.isbn = "1234567890123";


console.log(myBook) 
