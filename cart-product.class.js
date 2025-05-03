export class CartProduct {
    inventoryProduct
    #quantity = 0;
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
        return this.inventoryProduct.price * this.quantity;
    }

    get quantity() {
        return this.#quantity;
    }

    get savings() {
        return this.#savings;
    }

    get formattedPrice() {
        return this.totalPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
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
        if (this.#quantity >= this.inventoryProduct.stock) {
            throw new Error("Quantity cannot exceed stock");
        }

        this.#quantity++;
        this.calculateSavings();
        return this.#quantity;
    }

    decrementQuantity() {
        if (this.#quantity < 2) {
            throw new Error("Quantity cannot be less than 1");
        }
        this.#quantity--;
        this.calculateSavings();
        return this.#quantity;
    }

    /**
     * There can be only one active coupon at a time
     * @returns {number} savings
     */
    calculateSavings() {
        for (let coupon of this.inventoryProduct.coupons) {
            switch (coupon) {
                case 'B2GO': {
                    if (this.#quantity > 1) {
                        this.#activeCoupon = coupon;
                        this.#savings = this.inventoryProduct.price * Math.floor(this.quantity / 2);
                        return this.#savings;
                    }
                    break;
                }
            }
        }
        /** If no coupons */
        this.#activeCoupon = null;
        this.#savings = 0;
        return this.#savings;
    }

    removeItem() {
        this.#quantity = 0;
        this.calculateSavings();
    }
}