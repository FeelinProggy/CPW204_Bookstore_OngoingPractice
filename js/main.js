"use strict";
class Book {
}
window.onload = function () {
    let submitBookBtn = document.querySelector("#submit-book");
    submitBookBtn.onclick = processBook;
};
function processBook() {
    let userBook = getBook();
    if (userBook != null) {
        addBook(userBook);
    }
}
function getBook() {
    let isbnTextBox = document.querySelector("#isbn");
    let titleTextBox = document.querySelector("#title");
    let priceTextBox = document.querySelector("#price");
    let releaseDateTextBox = document.querySelector("#release-date");
    let isValidData = true;
    let isbn = isbnTextBox.value;
    isValidIsbn13(isbn, isbnTextBox);
}
function addBook(b) {
}
function isValidIsbn13(isbn, isbnTB) {
    let isbnRegex = /^\d{13}$/;
    if (!isbnRegex.test(isbn)) {
        isbnTB.nextElementSibling.textContent = "ISBN must be 13 digits only.";
        return false;
    }
    let sum = 0;
    for (let i = 0; i < 12; i++) {
        const digit = parseInt(isbn[i]);
        const weight = i % 2 === 0 ? 1 : 3;
        sum += digit * weight;
    }
    const checkDigit = 10 - (sum % 10);
    const calculatedCheckDigit = checkDigit === 10 ? 0 : checkDigit;
    if (calculatedCheckDigit !== parseInt(isbn[12])) {
        isbnTB.nextElementSibling.textContent = "Please enter a valid ISBN-13";
        return false;
    }
    isbnTB.nextElementSibling.textContent = "";
    return true;
}
