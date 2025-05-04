# Simple VanillaJS Shopping Cart

- Bare bones minimal shopping cart built using only vanilla css and javascript
- Uses JavaScript modules so the content needs to be served to work

## External Resources Used
- Fonts: Roboto from google fonts
- CSS Normalize: https://github.com/sindresorhus/modern-normalize

## Local Dev
Serve static html using

```bash
npx http-server
```

## Demo: Hosted on Vercel
Link: https://vanillajs-shopping-cart.vercel.app/

## Screenshots

![Image](https://github.com/user-attachments/assets/ab50e7d2-bfc6-46e1-a270-57204b3c295e)
![Image](https://github.com/user-attachments/assets/ac73c1bb-5afd-492f-b5b1-8f29af9aaeba)

## Assumptions and Decisions

### General
- Unit price was added to each image for greater clarity
- Changed the CTA to checkout instead of apply coupons since checkout is the actual CTA
- Responsive styles implemented and tested for mobile only
- Checkout coupon and manual coupon apply input/buttons are considered dead/dummy elements

### Coupon Interactions
- If there are multiple coupons we set the first qualifying coupon to the product and ignore the rest. 
- Coupon application is recalculated when a product is added or removed from the cart
- The dropdown shows a list of available coupons that are not manually selectable
- For B2GO coupons when you add 2 to the cart an additional product will be added to the cart
- When you're at 3 products and you remove 1 products from the cart an additional product will be removed

# Potential Improvements
- Better dropdown UI
- Provide a small icon with popover information on each coupon
