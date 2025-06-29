'use strict';

const newQuoteBtn = document.getElementById('newQuote');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');
const quoteDisplay = document.getElementById('quoteDisplay');
const userText = document.getElementById('newQuoteText');
const userCategory = document.getElementById('newQuoteCategory');

let quotes = [];

// Default fallback quotes
const defaultQuotes = [
  /* [Include your original array here or keep as is] */
];

// Load from localStorage or fallback
const loadQuotes = function () {
  const storedQuotes = localStorage.getItem('quotes');
  quotes = storedQuotes ? JSON.parse(storedQuotes) : [...defaultQuotes];
};

// Save to localStorage
const saveQuotes = function () {
  localStorage.setItem('quotes', JSON.stringify(quotes));
};

// Save last viewed quote in sessionStorage
const saveLastQuote = function (quote) {
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
};

// Load last viewed quote
const loadLastQuote = function () {
  const last = sessionStorage.getItem('lastQuote');
  if (last) {
    const quote = JSON.parse(last);
    quoteDisplay.replaceChildren(
      makeSpan('category', `[${quote.category}]`),
      makeSpan('quote-text', ` : ${quote.text}`)
    );
    quoteDisplay.classList.add('show');
  }
};

// Helper to make styled span
const makeSpan = function (cls, text) {
  const spanEl = document.createElement('span');
  spanEl.classList.add(cls);
  spanEl.innerHTML = text;
  return spanEl;
};

// Pick and show a random quote
const showRandomQuote = function () {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  quoteDisplay.replaceChildren(
    makeSpan('category', `[${randomQuote.category}]`),
    makeSpan('quote-text', ` : ${randomQuote.text}`)
  );

  saveLastQuote(randomQuote);
  quoteDisplay.classList.add('show');
};

// Add new quote from form
const addQuote = function () {
  if (!userText.value.trim() || !userCategory.value.trim()) {
    alert('Please enter both quote and category.');
    return;
  }

  const newQuote = {
    text: userText.value.trim(),
    category: userCategory.value.trim(),
  };

  quotes.push(newQuote);
  saveQuotes();

  quoteDisplay.replaceChildren(
    makeSpan('category', `[${newQuote.category}]`),
    makeSpan('quote-text', ` : ${newQuote.text}`)
  );
  quoteDisplay.classList.add('show');

  saveLastQuote(newQuote);

  userCategory.value = '';
  userText.value = '';
};

// Export quotes as a JSON file
const exportToJsonFile = function () {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// Import quotes from selected file
const importFromJsonFile = function (event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);

      if (!Array.isArray(importedQuotes))
        throw new Error('Invalid file format');

      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    } catch (err) {
      alert('Failed to import: ' + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
};

// Event bindings
document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  loadLastQuote();

  newQuoteBtn.addEventListener('click', showRandomQuote);
  exportBtn.addEventListener('click', exportToJsonFile);
  importFile.addEventListener('change', importFromJsonFile);
});
