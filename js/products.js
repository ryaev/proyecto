//array donde se cargarán los datos recibidos:
const ORDER_ASC_BY_COST = "Menor";
const ORDER_DESC_BY_COST = "Mayor";
const ORDER_BY_PROD_SOLDCOUNT = "Vendidos";
let prodArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setprodID(idprod) {
    localStorage.setItem("id", idprod);
    window.location = "product-info.html"
}

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(){
    let htmlContentToAppend = "";

    for(let i = 0; i < prodArray.length; i++){ 
        let prod = prodArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(prod.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(prod.cost) <= maxCount))){

        htmlContentToAppend += `
        <div onclick="setprodID(${prod.id})" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + prod.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ prod.name + ` ` + `-` + ` ` + prod.currency + ` ` + prod.cost + `</h4> 
                        <p> `+ prod.description +`</p> 
                        </div>
                        <small class="text-muted">` + prod.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, actprodArray){
    currentSortCriteria = sortCriteria;

    if(actprodArray != undefined){
        prodArray = actprodArray;
    }

    prodArray = sortCategories(currentSortCriteria, prodArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}


/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", function(e){
    let categoria = JSON.parse(localStorage.getItem('catID'));
    const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/"+ categoria +".json";
    
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            prodArray = resultObj.data.products;
            let nompro = resultObj.data.catName;
            showCategoriesList(prodArray);
            document.getElementById('nompro').innerHTML = nompro;
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_SOLDCOUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

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

        showCategoriesList();
    });

    mostrarUsuario();

});