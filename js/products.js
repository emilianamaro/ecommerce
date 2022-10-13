const container = document.getElementById("container-products");
const contCatName = document.getElementById("catName");
const filterButton = document.getElementById("rangeFilterCount");
const cleanButton = document.getElementById("clearRangeFilter");
const buttonAZ = document.getElementById("sortAsc");
const buttonZA = document.getElementById("sortDesc");
const buttonSortCant = document.getElementById("sortByCount");
const ORDER_ASC_BY_COST = "min-max";
const ORDER_DESC_BY_COST = "max-min";
const ORDER_BY_PROD_COUNT = "Cant.";
let minCount = undefined;
let maxCount = undefined;
let productsList = [];
let categoryName = "";

function sortProducts(criteria){
    container.innerHTML = "";
    let result = [];
    if (criteria === ORDER_ASC_BY_COST){
        result = productsList.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = productsList.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = productsList.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return result;   
}

function showProductList() {
   
    for (let i=0; i < productsList.length; i++) {
        let product = productsList[i];
        let containerProducts = "";

        if (((minCount == undefined) || (minCount != undefined && product.cost >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && product.cost <= maxCount))){
            containerProducts = 
                `<div onclick="setProductID(${product.id})"class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                                <small class="text-muted">${product.soldCount} vendidos</small>
                            </div>
                            <p class="mb-1">${product.description}</p>
                        </div>
                    </div>
                </div>`;
        }
        container.innerHTML += containerProducts;
    }
}

document.addEventListener("DOMContentLoaded", function(e){
   document.getElementById("userId").innerHTML = localStorage.getItem("userId");
   getJSONData(GET_PRODUCTS_URL).then(function(resultObj){
    productsList = resultObj.data.products;
    categoryName = resultObj.data.catName;
    contCatName.innerHTML += `${categoryName}`;
    showProductList();
   });
});

buttonAZ.addEventListener("click", (e) => {
    sortProducts(ORDER_ASC_BY_COST);
    showProductList();
});

buttonZA.addEventListener("click", (e) => {
    sortProducts(ORDER_DESC_BY_COST);
    showProductList();
});

buttonSortCant.addEventListener("click", (e) => {
    sortProducts(ORDER_BY_PROD_COUNT);
    showProductList();
});

filterButton.addEventListener("click", function() {
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;
    container.innerHTML = "";

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showProductList();
});

cleanButton.addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    container.innerHTML = "";

    minCount = undefined;
    maxCount = undefined;

    showProductList();
});

function setProductID (id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

