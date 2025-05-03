const inventory = [{
    name: "Oranges",
    price: 1.25,
    stock: 5,
    coupons: []
},

{
    name: "Apples",
    price: 2.00,
    stock: 1,
    coupons: []
},

{
    name: "Pears",
    price: 2.39,
    stock: 7,
    coupons: ['B2GO']
}]

var cart = inventory.map(item => {
    return {
        name: item.name,
        price: item.price,
        quantity: 0
    }
})


const hide = (element) => {
    element.classList.add("hidden");
}
const show = (element) => {
    element.classList.remove("hidden");
}

const setPrice=(element, price) => {
    element.innerHTML = price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}

function updateCartSummary({ cart }) {
    const cartSummary = document.querySelector(".cart-summary");
    const subtotal = cartSummary.querySelector("#subtotal");

    const totalPrice = cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    subtotal.innerHTML = totalPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}

cart.forEach((item, index) => {
    const inventoryItem = inventory[index];
    const product = document.querySelector(`.product:nth-child(${index + 1})`);
    const productName = product.querySelector(".product-name");
    const productPrice = product.querySelector(".product-price");
    const addToCart = product.querySelector(".add-to-cart");
    const quantityControls = product.querySelector(".quantity-controls");
    const quantity = product.querySelector(".quantity");

    addToCart.addEventListener("click", () => {
        show(quantityControls);
        hide(addToCart);
        item.quantity = 1;
        quantity.innerHTML = 1;
        updateCartSummary({ cart });
    });

    product.querySelector(".decrease-quantity").addEventListener("click", () =>{
        const currentQuantity = item.quantity;
        if(currentQuantity < 2 ){
            alert("Minimum quantity is 1");
            return;
        }
        item.quantity = currentQuantity - 1;
        quantity.innerHTML = currentQuantity - 1;
        setPrice(productPrice, item.price * ( item.quantity));
        updateCartSummary({ cart });
    });

    product.querySelector(".increase-quantity").addEventListener("click", () =>{
        const currentQuantity = item.quantity;
        if(currentQuantity >= inventoryItem.stock){
            alert("Maxim quantity available is " + inventoryItem.stock);
            return;
        }        
        item.quantity = currentQuantity + 1;
        quantity.innerHTML = currentQuantity + 1;
        setPrice(productPrice, item.price * ( item.quantity));
        updateCartSummary({ cart });
    });

    product.querySelector(".remove-item").addEventListener("click", () => {
        hide(quantityControls);
        show(addToCart);
        item.quantity = 1;
        quantity.innerHTML = 0;
        setPrice(productPrice, item.price);
        updateCartSummary({ cart });
    });


    productName.innerHTML = item.name;
    productPrice.innerHTML = item.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
});

