// --- 1. ELEMENT SELECTIONS ---
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');

// --- 2. GLOBAL VARIABLES ---
let quotes = [];
let currentCategory = 'all'; // To store the current filter
const defaultQuotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Wisdom" },
  { text: "Don’t watch the clock; do what it does. Keep going.", category: "Perseverance" },
  { text: "Happiness is not something ready-made. It comes from your own actions.", category: "Happiness" },
  { text: "The best way to predict your future is to create it.", category: "Self-Improvement" },
  { text: "You miss 100% of the shots you don’t take.", category: "Courage" },
  { text: "Do what you can, with what you have, where you are.", category: "Mindset" },
  { text: "Believe you can and you're halfway there.", category: "Confidence" },
  { text: "Dream big. Start small. Act now.", category: "Action" }
];

// --- 3. FUNCTIONS ---

// SAVING & LOADING DATA (localStorage)
function saveQuotes() {
  localStorage.setItem('savedQuotesInMemory', JSON.stringify(quotes));
}

function loadQuotes() {
  const loadedQuotes = localStorage.getItem('savedQuotesInMemory');
  if (loadedQuotes) {
    quotes = JSON.parse(loadedQuotes);
  } else {
    quotes = defaultQuotes;
  }
}

// DISPLAY & FILTERING LOGIC
function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
  // Clear existing options, but keep the "All" option
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  currentCategory = categoryFilter.value;
  showRandomQuote();
}

function displayQuote(quote) {
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p><em>Category: ${quote.category}</em></p>`;
}

function showRandomQuote() {
  let filteredQuotes;
  if (currentCategory === 'all') {
    filteredQuotes = quotes;
  } else {
    filteredQuotes = quotes.filter(quote => quote.category === currentCategory);
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes found for this category.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  
  displayQuote(randomQuote);
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
}

// ADDING NEW QUOTES (Form)
function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  const quoteInput = document.createElement('input');
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';
  quoteInput.id = 'newQuoteText';
  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';
  const addNewQuoteBtn = document.createElement('button');
  addNewQuoteBtn.textContent = 'Add Quote';
  addNewQuoteBtn.addEventListener('click', addQuote);
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addNewQuoteBtn);
  document.body.appendChild(formContainer);
}

function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');

  if (newQuoteCategory.value && newQuoteText.value) {
    const newQuote = {
      text: newQuoteText.value,
      category: newQuoteCategory.value
    };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories(); // <-- Update categories dropdown
    alert('New quote added');
  } else {
    alert('Please fill both fields');
  }
  newQuoteText.value = '';
  newQuoteCategory.value = '';
}

// IMPORT & EXPORT
function exportToJsonFile() {
  const jsonString = JSON.stringify(quotes, null, 2); // The '2' makes the JSON file readable
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  link.click();
  URL.revokeObjectURL(url); // Clean up the temporary URL
}

function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories(); // <-- Update categories dropdown
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(file);
}

// --- 4. INITIAL ACTIONS & EVENT LISTENERS ---
loadQuotes();
populateCategories();
createAddQuoteForm();

// Initial display logic (using sessionStorage)
const lastViewedQuoteJSON = sessionStorage.getItem('lastViewedQuote');
if (lastViewedQuoteJSON) {
  const lastViewedQuote = JSON.parse(lastViewedQuoteJSON);
  displayQuote(lastViewedQuote);
} else {
  showRandomQuote();
}

// Event Listeners
newQuoteBtn.addEventListener('click', showRandomQuote);
exportBtn.addEventListener('click', exportToJsonFile);
// The other event listeners are in the HTML or createAddQuoteForm function