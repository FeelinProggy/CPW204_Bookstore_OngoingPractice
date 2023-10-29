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

window.onload = function() {
    let submitBookBtn = document.querySelector("#submit-book") as HTMLButtonElement;
    submitBookBtn.onclick = processBook;
}


/**
 * Onclick function that will send user data for validation 
 * to be added to we storage.
 */
function processBook() {
    
    let userBook = getBook();
    if (userBook != null) {
        addBook(userBook);

    }
}


/**
 * This function will retrieve all the book data from the
 *  form on the HTML page. If all data is valid a Book 
 * object will br returned. If any data is invalid, null 
 * will be returned and will update error messages in the 
 * spans on the webpage.
 */
function getBook():Book {
    //Get all inputs
    let isbnTextBox = document.querySelector("#isbn") as HTMLInputElement;
    let titleTextBox = document.querySelector("#title") as HTMLInputElement;
    let priceTextBox = document.querySelector("#price") as HTMLInputElement;
    let releaseDateTextBox = document.querySelector("#release-date") as HTMLInputElement;

    // Validate date
    let isValidData:boolean = true;

    // Validate ISBN
    let isbn:string = isbnTextBox.value;
    isValidIsbn13(isbn, isbnTextBox);
}

/**
 * Takes a valid Book object an adds it to web storage.
 * @param b the Book object containing valid data to be added.
 */
function addBook(b:Book):void {

}


/**
 * Validates the ISBN 13 number by length and algorithm,
 * returns true/false, and updates ISBN span messages accordingly
 * @param isbn , isbnTextBox element
 * @returns 
 */
function isValidIsbn13(isbn:string, isbnTB:HTMLInputElement):boolean {
    // Check if ISBN is a 13-digit number
    let isbnRegex = /^\d{13}$/;
    if (!isbnRegex.test(isbn)) {
        isbnTB.nextElementSibling!.textContent = "ISBN must be 13 digits only.";
        return false;
    }

    // Calculate the check digit using ISBN-13 check digit algorithm
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        const digit = parseInt(isbn[i]);
        const weight = i % 2 === 0 ? 1 : 3;
        sum += digit * weight;
    }
    const checkDigit = 10 - (sum % 10);
    const calculatedCheckDigit = checkDigit === 10 ? 0 : checkDigit;

    // Compare the calculated check digit with the last digit of the ISBN
    if (calculatedCheckDigit !== parseInt(isbn[12])) {
        isbnTB.nextElementSibling!.textContent = "Please enter a valid ISBN-13";
        return false;
    }

    
    isbnTB.nextElementSibling!.textContent = "";
    return true;
}
