
async function handleResponse(response) {
  if (response.ok) {
    if (response.status === 204) return null;
    return await response.json();
  }
  switch (response.status) {
    case 400:
      throw new Error("Bad Request: Please check your submitted data.");
    case 401:
      throw new Error("Unauthorized: Please log in again.");
    case 403:
      throw new Error("Forbidden: You do not have permission to do this.");
    case 404:
      throw new Error("Not Found: The requested resource does not exist.");
    case 409:
      throw new Error("Conflict: This item or ID already exists.");
    case 500:
      throw new Error("Internal Server Error: The server crashed. Try again later.");
    default:
      throw new Error(`Unexpected Error: Status ${response.status}`);
  }
}
function encodeImageFileAsURL(element = document.querySelector("#import-product-image")) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log(reader.result)
    return reader.result
  }
  reader.readAsDataURL(file);
}