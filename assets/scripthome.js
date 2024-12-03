document.addEventListener("DOMContentLoaded", () => {
    const scrollContent = document.getElementById("scroll-content2");
    scrollContent.classList.add("hidden");

    // Dopo 2 secondi, rimuovi la classe hidden e aggiungi la classe visible
    setTimeout(() => {
      scrollContent.classList.remove("hidden");
      scrollContent.classList.add("visible");
    }, 4000);
  });