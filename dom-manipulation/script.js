// --- 1. ELEMENT SELECTIONS ---
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');

// --- 2. GLOBAL VARIABLES ---
let quotes = [];
let selectedCategory = 'all'; // --- FINAL FIX --- Renamed variable
const defaultQuotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" },
  // ... (rest of default quotes)
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
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  selectedCategory = categoryFilter.value; // --- FINAL FIX --- Renamed variable
  localStorage.setItem('lastFilterCategory', selectedCategory); // --- FINAL FIX --- Save the selected filter
  showRandomQuote();
}

function displayQuote(quote) {
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p><em>Category: ${quote.category}</em></p>`;
}

function showRandomQuote() {
  let filteredQuotes;
  if (selectedCategory === 'all') { // --- FINAL FIX --- Renamed variable
    filteredQuotes = quotes;
  } else {
    filteredQuotes = quotes.filter(quote => quote.category === selectedCategory); // --- FINAL FIX --- Renamed variable
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
    // ... (This function is correct and unchanged)
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
  // ... (This function is correct and unchanged, but ensure populateCategories is called)
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');

  if (newQuoteCategory.value && newQuoteText.value) {
    const newQuote = {
      text: newQuoteText.value,
      category: newQuoteCategory.value
    };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories(); 
    alert('New quote added');
  } else {
    alert('Please fill both fields');
  }
  newQuoteText.value = '';
  newQuoteCategory.value = '';
}

// IMPORT & EXPORT
function exportToJsonFile() {
    // ... (This function is correct and unchanged)
    const jsonString = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quotes.json';
    link.click();
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    // ... (This function is correct and unchanged, but ensure populateCategories is called)
    const file = event.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories(); 
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(file);
}

// --- 4. INITIAL ACTIONS & EVENT LISTENERS ---
loadQuotes();
populateCategories();
createAddQuoteForm();

// --- FINAL FIX --- Load and apply the last selected filter
const savedCategory = localStorage.getItem('lastFilterCategory');
if (savedCategory) {
  selectedCategory = savedCategory;
  categoryFilter.value = savedCategory;
}

// Initial display logic (using sessionStorage)
const lastViewedQuoteJSON = sessionStorage.getItem('lastViewedQuote');
if (lastViewedQuoteJSON) {
  const lastViewedQuote = JSON.parse(lastViewedQuoteJSON);
  // Check if the last viewed quote matches the current filter
  if (selectedCategory === 'all' || lastViewedQuote.category === selectedCategory) {
    displayQuote(lastViewedQuote);
  } else {
    showRandomQuote(); // If it doesn't match, show a new random one from the filtered list
  }
} else {
  showRandomQuote();
}

// Event Listeners
newQuoteBtn.addEventListener('click', showRandomQuote);
exportBtn.addEventListener('click', exportToJsonFile);
// The other event listeners are in the HTML or createAddQuoteForm function