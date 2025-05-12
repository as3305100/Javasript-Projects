document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 9.99 },
    { id: 3, name: "Product 3", price: 12.99 },
  ];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item) => {
    renderCart();
  });

  products.forEach((product) => {
    
    // each product has its own div
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = ` 
         
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button  data-id="${product.id}">Add to Cart</button>
        
        `;
       
    productList.appendChild(productDiv);
  });
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      
      // here data-id comes as string thats why we convert in number using parseInt
      // this is necessary to check data type as well
      let productId = parseInt(e.target.getAttribute("data-id"));
      // console.log(productId)
      let product = products.find((product) => product.id === productId);
      //  productId = product.id = parseInt(Math.random() * 100)

      
      // console.log(product)
      // console.log(product);
      addToCart(product);
    }
  });

  function addToCart(product) {
    checkOutBtn.disabled = false;
    cart.push(product);
    saveCart();
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;
    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
         
        // item.id = Date.now()
        
        totalPrice = totalPrice + item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
               <div class = "item" >
               <span> ${item.name} - $${item.price} </span>
               <button  class = "delete" > Delete </button>
               </div>
                `;  // id = ${item.id}
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
      });
  

    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
      // cartItems.classList.add('hidden')
    }
    saveCart();
  }

  // cities.splice(cities.indexOf(removeIt.textContent), 1)
    cartItems.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') {
            let removeIt = e.target.parentNode
             console.log(removeIt)
            console.log(removeIt.innerHTML)
            console.log(cart.indexOf(removeIt));            
            removeIt.remove()
            cart.splice(cart.indexOf(removeIt), 1)
            let tPrice = 0;
            // console.log(cart)
            cart.forEach((item) => {
               tPrice =  item.price + tPrice
            })
            totalPriceDisplay.textContent = `$${tPrice.toFixed(2)}`
             console.log(cart)

        }
        saveCart()
    })

   
  checkOutBtn.addEventListener("click", () => {
    cart.length = 0; // this is the short cut of removing item from cart sometimes we using pop
    alert("Checkout Successfully");
    renderCart();
    // console.log(cart.length)
    if (cart.length == 0) {
      checkOutBtn.disabled = true;
    } 
      
    

    // cartTotalMessage.classList.add('hidden')

    saveCart();
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
