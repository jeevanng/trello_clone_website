console.log(trelloData);

// Data rendering file 
// Read trelloData, find the data display row and 
// generate HTML elements based on trelloData

function renderColumns(){
    let trelloDataRowRootNode = document.getElementById("dataDisplayRow")

    // Using innerHTML to remove all content and gives us a clean slate
    trelloDataRowRootNode.innerHTML = "";
}

renderColumns();