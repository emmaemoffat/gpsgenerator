function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
}

document.getElementById("generateLink").addEventListener("click", function () {  // Function to create the links when button is clicked

  // DEFINING VARIABLES
  let output = document.getElementById("output");             // Get output div
  let text = document.getElementById("addressInput").value;   // Get pasted text
  let lines = text.split("\n");                               // stores the pasted addresses as elements based on line breaks 

  
  // CLEAN AND STORE ADDRESSES
  let addresses = [];                           // array that stores cleaned addresses

  for (let i = 0; i < lines.length; i++) {      // for (START; CONDITION; CHANGE/INCREMENT)
    let line = lines[i].trim();                 // Remove extra spaces
    if (line !== "") {                          // If the line is NOT empty...
      line = line.replace(/^\d+\s*-\s*/, "");   // Remove "79652 - " style prefix
      line = line.replace("MCKN", "MCKINNEY");  // Fix abbreviated city name
      addresses.push(line);                     // Add clean address to array
    }
  }

  // Clear previous output
  output.innerHTML = "";

  
  // DEFINING STOPS
  let start = addresses[0];                              // first stop
  let end = addresses[addresses.length - 1];             // last stop
  let stops = addresses.slice(1, addresses.length - 1);  // Middle stops

  
  // MAKING ROUTE CHUNKS
  let chunkSize = 9;                                     // Google maps only allows up to 10 stops

  for (let i = 0; i < stops.length; i += chunkSize) {    // for (START; CONDITION; CHANGE/INCREMENT) 
    let chunk = stops.slice(i, i + chunkSize);           // grabs 9 stops

  //BUILDING ROUTES
    let routeAddresses = [];                             // array that stores the route for Google Maps

    if (i === 0) {                                       // if on the first loop...
      routeAddresses = [start, ...chunk];                // the route is the start + 1st chunk
    } else {                                             // for all other routes...
      routeAddresses = [stops[i - 1], ...chunk];         // start with the last stop of the previous route + next chunk
    }
    if (i + chunkSize >= stops.length) {                 // if this is the final chunk...
      routeAddresses.push(end);                          // add the end stop to the end
    }

    let url = "https://www.google.com/maps/dir/" +       // making the google maps link
      routeAddresses.map(encodeURIComponent).join("/");  // convert all text in array to URL-safe version

    // DISPLAY THE LINK ON THE WEBPAGE
    let link = document.createElement("a");                 // creating a clickable link element (<a></a>)
    link.href = url;                                        // where the url goes
    link.target = "_blank";                                 // open a new tab
    link.textContent = "Route " + (i / chunkSize + 1);      // label

    let copyButton = document.createElement("button");      // create a button to copy Google Maps link
    copyButton.textContent = "Copy";
    
    copyButton.addEventListener("click", function () {     // when the button is clicked, copy URL
      copyToClipboard(url);
    });
    
    output.appendChild(link);                              // add link to webpage
    output.appendChild(copyButton);                        // add button to webpage
    output.appendChild(document.createElement("br"));
    output.appendChild(document.createElement("br"));
      }

});
