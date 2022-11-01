let container = document.getElementById("container");
let productInfo = [];
let productComments = [];
let imageList = "";
let contComment = "";
let relatedProducts = "";
let cartInfo = [];
let shopList = JSON.parse(localStorage.getItem("newProduct"));


function showProductInfo () {
    let containerInfo = 
    `
        <div class="row justify-content-between">
            <h1 class="mb-1 p-4 col-4">${productInfo.name}</h1>
            <button type="button" class="btn btn-primary col-2" onclick="comprar()"><b>Comprar</b></button>
        </div>
        <hr> <br>
        <div>
            <h3><b>Precio</b></h3>
            <h4 class="mb-1">${productInfo.currency} ${productInfo.cost}</h4>
        </div> <br>
        <div>
            <h3><b>Descripción</b></h3>
            <h4 class="mb-1">${productInfo.description}</h4>
        </div> <br>
        <div>
            <h3><b>Categoría</b></h3>
            <h4 class="mb-1">${productInfo.category}</h4>
        </div> <br>
        <div>
            <h3><b>Cantidad de vendidos</b></h3>
            <h4 class="mb-1">${productInfo.soldCount}</h4>
        </div> <br>
        <div>
            <h3><b>Imágenes ilustrativas</b></h3>
            <div class="row">
                ${imageList}
            </div>
        </div>
        <div>
            <h3><b>Comentarios</b></h3>
            <ul class="list-group">
                ${contComment}
            </ul>
        </div> <br>
    `;
    container.innerHTML = containerInfo;
    
}

function showComments () {
    contComment = "";
    for (let comment of productComments) {
        let score = "";
        if(comment.score == 5) {
            for(let i = 0; i < 5; i++){
                score += `
                <span class="fa fa-star checked"></span>
                `;
            }
        } else {
            for(let i = 0; i < comment.score; i++){
                score += `
                    <span class="fa fa-star checked"></span>
                `;
            }
            for(let i = comment.score; i < 5; i++) {
                score += `
                    <span class="fa fa-star"></span>
                `;
            }
        }

        if (productComments.length > 0) {
            contComment += `
            <li class="list-group-item">
                <div class="col-md-4 d-flex w-100 justify-content-between" >
                    <div>
                        <b>${comment.user}</b> -
                        ${comment.dateTime} -
                        ${score}
                    </div>
                
                </div>
                <div >
                    ${comment.description}
                </div>
            </li> 
            `;
        }     
    }
    if (productComments.length < 1) {
        contComment = ` 
            <p>No hay comentarios sobre este artículo.</p>
            `;
    }        
    showProductInfo();
    showRelatedProducts();
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("userId").innerHTML = localStorage.getItem("userId");
    getJSONData(GET_PRODUCTLIST_URL).then(function(resultObj){
     productInfo = resultObj.data;
     for (let image of productInfo.images) {
        imageList += `
        <div class="col-md-4">
            <div class="card mb-4 shadow-sm custom-card cursor-active">
              <img class="bd-placeholder-img card-img-top" src="${image}"
                alt="imagen ilustrativa">
            </div>
          </div>`;
        }
        showProductInfo();
    });
    getJSONData(GET_PRODUCTCOMMENT_URL).then(function(resultObj){
        productComments = resultObj.data;
        showComments();
    });
    if(!shopList){
        //si no está el carrito cargado en el local lo cargo
        getJSONData(GET_CART_INFO_URL).then((resultObj)=>{
            cartInfo = resultObj.data.articles;
            localStorage.setItem("newProduct", JSON.stringify(cartInfo));
        });
    }
});


function postComment (){
console.log(productComments);
    let txtComment = document.getElementById("textComment");
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    if(txtComment.value) {
        localStorage.setItem("txtComment", txtComment.value);
        alert("Su comentario ha sido enviado con éxito.");
        txtComment.value = "";
        let select = document.getElementById("score");
        productComments.push(
            {   product : productInfo.id,
                score: select.selectedIndex,
                description: localStorage.getItem("txtComment"),
                user: localStorage.getItem("userId"),
                dateTime: year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec
            }
        );
        select.selectedIndex = "0";
        showComments();
    } else {
        alert("Por favor ingrese un comentario para enviar");
    }
}

function showRelatedProducts () {
    relatedProducts = productInfo.relatedProducts;
    let contRelatedProducts = document.getElementById("relatedProducts");
    for (let comment of relatedProducts) {
        contRelatedProducts.innerHTML += `
            <div onclick="setProductID(${comment.id})" class= "list-group-item cursor-active col-4 m-2">
                <img src="${comment.image}" alt="${comment.name}" class=" img-fluid">
                <h5 class="p-3">${comment.name}</h5>
            </div>
        `;
    }
}

function setProductID (id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

function comprar() {
    //traigo el carrito del local y ejecuto mensaje al usuario
    let shopList = JSON.parse(localStorage.getItem("newProduct"));
    let txtCount = prompt(`¿Qué cantidad de ${productInfo.name} desea comprar?`, "");
    let count = parseInt(txtCount);

    if(!count){
        //si no ingresa una cantidad le pido que lo haga
        alert("Ingrese la cantidad para agregar al carrito.");
    } else {
        //si ingresa una cantidad, añado el producto al carrito
        shopList.push(
            {"count": count,
            "currency": productInfo.currency,
            "id": productInfo.id,
            "image": productInfo.images[0],
            "name": productInfo.name,
            "unitCost": productInfo.cost}
        );
        alert(`Añadió ${count} ${productInfo.name} a su carrito.`);
    }
    //setteo el carrito en el local
    localStorage.setItem("newProduct", JSON.stringify(shopList));
}