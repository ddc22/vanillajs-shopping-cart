import { currency } from "./utils.js";

export class CartProduct {
    inventoryProduct
    #quantity = 0;
    #freeItems = 0;
    #savings = 0;
    #activeCoupon = null;

    /**
     * @param {*} inventoryProduct 
     *  @param {number} inventoryProduct.price
     *  @param {number} inventoryProduct.stock
     *  @param {string[]} inventoryProduct.coupons
     *  @param {string} inventoryProduct.name
     */
    constructor(inventoryProduct) {
        this.inventoryProduct = inventoryProduct;
    }

    get totalPrice() {
        return this.inventoryProduct.price * this.finalQuantity;
    }

    get finalQuantity() {
        return this.#quantity + this.#freeItems;
    }

    get freeQuantity() {
        return this.#freeItems;
    }

    get savings() {
        return this.#savings;
    }

    get formattedPrice() {
        return this.totalPrice.toLocaleString('en-US', currency);
    }

    get formattedFinalPrice() {
        return (this.totalPrice - this.savings).toLocaleString('en-US', currency);
    }

    get name() {
        return this.inventoryProduct.name;
    }

    get coupons() {
        return this.inventoryProduct.coupons;
    }

    get activeCoupon() {
        return this.#activeCoupon;
    }

    incrementQuantity() {
        if (this.finalQuantity >= this.inventoryProduct.stock) {
            throw new Error("Quantity cannot exceed stock");
        }

        this.#quantity++;
        this.#calculateSavings();
        return this.#quantity;
    }

    decrementQuantity() {
        if (this.#quantity < 2) {
            throw new Error("Quantity cannot be less than 1");
        }
        this.#quantity--;
        this.#calculateSavings();
        return this.#quantity;
    }

    /**
     * There can be only one active coupon at a time
     * @returns {number} savings
     */
    #calculateSavings() {
        for (let coupon of this.inventoryProduct.coupons) {
            switch (coupon) {
                case 'B2GO': {
                    if (this.#quantity > 1) {
                        this.#activeCoupon = coupon;
                        const maxFreeItems = this.inventoryProduct.stock - this.#quantity;
                        const eligibleFreeItems = Math.floor(this.#quantity / 2);
                        this.#freeItems = Math.min(maxFreeItems, eligibleFreeItems);
                        this.#savings = this.inventoryProduct.price * this.#freeItems;
                        return this.#savings;
                    }
                    break;
                }
            }
        }
        /** If no coupons */
        this.#activeCoupon = null;
        this.#savings = 0;
        this.#freeItems = 0;
        return this.#savings;
    }

    removeItem() {
        this.#quantity = 0;
        this.#calculateSavings();
    }
}