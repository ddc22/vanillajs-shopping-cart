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
        return this.#activeCoupon ?? "N/A";
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

    calculateSavings() {
        this.#savings = this.inventoryProduct.coupons.reduce((total, coupon) => {
            console.log({ total, coupon });
            if (coupon === 'B2GO') {
                this.#activeCoupon = coupon;
                return total + (this.inventoryProduct.price * Math.floor(this.quantity / 2));
            }
            return total;
        }, 0);
        return this.#savings;
    }

    removeItem() {
        this.#quantity = 0;
        this.#savings = 0;
    }
}