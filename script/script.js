const form = document.getElementById('form');
const input = document.getElementById('message');
const messages = document.getElementById('messages');
const loader = document.getElementById('loader');

/* Handle async loader things */
const modules = [];

window.LOADED = (thing) => {
  modules.push(thing);
  if (modules.length === 2) loader.style.display = 'none';
}

/* begin */
const createMessage = (sender, message) => {
  const div = document.createElement('div');

  div.className = sender;
  div.innerText = message;

  messages.append(div);
  div.scrollIntoView();
}

const processMessage = (message) => {
  // random delay for "authenticity"
  const delay = Math.random() * 2000 + 300;

  NLP
    .process(message)
    .then((e) => {
      const answer = e.answer || "Sorry, I don't speak that language";
      setTimeout(() => createMessage('chiai', answer), delay)
    });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = input.value.trim();

  if (!message.length) return;

  createMessage('me', message);
  processMessage(message);

  input.value = '';
});
