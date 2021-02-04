if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("card"));

    overlays.forEach(overLay => {
        overLay.addEventListener("click", () => {
            overLay.classList.remove("visible");
            // game.StartGame();
        });
    });

    cards.forEach(card=> {
        card.addEventListener("click", () => {
            // game.FlipCard(card);
        });
    });
}