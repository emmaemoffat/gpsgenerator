// Find the button by its id
document.getElementById("generateBtn").addEventListener("click", function () {

  // Get the full pasted text from the textarea
  let text = document.getElementById("addressInput").value;

  // Find the output area
  let output = document.getElementById("output");

  // Split the pasted text into lines wherever there is a line break
  let lines = text.split("\n");

  // This will store the cleaned addresses
  let addresses = [];

  // Loop through every line
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Skip empty lines
    if (line !== "") {

      // Remove Cityworks number prefix like "79652 - "
      line = line.replace(/^\d+\s*-\s*/, "");

      // Optional fix for abbreviated city name
      line = line.replace("MCKN", "MCKINNEY");

      // Save cleaned line into addresses array
      addresses.push(line);
    }
  }

  // Clear old output before adding new links
  output.innerHTML = "";

  // Google Maps can get messy with too many stops,
  // so break addresses into chunks
  let chunkSize = 10;

  // Loop through addresses in groups of 10
  for (let i = 0; i < addresses.length; i += chunkSize) {
    let chunk = addresses.slice(i, i + chunkSize);

    // Build Google Maps directions URL
    let url = "https://www.google.com/maps/dir/" + chunk.map(encodeURIComponent).join("/");

    // Create a clickable link element
    let link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.textContent = "Open Route " + (i / chunkSize + 1);

    // Put the link into the output area
    output.appendChild(link);
