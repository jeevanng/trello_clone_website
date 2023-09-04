console.log(trelloData);

// Data rendering file 
// Read trelloData, find the data display row and 
// generate HTML elements based on trelloData

function renderColumns(){
    let trelloDataRowRootNode = document.getElementById("dataDisplayRow")

    // Using innerHTML to remove all content and gives us a clean slate
    // Removing any stale or old HTML content
    trelloDataRowRootNode.innerHTML = "";

    // Generating new HTML content

    trelloData.columns.forEach((column) => {
        console.log(column.name);

        let columnNode = document.createElement("div");

        columnNode.classList.add("trelloColumn");

        // Give the columns some drag and drop event handling
        columnNode.addEventListener("dragover", allowDrop)

        // Create content to render column data
        let columnHeading = document.createElement("h3");
        columnHeading.innerText = column.name;
        columnNode.appendChild(columnHeading);

        column.cards.forEach((card) => {
            // Finding the cardPreview, cloning it with all children (true) and saving it as newCard variable
            let newCard = document.getElementById("cardPreview").cloneNode(true);

            if (!card.timestamp || isNaN(card.timestamp)) {
                card.timestamp = Date.now();
                // Number like 1391284083094802394
                // ID will be based on when the card was created
            }

            newCard.id = card.timestamp;

            // Because querySelector is attached to newCard, we will only find the h3 (id) and change the content to card.title
            newCard.querySelector(".cardDisplay-title").innerText = card.title;
            // Finding the paragraph tag
            newCard.querySelector(".cardDisplay-content").innerText = card.content;

            // Allow card to be draggable
            newCard.addEventListener("dragstart", drag);

            // After data is all done, attach card to column
            columnNode.appendChild(newCard);

        })

        trelloDataRowRootNode.appendChild(columnNode);

    });
}

// When we drag a DOM element around
// tell the browser some data about what we are dragging
function drag(event){
    event.dataTransfer.setData("text", event.target.id);
}

// Removing default browser behaviour for elements
// that receive a drag and drop
function allowDrop(event){
    event.preventDefault();
}





renderColumns();