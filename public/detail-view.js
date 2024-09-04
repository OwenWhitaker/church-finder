const urlParams = new URLSearchParams(window.location.search);
const churchNameHeading = document.getElementById("churchNameHeading");
const churchDenominationParagraph = document.getElementById("churchDenominationParagraph");
const churchAddressParagraph = document.getElementById("churchAddressParagraph");

churchNameHeading.textContent = urlParams.get('churchName'); // ((CHANGE THIS)) -> pull name from api so users cant type whatever title into the address bar

const churchName = churchNameHeading.textContent;

console.log("Church name pulled from URL: " + urlParams.get('churchName')); // Checks that code is pulling the church name form the URL



if (churchName) {
    fetch(`/api/get-church-denomination?name=${encodeURIComponent(churchName)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Console.log to see if I'm even getting data from the fetch
            churchDenominationParagraph.textContent = "Denomination: " + data.denomination;
        });

    fetch(`/api/get-church-address?name=${encodeURIComponent(churchName)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Console.log to see if I'm even getting data from the fetch
            churchAddressParagraph.textContent = "Address: " + data.address;
        });

    fetch(`/api/get-church-name?name=${encodeURIComponent(churchName)}`)
        .then(response => {
            if (!response.ok) {
                churchNameHeading.textContent = "Requested church not found";
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Console.log to see if I'm even getting data from the fetch
            churchNameHeading.textContent = data.name;
        });

  } else {
    // Handle the case where churchName is not found in the URL
    console.error('Church name not found in URL');
    // Display an error message to the user
  }

