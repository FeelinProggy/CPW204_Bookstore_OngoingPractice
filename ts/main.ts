/*
*Represents an individual book that can be purchased
*/
class Book {

    /**
     *Book's 13-digit ISBN
     */
    isbn!: string;
    
    /**
     * Title of the book
     */
    title! : string;
    
    /**
     *Retail price of the book 
     */
    price! : number;
    
    /**
     * The date the book was First published.
     * Date can also be an announced future release date.
     */
    releaseDate : Date | undefined;

}

// Book object test code
let myBook = new Book();
myBook.isbn = "1234567890123";


console.log(myBook) 
