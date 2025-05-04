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

## Assumptions and Decisions
- If there are multiple coupons we set the first qualifying coupon to the product and ignore the rest. 
- Coupon application is recalculated for each calculated when a product is added or removed from the cart
- The dropdown shows a list of available coupons that are not manually selectable
- Unit price was added to each image for greater clarity

# Potential Improvements
- Better dropdown UI
- Provide a small icon with popover information on each coupon