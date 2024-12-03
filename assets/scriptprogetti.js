// Aggiungi l'event listener a tutte le icone open-post
document.querySelectorAll(".open-post").forEach(function(openBtn) {
    openBtn.addEventListener("click", function() {
        // Trova il contenitore del post LinkedIn associato
        const linkedinPost = openBtn.nextElementSibling; 
        // Mostra il contenitore del post specifico
        linkedinPost.style.display = "block";
    });
});

// Aggiungi l'event listener a tutte le icone close-post
document.querySelectorAll(".close-post").forEach(function(closeBtn) {
    closeBtn.addEventListener("click", function() {
        // Trova il contenitore del post LinkedIn associato
        const linkedinPost = closeBtn.closest(".linkedin-post"); // Usa closest per trovare il div parent corretto
        // Nascondi il contenitore del post
        linkedinPost.style.display = "none";
    });
});
