"use strict";

// set html elements
var quoteContainer = document.getElementById('quote-container');
var quoteText = document.getElementById('quote');
var authorText = document.getElementById('author');
var twitterBtn = document.getElementById('twitter');
var newQuoteBtn = document.getElementById('new-quote'); //Instead of console log, start passing data to html elements

function getQuote() {
  var proxyUrl, apiUrl, response, data;
  return regeneratorRuntime.async(function getQuote$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 4 solution call a proxy API, then forismatic 
          proxyUrl = 'https://cors-anywhere.herokuapp.com/';
          apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'; //1 fetch uses CORPS policy (our local host trying to call API), by default that wil not work

          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch(proxyUrl + apiUrl));

        case 5:
          response = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          data = _context.sent;

          // 3 const for data, data is not set untill return response in json
          ////console.log(data);
          if (data.authorText === '') {
            authorText.innerText = 'Unknown'; //8 if author is blank, add unknown
          } else {
            authorText.innerText = data.authorText; //change into inner text from element id "author"
          } ////authorText.innerText = data.authorText; // 7 passing data, change text & assign data
          // 9 Reduce dynamically font size for long quotes < 120 characters


          if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote'); //look at its class in css
          } else {
            quoteText.classList.remove('long-quote');
          }

          quoteText.innerText = data.quoteText;
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](2);
          getQuote(); //6 special signs on some quotes, add another getQuote 
          ////console.log('whoops', error)

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 14]]);
} //10 tweet quote:when press, take our quote and author and allow us to tweet it


function tweetQuote() {
  var quote = quoteText.innerText;
  var author = authorText.innerText;
  var twitterUrl = "https://twitter.com/intent/tweet?text=".concat(quote, " - ").concat(author); // add query with ?text=`pass our quote`take whatever data is there and put in this string. "...} - ${..." space and another space 

  window.open(twitterUrl, '_blank'); // open in new window '_blank'
} //12 before test add button elements, anytime we click, they're goind to run their subsequent functions


twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote); //On Load

getQuote();