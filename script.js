async function getQuote(){
const resp = await fetch('http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json')
const data = await resp.json();
console.log(data);
}
getQuote();