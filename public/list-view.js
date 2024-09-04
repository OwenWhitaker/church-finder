//Access this page by serving index.js with node, then going to http://localhost:8000/list-view.html

const listContainer = document.getElementById("listContainer");

// Creates the visual list of churches on list-view.html, pulling list from database through API
function displayAllChurches() {
    fetch('/api/get-all-churches-names')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Console.log to see if I'm even getting data from the fetch
            data.forEach(function(church) { 
                const newLink = document.createElement("a");
                newLink.textContent = church.name; //needs to use church.name or else will try to use entire object instead of just name
                newLink.href = `detail-view.html?churchName=${church.name}`;
            
                listContainer.appendChild(newLink); //actually appends link to div
        
            });
        })
        .catch(error => {
            console.error('Error fetching church data', error);
        });
}

displayAllChurches();