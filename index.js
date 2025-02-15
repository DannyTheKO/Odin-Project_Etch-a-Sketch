const etchASketch = document.querySelector("#etchASketch");
const btnReset = document.querySelector("#btnReset");
const btnSize = document.querySelector("#btnSize");

etchASketch.addEventListener('mouseover', (e) => {
    if (e.target.id !== "etchASketch") {

    }
})

// Reset Button
btnReset.addEventListener('click', (e) => {

})

// Change Size
btnSize.addEventListener('click', () => {
    let size;

    // Validation input, if not an integer, try again!
    do {
        size = prompt("What size for the sketch?: ");
    } while (isNaN(parseInt(size)));
});

