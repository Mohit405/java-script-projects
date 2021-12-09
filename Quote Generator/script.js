//generating quotes using API
//Asynchronous function can run at anytime indepently and it cannot stop browser from running the code.

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
function newquotes() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) quoteAuthor.textContent = "Unknown";
  else quoteAuthor.textContent = quote.author;

  //check the quote length for text optimization for better screen interface.
  if (quote.text.length > 50) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");

  quoteText.textContent = quote.text;
  complete();
}
async function getQuotes() {
  loading();
  const apiurl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiurl);
    apiQuotes = await response.json();
    newquotes();
  } catch (error) {}
}
function tweetQuote() {
  const tweeturl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(tweeturl, "_blank");
}
newQuoteBtn.addEventListener("click", newquotes);
twitterBtn.addEventListener("click", tweetQuote);
getQuotes();
