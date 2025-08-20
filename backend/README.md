# Backend system operations planning:

## Entities:

### Item:

**Operations on the items:**

- get items (without the stock quantity);
- get items (with the stock quantity and returning the entity StockGroup);
- create item (with stock quantity equals zero);
- update item (keeping the same stock quantity);
- remove item;

**Operations on items stock:**

- add stock quantity on an existing item;
- remove stock quantity on an existing item;
- get items based on stock group entity;

### Item Category:

**Operations on the item categories:**

- get the item categories;
- add item category;
- update item category;
- remove item category;

### Supplier:

**Operations on the suppliers:**

- get the suppliers;
- add supplier;
- update supplier;
- remove supplier;

### Customer:

**Operations on the customers:**

- get the customers;
- add customer;
- update customer;
- remove customer;

### Service Purchase:

**Operations on the service purchases:**

- get the service purchases;
- add service purchase;
- update service purchase;
- remove service purchase;

### Product Purchase:

**Operations on the product purchases:**

- get the product purchases;
- add product purchase;
- update product purchase;
- remove product purchase;

### Service Sale:

**Operations on the service sales:**

- get the service sales;
- add service sale;
- update service sale;
- remove service sale;

### Product Sale:

**Operations on the product sales:**

- get the product sales;
- add product sale;
- update product sale;
- remove product sale;

### User:

**Operations on the users:**

- get the users;
- add user;
- update user (password);
- remove user;
- authentication;
