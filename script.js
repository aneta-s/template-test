// set html elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');//Instead of console log, start passing data to html elements

async function getQuote(){
    // 4 solution call a proxy API, then forismatic 
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'; //1 fetch uses CORPS policy (our local host trying to call API), by default that wil not work
try{
    const response = await fetch(proxyUrl + apiUrl);// 2 set resp as a const equal awaiting, resp is not set until fetch finished //5 combine both urls
const data = await response.json();// 3 const for data, data is not set untill return response in json
////console.log(data);
if (data.authorText === '') {
    authorText.innerText = 'Unknown'//8 if author is blank, add unknown
} else {
    authorText.innerText = data.authorText; //change into inner text from element id "author"
}
////authorText.innerText = data.authorText; // 7 passing data, change text & assign data
// 9 Reduce dynamically font size for long quotes < 120 characters
if (data.quoteText.length > 120) {
    quoteText.classList.add('long-quote');//look at its class in css

} else {
    quoteText.classList.remove('long-quote');
}
quoteText.innerText = data.quoteText;

} catch (error){
    getQuote(); //6 special signs on some quotes, add another getQuote 
////console.log('whoops', error)
}
}
//10 tweet quote:when press, take our quote and author and allow us to tweet it
function tweetQuote () {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`; // add query with ?text=`pass our quote`take whatever data is there and put in this string. "...} - ${..." space and another space 
    window.open(twitterUrl, '_blank');// open in new window '_blank'

}
//12 before test add button elements, anytime we click, they're goind to run their subsequent functions
twitterBtn.addEventListener('click', tweetQuote); 
newQuoteBtn.addEventListener('click', getQuote);
//On Load
getQuote();
