// Select Elements

const productEl = document.querySelector('.products');
const cartItemsEl = document.querySelector('.cart-items');
const subtotalEl = document.querySelector('.subtotal');
const totalElemetsInCartEl = document.querySelector('.total-items-in-cart');

// Render Productos

function renderProducts(){
	products.forEach( product => {
		productEl.innerHTML += `
			<div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                           ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart"  onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
		`
	})
}

//Render Procducts invoke
renderProducts();


let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();


// Add To Cart fucntion
function addToCart(id){
    //check if product is already in cart
    if(cart.some( (item) => item.id === id)){
        changeNumberOfUnits('plus',id);
    }
	else{
        const item = products.find(product => product.id === id);
        cart.push({...item, numberOfUnits: 1});
        console.log(cart);
    }

    updateCart();
}



// Cart Update Function

function updateCart(){
    renderCartItems();
    renderSubTotal();

    //Save to local storage

    localStorage.setItem("CART", JSON.stringify(cart));
}

//calculate and render subtotal

function renderSubTotal(){
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach( (item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits; 
    })

    totalElemetsInCartEl.innerHTML = totalItems;
    subtotalEl.innerHTML = ` Subtotal ( ${totalItems} items) : $ ${totalPrice.toFixed(2)}`
}


//render cart items;

function renderCartItems(){

    //Clear Cart element
    cartItemsEl.innerHTML = "";
    cart.forEach( (item) => {
        cartItemsEl.innerHTML += ` 
            <div class="cart-item">
                 <div class="item-info" onclick="removeItemsFromCart(${item.id})">
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <h4>${item.name}</h4>
                </div>
                <div class="unit-price">
                    <small>$</small>${item.price}
                </div>
                <div class="units">
                    <div class="btn minus" onclick= "changeNumberOfUnits('minus', ${item.id})">-</div>
                    <div class="number">${item.numberOfUnits}</div>
                    <div class="btn plus" onclick= "changeNumberOfUnits('plus', ${item.id})">+</div>           
                    </div>
             </div>
        `
    });
}

//remove items from cart

function removeItemsFromCart(id){
   cart = cart.filter((item) => item.id !== id);

   updateCart();
}



//change number of units of item

function changeNumberOfUnits(action, id){
    cart = cart.map( (item) => {

        let numberOfUnits = item.numberOfUnits;
        if(item.id === id){
            if( action === 'minus' && numberOfUnits > 1){
                numberOfUnits--;
            }
            else if( action === 'plus' && numberOfUnits < item.instock){
                numberOfUnits++;
            }
        }
        return {
            ...item,
            numberOfUnits,
        }
    })

    updateCart();
}



