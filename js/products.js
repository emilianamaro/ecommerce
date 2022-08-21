const URL_CARS = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let container = document.getElementById("container-products");
let productsList = [];
let categoryName = "";

document.addEventListener("DOMContentLoaded", function(e){
   getJSONData(URL_CARS).then(function(resultObj){
    productsList = resultObj.data.products;
    categoryName = resultObj.data.catName;
    showProductList();
   })
});

function showProductList() {
    container.innerHTML += `<h1 class="title-products">Productos</h1>`;
    container.innerHTML += `<h4 class="title-products">Verás aquí todos los productos de la categoría <b>${categoryName}</b></h4>`
    for (let i=0; i < productsList.length; i++) {
        let product = productsList[i];
        let containerProducts = 
        `<div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                        <small class="text-muted">${product.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        </div>`
    container.innerHTML += containerProducts;
    }
}
