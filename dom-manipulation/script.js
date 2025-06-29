'use strict';

// DOM elements
const newQuoteBtn = document.getElementById('newQuote');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');
const quoteDisplay = document.getElementById('quoteDisplay');
const userText = document.getElementById('newQuoteText');
const userCategory = document.getElementById('newQuoteCategory');
const categoryFilter = document.getElementById('categoryFilter');
const syncBtn = document.getElementById('syncBtn');
const syncStatus = document.getElementById('syncStatus');

let quotes = [];

const defaultQuotes = [
  {
    text: 'The only way to do great work is to love what you do.',
    category: 'Motivation',
  },
  { text: 'Talk is cheap. Show me the code.', category: 'Technology' },
  { text: 'Simplicity is the ultimate sophistication.', category: 'Design' },
  {
    text: 'Life is what happens when you’re busy making other plans.',
    category: 'Life',
  },
];

// ====== Storage Functions ======
const loadQuotes = function () {
  const storedQuotes = localStorage.getItem('quotes');
  quotes = storedQuotes ? JSON.parse(storedQuotes) : [...defaultQuotes];
};

const saveQuotes = function () {
  localStorage.setItem('quotes', JSON.stringify(quotes));
};

const saveLastQuote = function (quote) {
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
};

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

// ====== Display & UI ======
const makeSpan = function (cls, text) {
  const spanEl = document.createElement('span');
  spanEl.classList.add(cls);
  spanEl.innerHTML = text;
  return spanEl;
};

const displayQuote = function (quote) {
  quoteDisplay.replaceChildren(
    makeSpan('category', `[${quote.category}]`),
    makeSpan('quote-text', ` : ${quote.text}`)
  );
  quoteDisplay.classList.add('show');
  saveLastQuote(quote);
};

const showRandomQuote = function () {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  displayQuote(randomQuote);
};

// ====== Category Filter ======
const populateCategories = function () {
  const uniqueCategories = [...new Set(quotes.map((q) => q.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  uniqueCategories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem('selectedCategory');
  if (savedFilter) {
    categoryFilter.value = savedFilter;
    filterQuotes();
  }
};

const filterQuotes = function () {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem('selectedCategory', selectedCategory);

  const filtered =
    selectedCategory === 'all'
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  if (filtered.length === 0) {
    quoteDisplay.innerHTML = '<p>No quotes in this category.</p>';
    return;
  }

  const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
  displayQuote(randomQuote);
};

// ====== Add Quote ======
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
  populateCategories();
  displayQuote(newQuote);

  userText.value = '';
  userCategory.value = '';
};

// ====== Export & Import ======
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

const importFromJsonFile = function (event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (!Array.isArray(importedQuotes))
        throw new Error('Invalid file format');

      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert('Quotes imported successfully!');
    } catch (err) {
      alert('Failed to import: ' + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
};

// ====== Server Sync Simulation ======
const fetchQuotesFromServer = async function () {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5'
  );
  const serverData = await response.json();

  return serverData.map((post) => ({
    text: post.title,
    category: 'Server',
  }));
};

const pushQuoteToServer = async function (quote) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(quote),
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
  });
  const data = await response.json();
  return data;
};

const syncQuotes = async function () {
  try {
    syncStatus.textContent = 'Syncing with server...';

    const serverQuotes = await fetchQuotesFromServer();
    const serverTexts = serverQuotes.map((q) => q.text);

    const newLocalQuotes = quotes.filter((q) => !serverTexts.includes(q.text));
    quotes = [...serverQuotes, ...newLocalQuotes];

    saveQuotes();
    populateCategories();

    syncStatus.textContent = 'Sync complete. Server quotes synced.';
  } catch (err) {
    syncStatus.textContent = 'Error syncing with server.';
    console.error(err);
  }
};

// ====== Initialize ======
document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  populateCategories();
  loadLastQuote();

  newQuoteBtn.addEventListener('click', showRandomQuote);
  exportBtn?.addEventListener('click', exportToJsonFile);
  importFile?.addEventListener('change', importFromJsonFile);
  syncBtn?.addEventListener('click', syncQuotes);
});
