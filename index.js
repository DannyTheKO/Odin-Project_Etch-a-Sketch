const etchASketch = document.querySelector("#etchASketch");
const btnReset = document.querySelector("#btnReset");
const btnSize = document.querySelector("#btnSize");

let totalGrid = 128; // default size (contain x and y axis);
const containerSize = 600; // Size of the container
let count = 1; // Debug
renderSketch(totalGrid);
function renderSketch(totalGrid) {
    let gridSize = Math.ceil(Math.sqrt(totalGrid));
    let divSize = containerSize / gridSize;
    console.log(divSize)

    etchASketch.style.display = "grid";
    etchASketch.style.gridTemplateColumns = `repeat(${gridSize}, ${divSize}px)`;
    etchASketch.style.gridTemplateRows = `repeat(${gridSize}, ${divSize}px)`;
    etchASketch.style.width = `${containerSize}px`;
    etchASketch.style.height = `${containerSize}px`;

    etchASketch.innerHTML = "";

    for (let i = 0; i < totalGrid; i++) {
        // Sketch square default style
        const square = document.createElement("div");
        square.style.backgroundColor = "darkblue";
        square.style.boxSizing = "border-box"; // Ensure consistent sizing
        square.style.width = `${divSize}px`;
        square.style.height = `${divSize}px`;

        etchASketch.appendChild(square);
    }
}

etchASketch.addEventListener('mouseover', (e) => {
    if (e.target.id !== "etchASketch") {

    }
})

// Reset Button
btnReset.addEventListener('click', (e) => {

})

// Change Size
btnSize.addEventListener('click', () => {
    // Validation input, if not an integer, try again!
    do {
        totalGrid = prompt("What size for the sketch?: ");
    } while (isNaN(parseInt(totalGrid)));

    renderSketch(totalGrid);
});

