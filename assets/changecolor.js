const toggleModeBtn = document.querySelector('.darkmode-lightmode');

// Funzione per attivare il tema
function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-mode');
    toggleModeBtn.querySelector('i').classList.remove('fa-moon');
    toggleModeBtn.querySelector('i').classList.add('fa-sun');
  } else {
    document.body.classList.remove('light-mode');
    toggleModeBtn.querySelector('i').classList.remove('fa-sun');
    toggleModeBtn.querySelector('i').classList.add('fa-moon');
  }
}

// Controlla se c'è un tema salvato nel localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
}

// Aggiungi l'event listener per il toggle della modalità
toggleModeBtn.addEventListener('click', () => {
  // Se è attiva la light mode, disattivala e salva "dark" nel localStorage
  if (document.body.classList.contains('light-mode')) {
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
    toggleModeBtn.querySelector('i').classList.remove('fa-sun');
    toggleModeBtn.querySelector('i').classList.add('fa-moon');
  } else {
    // Se non è attiva, attivala e salva "light" nel localStorage
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
    toggleModeBtn.querySelector('i').classList.remove('fa-moon');
    toggleModeBtn.querySelector('i').classList.add('fa-sun');
  }
});