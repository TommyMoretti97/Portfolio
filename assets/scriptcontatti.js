const images = document.querySelectorAll(".image");
const container = document.querySelector(".container-contatti");
let occupiedPositions = []; // Array to track occupied positions
let animationInterval;

function getRandomPosition(image, isTopSection) {
    const containerRect = container.getBoundingClientRect();
    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;

    const horizontalMargin = 0.2 * containerRect.width; // 20% della larghezza del contenitore

    let xMin, xMax, yMin, yMax;

    // Gestisce la parte laterale
    if (isTopSection) {
        yMin = 0;
        yMax = 0.2 * containerRect.height - imageHeight; // 20% in alto
        xMin = 0;
        xMax = containerRect.width - imageWidth;

        // Aree laterali
        if (Math.random() < 0.5) {
            // Posizione a sinistra
            xMax = horizontalMargin - imageWidth;
        } else {
            // Posizione a destra
            xMin = containerRect.width - horizontalMargin;
            xMax = containerRect.width - imageWidth;
        }
    } else {
        // Gestisce la parte la parte orizzontale in basso sotto le scritte
        yMin = 0.6 * containerRect.height;
        yMax = containerRect.height - 0.1 * containerRect.height - imageHeight;
        xMin = 0;
        xMax = containerRect.width - imageWidth;
    }

    let x, y;
    let positionValid = false;

    while (!positionValid) {
        x = Math.random() * (xMax - xMin) + xMin;
        y = Math.random() * (yMax - yMin) + yMin;

        positionValid = !occupiedPositions.some(
            (pos) =>
                x < pos.x + pos.width &&
                x + imageWidth > pos.x &&
                y < pos.y + pos.height &&
                y + imageHeight > pos.y
        );

        if (positionValid) {
            // Aggiungi la posizione all'elenco delle posizioni occupate
            occupiedPositions.push({
                x,
                y,
                width: imageWidth,
                height: imageHeight,
            });
        }
    }

    return { x, y };
}

function animateImages() {
    occupiedPositions = []; // Resetta le posizioni occupate ad ogni animazione
    const imagesArray = Array.from(images);
    const topSectionImages = imagesArray.slice(0, 3);
    const bottomSectionImages = imagesArray.slice(3);

    topSectionImages.forEach((image) => {
        const { x, y } = getRandomPosition(image, true);
        image.style.left = `${x}px`;
        image.style.top = `${y}px`;
        image.style.opacity = 1;

        setTimeout(() => {
            image.style.opacity = 0;
        }, 2000); // Fade out dopo 2 secondi
    });

    bottomSectionImages.forEach((image) => {
        const { x, y } = getRandomPosition(image, false);
        image.style.left = `${x}px`;
        image.style.top = `${y}px`;
        image.style.opacity = 1;

        setTimeout(() => {
            image.style.opacity = 0;
        }, 2000);
    });
}

function startAnimation() {
    
    // Se c'è già un intervallo attivo, fermalo prima di crearne uno nuovo
    if (animationInterval) {
        clearInterval(animationInterval);
    }
    animateImages(); // Esegui subito la prima animazione
    // Ripeti l'animazione ogni 4 secondi
    animationInterval = setInterval(animateImages, 4000);
}

function stopAnimation() {
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null; // Resetta l'intervallo
    }
}

// Avvia l'animazione al caricamento della pagina
window.onload = () => {
    if (window.innerWidth >= 1025) { // Controlla la larghezza dello schermo
        startAnimation();
    }
};

// Aggiungi un listener per gestire il ridimensionamento della finestra
window.onresize = debounce(() => {
    if (window.innerWidth < 1025) {
        stopAnimation();
    } else if (window.innerWidth >= 1025 ) {
        startAnimation();
    }
}, 200); // 200ms di debounce

// Definisci la funzione debounce
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}
