# Inventory Management System - CRUD

## Overview
This project is a simple **Inventory Management System** built using **HTML**, **CSS**, and **JavaScript**. It allows users to perform **CRUD (Create, Read, Update, Delete)** operations on inventory items, which are stored locally in the browser using **localStorage**. The system allows users to manage product data including title, category, count, price, taxes, ads, and discounts, with calculations for the total price.

## Features

- **Create**: Add new products to the inventory with relevant details (title, category, count, price, taxes, ads, and discount).
- **Read**: View the inventory in a table format, with options to update or delete individual products.
- **Update**: Edit the details of an existing product in the inventory.
- **Delete**: Remove individual products from the inventory or delete all items at once.
- **Search**: Filter and search inventory based on different attributes such as title, category, count, price, taxes, ads, and discount.

## Installation

1. Clone the repository or download the files.
2. Open the `index.html` file in a web browser to view and interact with the system.

## How It Works

### 1. **Creating New Products**
   - Enter the details of the product in the input fields (`Title`, `Category`, `Count`, `Price`, `Taxes`, `Ads`, `Discount`).
   - The **Total** is automatically calculated based on the price, taxes, ads, and discount.
   - Press the **Create** button to save the new product to the local storage and display it in the inventory list.

### 2. **Updating Existing Products**
   - Click on the **Update** button next to a product in the inventory table.
   - The form fields will be populated with the current values of that product, allowing you to update the details.
   - After making changes, click the **Update** button to save the updated data.

### 3. **Deleting Products**
   - Enter a value in the delete input field corresponding to the product count.
   - If the value matches the product count, the product is deleted from the inventory.
   - If the value is less than the count, the count is reduced accordingly.
   - Click **Delete All** to remove all products from the inventory.

### 4. **Searching Products**
   - Use the **Search** field to filter products by different attributes like title, category, count, price, taxes, etc.
   - You can specify a range for numeric values (like price or count) using the **From** and **To** fields.

## Files Structure

- `index.html`: The main HTML file with the structure of the inventory management system.
- `style.css`: The CSS file for styling the layout and design of the application.
- `main.js`: The JavaScript file containing the logic for CRUD operations, product calculations, and localStorage management.

## Technologies Used

- **HTML**: For the structure and content of the page.
- **CSS**: For styling the page.
- **JavaScript**: For the dynamic functionality including CRUD operations and calculations.

## Local Storage
The inventory data is stored in the browser's **localStorage**, so the data persists even when the page is reloaded. Each product has an `id`, which is used to uniquely identify and manage it.

## How to Use

1. Open the `index.html` file in your browser.
2. To create a new product, fill in the details and click **Create**.
3. View the products in the inventory table, and use the **Update** or **Delete** options as needed.
4. Use the **Search** feature to filter products by attributes.

## Example Workflow

1. Add a product with the title "Laptop", category "Electronics", count "5", price "500", taxes "50", ads "20", and discount "30".
2. The system will calculate the total price, and the product will appear in the inventory.
3. You can update the product details or delete it as required.

## Conclusion

This simple Inventory Management System demonstrates how to use localStorage for persistent data storage and provides basic CRUD functionality. It's an excellent example for anyone looking to implement similar systems in a front-end application.

---