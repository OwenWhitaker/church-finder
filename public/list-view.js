//Here's the script to open a server with terminal: python3 -m http.server

//list of churches to display
//const churchList = ["Henderson Hills", "Life Church", "Wildwood", "Frontline", "First Baptist"]; //this list will be provided by the API

const listContainer = document.getElementById("listContainer");
const testContainer = document.getElementById("testContainer"); // test container for testing get from api

// Creates the visual list of churches on list-view.html, pulling list from api
fetch('/api/get-church-list')
    .then(response => response.json())
    .then(data => {
        console.log(data.churches); // Console.log to see if I;m even getting data from the fetch
        data.churches.forEach(item => { 
            const newLink = document.createElement("a");
            newLink.textContent = item;
            newLink.href = ("detail-view.html?churchId=" + item); //change once have actual site
            
            listContainer.appendChild(newLink); //actually appends link to div
        
        });
    })
    .catch(error => {
        console.error('Error fetching church list', error);
    });

// Creates the visual list of links on the listView HTML page
/*churchList.forEach(item => { 
    const newLink = document.createElement("a");
    newLink.textContent = item;
    newLink.href = ("detail-view.html?churchId=" + item); //change once have actual site
    
    listContainer.appendChild(newLink); //actually appends link to div

}); */



// Test Endpoint     ((TEST FETCH))
fetch('/api/get-variable') 
    .then(response => response.json())
    .then(data => {
        console.log(data.variableValue); //Access the variable's value
        const fillFromAPI = document.createElement("p");
        fillFromAPI.textContent = data.variableValue;
        testContainer.appendChild(fillFromAPI);
    })
    .catch(error => {
        console.error('Error fetching variable', error);
    });

