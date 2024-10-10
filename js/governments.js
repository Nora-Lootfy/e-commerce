document.addEventListener('DOMContentLoaded', ()=> {
const governmentsSelect = document.querySelector(".governments");

if (governmentsSelect) {
  fetch("js/egypt.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const governments = Object.keys(data);

      governments.forEach((gov) => {
          governmentsSelect.innerHTML += `<option value="${gov}">${gov}</option>`
      })
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
});
