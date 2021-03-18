const root = document.querySelector("#root");
const salveGrid = document.querySelector("#salve-grid");

let salveCounter = 0;
let validator = /([S]|[s])[a+]+[l][v][e]/;

const handleMessage = (message) => {
    const words = message.split(" ");
    words.forEach((word) => {
        word.toLowerCase();
        if (word.match(validator)) {
            salveCounter++;
            displayCounter();
        }
    });
};

const client = new tmi.Client({
    connection: { reconnect: true },
    channels: ["gaules"],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
    handleMessage(message);
});

const displayCounter = () => {
    salveGrid.innerHTML = "";
    const counter = salveCounter.toString().split("");
    let counterArray;
    if (counter.length !== 10) {
        counterArray = new Array(10 - counter.length).fill("0");
        counter.forEach((n) => {
            counterArray.push(n);
        });
    }
    counterArray.forEach((n, index) => {
        const numberContainer = document.createElement("div");
        numberContainer.style.gridColumn = index + 1;
        numberContainer.style.gridRow = 0;

        const number = document.createElement("p");
        number.innerHTML = n;

        numberContainer.appendChild(number);
        salveGrid.appendChild(numberContainer);
    });
};

displayCounter();
