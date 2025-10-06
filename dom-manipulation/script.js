const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');

const quotes = [
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

function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p>
    <p><em>${randomQuote.category}</em></p>`;
    console.log(randomIndex)
}

showRandomQuote();
newQuoteBtn.addEventListener('click', showRandomQuote);

function formContainerAddQuote(){
    const formContainer = document.createElement('div');

    const quoteInput = document.createElement('input');
    quoteInput.type  = 'text';
    quoteInput.placeholder = 'Enter a new quote';
    quoteInput.id = 'newQuoteText';

    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';

    const addNewQuoteBtn = document.createElement('button');
    addNewQuoteBtn.textContent = 'Add Quote';

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addNewQuoteBtn);

    document.body.appendChild(formContainer);

    addNewQuoteBtn.addEventListener('click',addQuote);
}

formContainerAddQuote();

function addQuote (){
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');


    if(newQuoteCategory && newQuoteText){
        const newQuote = {
            text: newQuoteText.value,
            category: newQuoteCategory.value
        }
        quotes.push(newQuote)
        alert('New quote added')
    }
    else{
        alert('Please fill both fileds')
    }

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
}