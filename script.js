const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorName = document.getElementById('author');
const quoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');
let apiQuotes = [];

// Show Quote Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Loading Complete
function loadComplete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    let author = quote.author;
    quoteText.textContent = quote.text;
    loadComplete();

     // Check quote lenght to determine styling
     if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

         // // Check if the author ends with ",type.fit" (case-insensitively)
        const regex = /,\s*type\.fit$/i;
    if (author && regex.test(author)) {
        author = author.replace(regex, "").trim();
    }
    authorName.textContent = author;

    if (author.includes('type.fit')) {
        authorName.textContent = 'Unknown';
    } 
}

// Get Quotes from API
async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()

    } catch(error) {
        // Error catch
    }
}

// Tweet a Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank')
}

getQuotes();
quoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)