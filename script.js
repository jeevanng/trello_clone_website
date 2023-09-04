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
        
        // Set column ID in DOM
        columnNode.id = column.name;

        columnNode.classList.add("trelloColumn");

        // Give the columns some drag and drop event handling
        columnNode.addEventListener("dragover", allowDrop);
        
        // Allow us to detect when a card is dropped into a column
        columnNode.addEventListener("drop", dropCard);

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
    console.log("element dragged, has ID of:" + event.target.id);
    event.dataTransfer.setData("text", event.target.id);

}

document.getElementById("cardPreview").addEventListener("dragstart", drag)

// Removing default browser behaviour for elements
// that receive a drag and drop
// Allow drop will tell browser where elements can be dropped (stop symbol etc)
function allowDrop(event){
    event.preventDefault();
}

function dropCard(event){
    event.preventDefault();

    // Find out what was dropped
    let data = event.dataTransfer.getData("text");
    console.log("Dropped card ID is:" + data);

    let oldCardElement = document.getElementById(data);
    let oldCardData = {
        // getElementsByClassName is an array, so we need [0] and we get the specific card by the oldCardElement
        title: oldCardElement.getElementsByClassName("cardDisplay-title")[0].innerText,
        content: oldCardElement.getElementsByClassName("cardDisplay-content")[0].innerText,
        timestamp: oldCardElement.id
    }

    // Find the column data for the column that we just dragged 
    // the card on to, and push that card into it's data
    trelloData.columns.forEach(column => {

        column.cards = column.cards.filter(card => card.timestamp != oldCardData.timestamp);
        
        if (column.name == event.target.id){
            column.cards.push(oldCardData);
        } else {
            console.log("Dropped id is:" + event.target.id);
        }
    });

    console.log("New trello data is:\n" + JSON.stringify(trelloData, null, 4));

    // Any time we modify trelloData, we should re-render the columns & cards
    renderColumns();
}



renderColumns();