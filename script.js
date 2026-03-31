// Attach click event to the button
document.getElementById("generateLink").addEventListener("click", function () {

  // Get pasted text
  let text = document.getElementById("addressInput").value;

  // Get output div
  let output = document.getElementById("output");

  // Split into lines
  let lines = text.split("\n");

  // Store cleaned addresses
  let addresses = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (line !== "") {

      // Remove "79652 - " style prefix
      line = line.replace(/^\d+\s*-\s*/, "");

      // Fix abbreviated city name
      line = line.replace("MCKN", "MCKINNEY");

      addresses.push(line);
    }
  }

  // Clear previous output
  output.innerHTML = "";

  // Separate start and end
  let start = addresses[0];
  let end = addresses[addresses.length - 1];

  // Middle stops
  let stops = addresses.slice(1, addresses.length - 1);

  let chunkSize = 9;

  for (let i = 0; i < stops.length; i += chunkSize) {

    let chunk = stops.slice(i, i + chunkSize);

    let routeAddresses = [];

    if (i === 0) {
      // First route: start → stops
      routeAddresses = [start, ...chunk];
    } else {
      // Next routes: previous stop → next stops
      routeAddresses = [stops[i - 1], ...chunk];
    }

    // Last route includes final destination
    if (i + chunkSize >= stops.length) {
      routeAddresses.push(end);
    }

    // Build Google Maps link
    let url = "https://www.google.com/maps/dir/" +
      routeAddresses.map(encodeURIComponent).join("/");

    // Create clickable link
    let link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.textContent = "Route " + (i / chunkSize + 1);

    // Add to page
    output.appendChild(link);
    output.appendChild(document.createElement("br"));
    output.appendChild(document.createElement("br"));
  }

});
