function generateCitation() {
    var author = document.getElementById("author").value;
    var year = document.getElementById("year").value;
    var title = document.getElementById("Title").value;
    var source = document.getElementById("link").value;

    if (author === "" || year === "" || title === "" || source === "") {
        alert("Please fill in all blanks.");
        return;
    }

    // Format citation (APA 7)
    var citation = author + " (" + year + "). <i>" + title + "</i>. " + source + ".";

    document.getElementById("citation").innerHTML = citation;
    document.getElementById("copyBtn").style.display = "inline-block";

    saveCitation(citation);
}

// Function to save the citation in local storage
function saveCitation(citation) {
    var citations = JSON.parse(localStorage.getItem("citations")) || [];
    citations.push(citation);
    localStorage.setItem("citations", JSON.stringify(citations));

    displaySavedCitations();
}

// Function to display saved citations
function displaySavedCitations() {
    var savedCitations = JSON.parse(localStorage.getItem("citations")) || [];
    var savedList = document.getElementById("savedCitations");

    savedList.innerHTML = ""; // Clear previous content
    for (let i = 0; i < savedCitations.length; i++) {
        var listItem = document.createElement("li");
        listItem.innerHTML = savedCitations[i] + " ";

        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = function () {
            deleteCitation(i);
        };

        listItem.appendChild(deleteButton);
        savedList.appendChild(listItem);
    }
}

// Function to delete a specific citation
function deleteCitation(index) {
    var citations = JSON.parse(localStorage.getItem("citations")) || [];
    citations.splice(index, 1);
    localStorage.setItem("citations", JSON.stringify(citations));
    displaySavedCitations();
}

// Function to copy the generated citation
function copyCitation() {
    var citationText = document.getElementById("citation").innerText;
    
    if (citationText === "") return;

    navigator.clipboard.writeText(citationText).then(function () {
        alert("Citation copied to clipboard!");
    }).catch(function (err) {
        console.error("Error copying text: ", err);
    });
}

// Load saved citations when the page loads
window.onload = function () {
    displaySavedCitations();
};
