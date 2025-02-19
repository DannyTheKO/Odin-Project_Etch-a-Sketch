const etchASketch = document.querySelector("#etchASketch");
const btnReset = document.querySelector("#btnReset");
const totalSquareInput = document.querySelector("#totalSquareInput");
const totalSquareOutput = document.querySelector("#totalSquareOutput");

let totalSquares = 32;
let sizeContainer = 600; // How big is the display is
renderSketch(totalSquares);

function renderSketch(totalSquare) {
    if (totalSquare > 64) {
        let c = confirm("Careful this will freeze the website!, do you wish to continue ?")
        if (c === false) {
            return;
        }
    }

    // Reset
    etchASketch.innerHTML = '';
    mouseOverOption();

    totalSquareOutput.textContent = `${totalSquare} x ${totalSquare}`;
    totalSquareOutput.style.textAlign = "center";

    // Calculate grid dimensions
    // let cols = Math.floor(Math.sqrt(totalSquare));
    // let rows = Math.ceil(totalSquare / cols);

    // Adjust square size to fit the container exactly
    let sizeSquare = sizeContainer / totalSquare;

    etchASketch.style.display = "flex";
    etchASketch.style.flexWrap = "wrap";
    etchASketch.style.width = `${sizeContainer}px`;
    etchASketch.style.height = `${sizeContainer}px`;
    etchASketch.style.backgroundColor = "black";

    for (let i = 1; i <= totalSquare; i++) {
        for (let j = 1; j <= totalSquare; j++) {
            const square = document.createElement("div");

            square.style.width = `${sizeSquare}px`;
            square.style.height = `${sizeSquare}px`;
            square.style.boxSizing = "border-box";
            square.style.backgroundColor = "darkgreen";
            square.style.outline = "0.1px solid gray";
            square.style.opacity = "1";

            etchASketch.appendChild(square);
        }
    }
}

function mouseOverOption() {
    let option = document.querySelector('.btn-option > input[name="color"]:checked')

    if (option.value.toString().toLocaleLowerCase() === "gradient") {
        etchASketch.removeEventListener("mouseover", mouseOutRainbow);
        etchASketch.addEventListener("mouseover", mouseOverGradient);
    } else {
        etchASketch.removeEventListener("mouseover", mouseOverGradient);
        etchASketch.addEventListener("mouseover", mouseOutRainbow);

    }
}

function mouseOverGradient(e) {
    if (e.target.id !== "etchASketch" && e.target.style.opacity > "0") {
        e.target.style.opacity -= 0.3;
    }
}

function mouseOutRainbow(e) {
    if (e.target.id !== "etchASketch") {
        e.target.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }
}

// Reset Button
btnReset.addEventListener('click', (e) => {
    renderSketch(totalSquares);
})

totalSquareOutput.addEventListener('click', (e) => {
    let square;
    do {
        square = prompt("Square number: ");
        if (square === null) {
            return; // Cancel
        }
    } while (isNaN(parseInt(square))) // Integer Validation
    totalSquares = square;
    renderSketch(totalSquares);
})