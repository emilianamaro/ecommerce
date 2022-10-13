let container = document.getElementById("container");
let productInfo = [];
let productComments = [];
let imageList = "";
let contComment = "";
let relatedProducts = "";


function showProductInfo () {
    let containerInfo = 
    `<div "class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col"><br>
            <h1 class="mb-1 text-center p-4">${productInfo.name}</h1> <hr> <br>
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
                <div>
                    <h3><b>Comentar</b></h3>
                    <h4 class="mb-1">Tu opinión:</h4>
                    <textarea name="comment" rows="5" cols="80" id="textComment"></textarea>
                    <h4 class="mb-1">Tu puntuación:</h4>
                    <select name="score" id="score">
                        <option value="select" autofocus>Seleccione su puntuación</option>
                        <option value="one">1 (más baja)</option>
                        <option value="two">2</option>
                        <option value="three">3</option>
                        <option value="four">4</option>
                        <option value="five">5 (más alta)</option>
                    </select> <br>
                    <button class="btn btn-primary btn-lg" type="submit" onclick="postComment()">Enviar</button>
                </div> <br>
                <div>
                    <h3><b>Productos relacionados</b></h3> <br>
                    <div class="row" id="relatedProducts">
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    container.innerHTML = containerInfo;
    
}

function showComments () {
    contComment = "";
    for (let comment of productComments) {
        let score = "";
        if (comment.score === 1) {
            score = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `;
        } else if (comment.score === 2) {
            score = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `;
        } else if (comment.score === 3) {
            score = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `;
        } else if (comment.score === 4) {
            score = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            `;         
        } else if (comment.score === 5) {
            score = `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            `;
        } else {
            score = `
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `;
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