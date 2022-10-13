const container = document.getElementById("container");
let cartInfo = [];

function setSubtotal() {
    console.log("setsubtotal");
    let subTotal = document.getElementById("subTotal");
    let count = document.getElementById("count");
    let txtSubTotal = 0;
    if(count.value == 2) {
        txtSubTotal = cartInfo[0].unitCost * count.value;
    } else {
        txtSubTotal = cartInfo[0].unitCost * count.value;
    }
    subTotal.innerHTML = `
            <b>${cartInfo[0].currency} ${txtSubTotal}</b>
        `;
   
}

function showCartInfo() {
    console.log("showcartinfo");
    container.innerHTML = "";
    for (let item of cartInfo) {
        container.innerHTML += `
            <div class="row">
                <div class="col-2 m-3">
                    <img src="${item.image}" alt="Imagen ilustrativa" height="50px">
                </div>
                <div class="col-2">
                    ${item.name}
                </div>
                <div class="col-2">
                    ${item.currency} ${item.unitCost}
                </div>
                <div class="col-2">
                    <input type="number" id="count" oninput="setSubtotal()" value="${item.count}" min ="1" max ="10" style="width: 65px">
                </div>
                <div class="col-2" id="subTotal">
                    <b>${item.currency} ${item.unitCost}</b>
                </div>
            </div>
        </div><hr><hr><br>
    `;

    }
    
    
}



document.addEventListener("DOMContentLoaded", ()=>{
    getJSONData(GET_CART_INFO_URL).then((resultObj)=>{
        cartInfo = resultObj.data.articles;
        console.log(cartInfo[0].image);
        showCartInfo();
        console.log(cartInfo);
      //  setSubtotal();
    })
 
})