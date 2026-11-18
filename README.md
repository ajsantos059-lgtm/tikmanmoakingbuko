# Buko Sarap

**Fresh coconut drinks, made to order.** Buko Sarap is a responsive Angular single-page storefront concept for a neighborhood buko stand. Customers can browse a small menu, find drinks, build an order, and choose pickup or delivery.

## Intended users

Local customers looking for a convenient way to browse and order fresh coconut drinks on a phone or desktop.

## Project objectives

- Build a responsive single-page ordering experience with Angular.
- Demonstrate reusable components, data binding, event handling, conditional/list rendering, and forms.
- Make browsing and ordering a small neighborhood menu simple on both desktop and mobile.

## Features

- Responsive storefront with menu and story sections.
- Search drinks and filter by Classics or Specials.
- Add drinks to a live cart, change quantities, or remove items.
- Open a drink detail page by selecting its menu image.
- Choose a quantity in a form modal before adding the drink to the cart.
- Enter contact and fulfillment details in the add-to-cart form; a full address is required before a delivery item can be added.
- Choose pickup or delivery and see the total update with the delivery fee.
- Validate a name and mobile number before placing an order.
- Show an order confirmation and reset the cart after checkout.

## Angular structure

- `App` owns the sample menu, cart state, and order confirmation.
- `SiteHeader` provides navigation and the live cart count.
- `MenuSection` renders and filters the product list.
- `ProductDetail` displays the selected drink on its own route.
- `AddToCartModal` validates quantity and collects contact/shipping details before adding a drink.
- `ShippingDetailsModal` lets customers update delivery details from the cart.
- `CartPanel` manages quantity controls, shipping summary, totals, and order submission.
- `OrderStore` shares the menu and cart across routes.

The app uses Angular standalone components, Angular Router, template bindings, event emitters, conditional/list rendering, and Angular template-driven forms. The menu and cart are in-memory demo data; no backend or payment processing is connected.

## Technologies

Angular 21, TypeScript, HTML, CSS, Angular Forms, and the Angular Router provider configured by the starter project. Navigation in this single-page storefront uses in-page menu and story links.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:4200/` in your browser. To run the production build and tests:

```bash
npm run build
npm test
```

## Submission screenshots

Capture screenshots from the running app for the desktop storefront, the mobile layout, and the cart/checkout showing the selected fulfillment method and calculated total. Include a separate screenshot of the Angular project structure if required by your instructor.

## Demo walkthrough

1. Browse the drinks and try the category filters or menu search.
2. Select a drink image to open its product detail route.
3. Use **Add to cart**, choose a quantity in the modal, and confirm.
4. Open **Your order**, enter delivery details (or choose pickup), review the total, and place the demo order.
