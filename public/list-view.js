//Access this page by serving index.js with node, then going to http://localhost:8000/list-view.html

const listContainer = document.getElementById("listContainer");
const testContainer = document.getElementById("testContainer"); // test container for testing get from api

// Creates the visual list of churches on list-view.html, pulling list from api
/*fetch('/api/get-church-list')
    .then(response => response.json())
    .then(data => {
        console.log(data.churches); // Console.log to see if I'm even getting data from the fetch
        data.churches.forEach(item => { 
            const newLink = document.createElement("a");
            newLink.textContent = item;
            newLink.href = ("detail-view.html?churchId=" + item); //change once have actual site
            
            listContainer.appendChild(newLink); //actually appends link to div
        
        });
    })
    .catch(error => {
        console.error('Error fetching church list', error);
    }); */

fetch('/api/get-churches')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Console.log to see if I'm even getting data from the fetch
        data.forEach(function(church) { 
            const newLink = document.createElement("a");
            newLink.textContent = church.name;
            newLink.href = `detail-view.html?churchId=${church.id}`; //change once have actual site
            
            listContainer.appendChild(newLink); //actually appends link to div
        
        });
    })
    .catch(error => {
        console.error('Error fetching church data', error);
    });
