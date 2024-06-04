let listOfProducts = [
  {
      name: "Помідори",
      quantity: 1,
      bought: false
  },
  {
      name: "Сир",
      quantity: 1,
      bought: false
  },
  {
      name: "Печиво",
      quantity: 1,
      bought: false
  }
];

let listOfProducts2Right = JSON.parse(JSON.stringify(listOfProducts));
let listOfProducts4Right = [];

let listOfProductsHTML = "";
let listOfProducts2RightHTML = "";
let listOfProducts4RightHTML = "";

renderListOfProducts();

function renderListOfProducts() {
    listOfProductsHTML = "";
    listOfProducts2RightHTML = "";
    listOfProducts4RightHTML = "";

    for (let i = 0; i < listOfProducts.length; i++) {
        const item = listOfProducts[i];
        const html = `
          <div class="line">
            <div class="product-name">
            <span class="prod" data-tooltip="${item.name}" style="text-decoration: ${item.bought ? 'line-through'  : 'none'}">${item.name}</span>
            </div>
            <div class="three-lines" style="visibility: ${item.bought ? 'hidden'  : 'visible'}">
              <button class="minus-btn" data-tooltip="Зменшити">-</button>
              <span class="quantity" >${item.quantity}</span>
              <button class="plus-btn" data-tooltip="Додати">+</button>
            </div>
            <div class="user-choose">
              <button class="bought" data-tooltip="Куплено">${item.bought ? 'Не куплено'  : 'Куплено'}</button>
              <button class="cancel-btn" data-tooltip="Скасувати" style="visibility: ${item.bought ? 'hidden'  : 'visible'}">×</button>
            </div>
          </div>`;
        listOfProductsHTML += html;
    }

    for(let i = 0; i < listOfProducts2Right.length; i++){
        const item = listOfProducts2Right[i];
        const html = ` 
            <span class="product-item" data-tooltip="${item.name}">
                ${item.name}
                <span class="amount">${item.quantity}</span>
            </span>`;
        listOfProducts2RightHTML += html;
    }

    for(let i = 0; i < listOfProducts4Right.length; i++){
        const item = listOfProducts4Right[i];
        const html = ` 
            <span class="product-item" data-tooltip="${item.name}">
                ${item.name}
                <span class="amount">${item.quantity}</span>
            </span>`;
        listOfProducts4RightHTML += html;
    }

    document.querySelector(".products-left").innerHTML = listOfProductsHTML;  
    document.querySelector(".right2-line").innerHTML = listOfProducts2RightHTML;
    document.querySelector(".right4-line").innerHTML = listOfProducts4RightHTML;



    
  const deleteButtons = document.querySelectorAll(".cancel-btn");
  for (let i = 0; i < deleteButtons.length; i++) {
    const button = deleteButtons[i];
    button.addEventListener("click", () => {
  
      listOfProducts.splice(i, 1);
      listOfProducts2Right.splice(i, 1);

      renderListOfProducts();
    });
  }







const productNames = document.querySelectorAll(".prod");
for (let i = 0; i < productNames.length; i++) {
    const productName = productNames[i];
    productName.addEventListener("click", function() {
  
        const input = document.createElement("input");
        input.value = productName.textContent;
        input.addEventListener("blur", function() {
           
            listOfProducts[i].name = input.value;
            listOfProducts2Right[i].name = input.value;
            if (listOfProducts[i].bought) {
                listOfProducts4Right[i].name = input.value;
            }

        
            renderListOfProducts();
        });

       
        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
            
                input.blur();
            }
        });

        productName.replaceWith(input);
        input.focus();
    });
}

  

    const boughtButtons = document.querySelectorAll(".bought");
    for (let i = 0; i < boughtButtons.length; i++) {
      boughtButtons[i].addEventListener("click", function() {
        listOfProducts[i].bought = !listOfProducts[i].bought;
        
        if (listOfProducts[i].bought) {
          if (!listOfProducts4Right.some(product => product.name === listOfProducts[i].name)) {
              listOfProducts4Right.push(listOfProducts[i]);
          }
          const indexIn2Right = listOfProducts2Right.findIndex(product => product.name === listOfProducts[i].name);
          if (indexIn2Right !== -1) {
              listOfProducts2Right.splice(indexIn2Right, 1);
          }
      } else {
          if (!listOfProducts2Right.some(product => product.name === listOfProducts[i].name)) {
              listOfProducts2Right.push(listOfProducts[i]);
          }
          const indexIn4Right = listOfProducts4Right.findIndex(product => product.name === listOfProducts[i].name);
          if (indexIn4Right !== -1) {
              listOfProducts4Right.splice(indexIn4Right, 1);
          }
      }

        renderListOfProducts();
      });
    }



const plusButtons = document.querySelectorAll(".plus-btn");
for (let i = 0; i < plusButtons.length; i++) {
  plusButtons[i].addEventListener("click", function() {
    listOfProducts[i].quantity++;
    renderListOfProducts();
  });
}

const minusButtons = document.querySelectorAll(".minus-btn");
for (let i = 0; i < minusButtons.length; i++) {
  minusButtons[i].addEventListener("click", function() {
    if (listOfProducts[i].quantity > 1) {
      listOfProducts[i].quantity--;
    }
    renderListOfProducts();
  });
}



}

function addProductToList() {
    const inputElement = document.querySelector(".search-bar");
    const newProduct = {
        name: inputElement.value,
        quantity: 1,
        bought: false
    };

    if (!listOfProducts.some(product => product.name === newProduct.name) && newProduct.name !== "") {
        listOfProducts.push(newProduct);
        listOfProducts2Right.push(newProduct);
        console.log(listOfProducts);
        inputElement.value = "";

        renderListOfProducts();
    } else {
        console.log("Product already exists in the list");
    }
    inputElement.focus();
}

document.querySelector(".add-btn").addEventListener("click", addProductToList);
document.querySelector(".search-bar").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addProductToList();
    }
});


