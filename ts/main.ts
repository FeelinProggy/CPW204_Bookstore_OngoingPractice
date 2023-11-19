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
function getBook():Book | null {
    // Get all inputs
    let isbnTextBox = document.querySelector("#isbn") as HTMLInputElement;
    let titleTextBox = document.querySelector("#title") as HTMLInputElement;
    let priceTextBox = document.querySelector("#price") as HTMLInputElement;
    let releaseDateTextBox = document.querySelector("#release-date") as HTMLInputElement;

    // Validate data
    let isValidData:boolean = true;

    // Validate ISBN
    let isbn:string = isbnTextBox.value;
    isValidIsbn13(isbn, isbnTextBox);

    // Validate title
    let title:string = titleTextBox.value;
    if (title.trim() == "") {
        isValidData = false;
        titleTextBox.nextElementSibling!.textContent = "Please enter a title."
    }
    else {        
        titleTextBox.nextElementSibling!.textContent = "";
    }

    // Validate price
    let price = parseFloat(priceTextBox.value);
    if (isNaN(price) || price < 0) {
        isValidData = false;
        priceTextBox.nextElementSibling!.textContent = "Price must be a positive value"
    }
    else {        
        priceTextBox.nextElementSibling!.textContent = "";
    }

    // Validate Date
    /**
     * In this code, we split the releaseDate string into an array of strings 
     * ['year', 'month', 'day'], and then we use map(Number) to convert each 
     * string to a number. We then use these numbers to create a new Date object.
     * This approach eliminates the need to use Date.parse and directly creates
     *  the Date object using the individual components of the date.
     */
    let [year, month, day] = releaseDateTextBox.value.split('-').map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        isValidData = false;
        releaseDateTextBox.nextElementSibling!.textContent = "Please enter a valid date."
    }
    else {        
        releaseDateTextBox.nextElementSibling!.textContent = "";
    }


    // Once all data has been validated...
    if (isValidData) {
        let addedBook = new Book();
        addedBook.isbn = isbn;
        addedBook.price = price;
        addedBook.title = title;
        addedBook.releaseDate = new Date(year, month - 1, day);
        //  Note that we subtract 1 from the month because the month argument in the
        //  Date constructor is zero-based (January is 0, February is 1, etc.).

        return addedBook;
    }
    else {
        return null;
    }

}

/**
 * Takes a valid Book object and adds it to the web page and to web storage.
 * @param b the Book object containing valid data to be added.
 */
function addBook(b:Book):void {
    console.log(b);

   /// Display the book to the web page
    let bookDiv:HTMLDivElement = document.createElement("div");

    let titleHeading = document.createElement("h2");
    titleHeading.textContent = `${b.title} : ${b.isbn}`;
    // Add h2 to book div <div><h2>Title : ISBN
    bookDiv.appendChild(titleHeading); 
    
    let bookInfo:HTMLParagraphElement = document.createElement("p");
    bookInfo.textContent = `Released Date: ${b.releaseDate?.toDateString()} | Price: $${b.price.toFixed(2)}`;
    bookDiv.appendChild(bookInfo);

    //Add bookDiv to web page
    let bookListDisplay = document.querySelector("#book-display");
    // Add newly created book 
    bookListDisplay?.appendChild(bookDiv); 
    // Alternate condensed version 
    // document.querySelector("#book-display")?.appendChild(bookDiv);

    //
    
}


/**
 * Validates the ISBN 13 number by length and algorithm,
 * returns true/false, and updates ISBN span messages accordingly.
 * Algorithm acquired from ChatGPT.
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