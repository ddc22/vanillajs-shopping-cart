import { CartProduct } from "./cart-product.class.js";
const currency = {
    style: 'currency',
    currency: 'USD'
}
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

var cart = inventory.map(item => new CartProduct(item))


const hide = (element) => {
    element.classList.add("hidden");
}
const show = (element) => {
    element.classList.remove("hidden");
}

const enable = (element) => {
    element.removeAttribute("disabled");
}
const disable = (element) => {
    element.setAttribute("disabled", "true");
}

function getSelectOption(value) {
    const newOption = document.createElement('option');
    newOption.value = value;
    newOption.text = value;
    newOption.setAttribute("disabled", "true");
    return newOption;
}

function setCoupon($product, cartProduct) {
    const $productCouponsSelect = $product.querySelector(".product-coupon-container select.product-coupons");
    const $productCouponLabel = $product.querySelector(".product-coupon-container label");
    if (cartProduct.activeCoupon) {
        $productCouponsSelect.value = cartProduct.activeCoupon;
        show($productCouponLabel);
    } else {
        $productCouponsSelect.value = 'N/A';
        hide($productCouponLabel);
    }

}


function updateCartSummary({ cart }) {
    const $cartSummary = document.querySelector(".cart-summary");
    const $subtotal = $cartSummary.querySelector("#subtotal");
    const $savings = $cartSummary.querySelector("#savings");
    const $savingsRow = $cartSummary.querySelector(".savings.price-item");
    const $total = $cartSummary.querySelector("#total");
    const $promoCodeSection = $cartSummary.querySelector(".promo-code-section");
    const checkoutButton = $cartSummary.querySelector(".checkout-button");

    const subtotal = cart.reduce((total, item) => {
        return total + item.totalPrice;
    }, 0);
    const savings = cart.reduce((total, item) => {
        return total + item.savings;
    }, 0);
    const total = subtotal - savings;

    $subtotal.innerHTML = subtotal.toLocaleString('en-US', currency);
    if (savings > 0) {
        show($savingsRow);
        $savings.innerHTML = savings.toLocaleString('en-US', currency);
    } else {
        hide($savingsRow);
    }
    $total.innerHTML = total.toLocaleString('en-US', currency);
    if (total) {
        show($promoCodeSection);
        enable(checkoutButton);
    } else {
        hide($promoCodeSection);
        disable(checkoutButton);
    }
}


cart.forEach((item, index) => {
    const $product = document.querySelector(`.product:nth-child(${index + 1})`);
    const $productName = $product.querySelector(".product-name");
    const $productPrice = $product.querySelector(".product-price");
    const $addToCart = $product.querySelector(".add-to-cart");
    const $quantityControls = $product.querySelector(".quantity-controls");
    const $quantity = $product.querySelector(".quantity");
    const $productCouponsSelect = $product.querySelector("select.product-coupons");

    $addToCart.addEventListener("click", () => {
        show($quantityControls);
        hide($addToCart);
        $quantity.innerHTML = item.incrementQuantity();
        $productPrice.innerHTML = item.formattedPrice;
        updateCartSummary({ cart });
    });

    $product.querySelector(".decrease-quantity").addEventListener("click", () => {
        try {
            $quantity.innerHTML = item.decrementQuantity()
            $productPrice.innerHTML = item.formattedPrice;
            setCoupon($product, item);
            updateCartSummary({ cart });
        } catch (error) {
            alert(error.message);
        }
    });

    $product.querySelector(".increase-quantity").addEventListener("click", () => {
        try {
            $quantity.innerHTML = item.incrementQuantity()
            $productPrice.innerHTML = item.formattedPrice;
            setCoupon($product, item);
            updateCartSummary({ cart });
        } catch (error) {
            alert(error.message);
        }
    });

    $product.querySelector(".remove-item").addEventListener("click", () => {
        hide($quantityControls);
        show($addToCart);
        item.removeItem();
        setCoupon($product, item);

        $quantity.innerHTML = item.quantity;
        $productPrice.innerHTML = item.formattedPrice;
        setCoupon($product, item);
        updateCartSummary({ cart });
    });


    $productName.innerHTML = item.name;
    $productPrice.innerHTML = item.formattedPrice;
    $quantity.innerHTML = item.quantity;
    /* Coupons are unselectable and are set by default */
    item.coupons.forEach(coupon => {
        const select = getSelectOption(coupon)
        $productCouponsSelect.add(select);
    });
});

