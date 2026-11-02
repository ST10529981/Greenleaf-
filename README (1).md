# Greenleaf Garden Services

A responsive, static website for Greenleaf Garden Services, a garden care business serving homes and small businesses in Johannesburg, South Africa. It is built with plain HTML, CSS and JavaScript. There is no build step, framework or package installation.

The site lets visitors learn about the business, browse services and prices, work out what a job will cost with an interactive fee calculator, and get in touch through a contact form.

## Contents

- [Project structure](#project-structure)
- [Pages](#pages)
- [Functions and features](#functions-and-features)
  - [Shared header and footer](#shared-header-and-footer)
  - [Fee calculator and invoice](#fee-calculator-and-invoice)
  - [Contact form](#contact-form)
- [Services and pricing](#services-and-pricing)
- [Run locally](#run-locally)
- [Publish with GitHub Pages](#publish-with-github-pages)
- [Customising the site](#customising-the-site)
- [Limitations](#limitations)

## Project structure

```
.
├── index.html          Home page
├── about.html          About the business
├── services.html       Services and price summary
├── maintenance.html    Garden maintenance details
├── lawn.html           Lawn care details
├── landscaping.html    Landscaping details
├── fees.html           Fee calculator and invoice preview
├── contact.html        Contact form and map
├── css/
│   └── style.css       Shared styles for every page
└── js/
    ├── main.js         Shared behaviour (header, footer, contact form)
    └── fees.js         Fee calculator logic and service price list
```

Every page links to `css/style.css` and loads `js/main.js`. Only `fees.html` also loads `js/fees.js`.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Landing page with a hero section, a three-step "How it works" overview (see your appointment, add special requests, get proof of completion), service highlights and calls to action. |
| `about.html` | Who the business is, what it stands for (on time, transparent, listening) and a table describing the team roles: field gardeners, office administrators and managers. |
| `services.html` | A table of all five services with descriptions and prices, plus the discount and VAT rules. |
| `maintenance.html` | Garden maintenance: what is included and the price. |
| `lawn.html` | Lawn care: what is included and the price. |
| `landscaping.html` | Landscaping: what is included and the price. |
| `fees.html` | The fee calculator. Build an invoice from one or more services and see discounts, VAT and the total due. |
| `contact.html` | Contact form, business contact details and an OpenStreetMap embed of Johannesburg. |

Each service page ends with a **Calculate fees** button linking to the calculator and a **Back to services** link.

## Functions and features

### Shared header and footer

Every page contains empty `<header id="site-header">` and `<footer id="site-footer">` elements. These are filled in by the shared script `js/main.js`, so the navigation and footer are defined once and stay consistent across all pages. To change the menu or footer, edit `js/main.js` rather than each HTML file.

### Fee calculator and invoice

Located on `fees.html` and implemented in `js/fees.js`.

**How to use it**

1. Enter the customer name and email address.
2. Choose a service from the dropdown (the list is built from the service definitions in `js/fees.js`).
3. Enter a quantity: visits, days or zones, depending on the service.
4. Click **Add to invoice**. The service appears as a new line in the invoice table. Repeat to add more services.
5. Click **Create invoice** to produce the invoice preview with the customer details shown above the table.
6. Click **Clear all** to reset the form and the invoice.

Each line can be removed from the invoice using the button in the last column of the table.

**Validation**

The form uses `novalidate` and checks inputs with JavaScript. Error messages appear under the relevant field for the customer name, email address, service and quantity.

**Calculation rules**

| Rule | Value |
| --- | --- |
| Currency | South African rand (ZAR) |
| Discount for 3 to 5 units | 5% |
| Discount for 6 or more units | 10% |
| VAT | 15%, added after discounts |

For each line the calculator works out:

```
line subtotal = quantity × unit price
discount      = line subtotal × discount rate   (by quantity)
line total    = line subtotal − discount
```

The invoice footer then shows the **Subtotal**, total **Discounts**, **VAT (15%)** and **Total due**.

**Worked example**

4 lawn mowing visits at R250.00:

- Subtotal: 4 × R250.00 = R1,000.00
- Discount (5%): −R50.00
- After discount: R950.00
- VAT (15%): R142.50
- **Total due: R1,092.50**

### Contact form

Located on `contact.html` and handled by `js/main.js`.

Fields: full name, email address, mobile number, topic (Book a visit, Get a quote, Special request, Other) and message.

- Each field is validated in the browser and shows an inline error message when something is missing or invalid.
- On a valid submission the page displays a confirmation message.
- The form does **not** send data anywhere. See [Limitations](#limitations).

## Services and pricing

All prices are in rand and exclude VAT. Prices are defined in `js/fees.js` for the calculator and written out in `services.html` and the individual service pages.

| Service | Unit | Price (excl. VAT) |
| --- | --- | --- |
| Garden maintenance | per visit | R350.00 |
| Lawn mowing and edging | per visit | R250.00 |
| Hedge and tree trimming | per visit | R450.00 |
| Landscaping | per day | R1,200.00 |
| Irrigation installation | per zone | R900.00 |

## Run locally

1. Open the project folder in VS Code.
2. Install the **Live Server** extension if you do not already have it.
3. Right-click `index.html` and choose **Open with Live Server**.

Any other local static web server also works, for example `python -m http.server` run from the project folder.

## Publish with GitHub Pages

1. Push the site to a GitHub repository.
2. Open **Settings > Pages**.
3. Deploy from the `main` branch, using the repository root (`/`) as the source.

## Customising the site

- **Change a price or add a service:** edit the service definitions in `js/fees.js`, then update `services.html` and the matching service page so the displayed prices stay in sync.
- **Change discount tiers or VAT:** edit the rules in `js/fees.js`, then update the wording on `services.html` and `fees.html`.
- **Edit navigation or footer:** edit `js/main.js`.
- **Change colours, fonts or layout:** edit `css/style.css`. The Poppins font is loaded from Google Fonts in the `<head>` of each page.
- **Business details:** the phone number, email address, opening hours and map are in `contact.html`.

## Limitations

- The contact form validates input and shows a confirmation, but it does not send messages to a server. To receive messages, connect it to a form service or backend.
- The invoice is a preview in the browser only. It is not saved or emailed.
- The site loads Google Fonts and an OpenStreetMap embed, so those parts need an internet connection.
- "Hedge and tree trimming" and "Irrigation installation" appear in the services table and calculator but do not have their own pages. They link to the maintenance and landscaping pages respectively.
