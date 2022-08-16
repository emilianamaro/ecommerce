const URL_CARS = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let container = document.getElementById("container");

function showProductList() {
    container.innerHTML += "<p>" + "dfdfcsdf" + "</p>";

}
showProductList();

async function loadCategory() {
    let response = await fetch(URL_CARS)
    let json = await response.json();
    showCategoriesList();

}
