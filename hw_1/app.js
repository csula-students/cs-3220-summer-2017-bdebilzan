
// single state store
class Store {
    constructor (storage) {
        this.storage = storage; // assuming local storage will be passed in as storage
        // these are the key name you can use in Store
        this.CART_KEY = 'CART';
        this.QUEUE_KEY = 'QUEUE';
        this.FOODS_KEY = 'FOODS';
    }

    // you can get item by store.cartItems
    get cartItems () {
        return JSON.parse(this.storage.getItem(this.CART_KEY));
    }

    // to call setter, simply "assign" like store.cartItems = something
    set cartItems (cartItems) {
        this.storage.setItem(this.CART_KEY, JSON.stringify(cartItems));
    }

    get queue () {
        return JSON.parse(this.storage.getItem(this.QUEUE_KEY));
    }

    set queue (queue) {
        this.storage.setItem(this.QUEUE_KEY, JSON.stringify(queue));
    }

    get foods () {
        return JSON.parse(this.storage.getItem(this.FOODS_KEY));
    }

    set foods (foods) {
        this.storage.setItem(this.FOODS_KEY, JSON.stringify(foods));
    }
}

class Cart {
    // take dom element into JavaScript class to attachment events
    constructor(root, store) {
        this.root = root;
        this.store = store;
        this.items = this.store.cartItems;
        this.init();
        this.order_placed = false;
    }

    init () {
        // Render a list of items under root element
        this.render();
        // TODO: attach remove cart items to rendered HTML
        // All EventListeners are found in render() --> removeButton, removeAllButton, confirmOrderButton. 
    }

    destroy () {
        // TODO: remove all the events attached from init
        let removeButtons = document.querySelectorAll('.remove_button');
        for (var i = 0; i < removeButtons.length; i++) {
            let btn = removeButtons[i];
            btn.removeEventListener('click', () => {
                let item = this.items[parseInt(btn.dataset.index)];
                this.removeItem(item);
            });
        }

        let removeAllButton = document.querySelector('.remove_all_button');
        removeAllButton.removeEventListener('click', () => {
            this.removeAllItems();
        });

        let confirmOrderButton = document.querySelector('.confirm_order_button');
        confirmOrderButton.removeEventListener('click', () => {
            this.placeOrder();
        });
    }

    // remove an item from shopping cart
    removeItem (item) {
        // TODO: logic to remove an item from cart
        if (this.items != null) {
            var updated_list = [];
            var to_compare = item[0];
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i][0] != to_compare) {
                    updated_list.push(this.items[i]);
                }
            }
            this.store.cartItems = updated_list;
            this.items = updated_list;
        }
        this.render();
    }

    removeAllItems() {
        this.store.cartItems = [];
        this.items = [];
        this.render();
    }

    placeOrder () {
        // add item to statuses in store as status "in progress"
        if (this.items !== null) {
            var newQueueItems = [];

            if (this.store.queue !== null) {
                for (var i = 0; i < this.store.queue.length; i++) {
                    newQueueItems.push(this.store.queue[i]);
                }
            }
        
            for (var i = 0; i < this.items.length; i++) {
                var new_item_added = true;
                for (var j = 0; j < newQueueItems.length; j++) {
                    var existing_queue_item_name = newQueueItems[j][0];
                    if (this.items[i][0] === existing_queue_item_name) {
                        var amount_to_add = Number(this.items[i][2]);
                        newQueueItems[j][2] += amount_to_add;
                        new_item_added = false;
                    }
                }
                if (new_item_added) {
                    newQueueItems.push([this.items[i][0], this.items[i][1], Number(this.items[i][2])]);
                }
            }
            this.store.queue = newQueueItems;
            this.order_placed = true;
            this.removeAllItems();
        }
    }

    // render a list of item under root element
    render () {
        this.items = this.store.cartItems;
        let tbody = this.root.querySelector('tbody');
        // using innerHTML to render a list of table row item under tbody
        tbody.innerHTML = ``;
        if (this.items === null) {
            this.items = [];
        } else if ((this.items.length == 0) && (this.order_placed)) {
            tbody.innerHTML += 
            `<tr class="cart-table">
                <td class="cart-table">
                    <p class="title">Purchase Made Successfully</p>
                    <p>See your purchase <a href="statuses.html" class="link">here</a>.</p>
                </td>
            </tr>`; 
            this.order_placed = false;
            return;
        } else if (this.items.length == 0) {
            tbody.innerHTML +=
            `<tr class="cart-table">
                <td class="cart-table">
                    <p>(No food in cart)</p>
                </td>
            </tr>`; 
            return;
        }
        for (var i = 0; i < this.items.length; i++) {
            // for each item in cartItems, create a row with the item name and image in one cell, and then a box of quantity in the other cell.
            var item_name = this.items[i][0];
            var image_name = this.items[i][1];
            var item_quantity = Number(this.items[i][2]);

            tbody.innerHTML +=
                `<tr class="cart-table">
                    <td class="cart-table">
                        <h4>${item_name}</h4>
                        <img src=${image_name} class="small">
                    </td>
                    <td class="cart-table">
                        <h4>${item_quantity}</h4>
                    </td>
                    <td class="cart-table">
                        <button class="remove_button" data-name=${item_name} data-index=${i}>Remove Order</button>
                    </td>
                </tr>`;
        }

        tbody.innerHTML += 
            `<tr class="cart-table">
                <td class="cart-table" colspan="3">
                    <button class="remove_all_button">Clear All Orders</button>
                    <br><br>
                    <button class="confirm_order_button">Purchase</button>
                </td>
            </tr>`;
        
        let removeButtons = document.querySelectorAll('.remove_button');
        for (var i = 0; i < removeButtons.length; i++) {
            let btn = removeButtons[i];
            btn.addEventListener('click', () => {
                let item = this.items[parseInt(btn.dataset.index)];
                this.removeItem(item);
            });
        }

        let removeAllButton = document.querySelector('.remove_all_button');
        removeAllButton.addEventListener('click', () => {
            this.removeAllItems();
        });

        let confirmOrderButton = document.querySelector('.confirm_order_button');
        confirmOrderButton.addEventListener('click', () => {
            this.placeOrder();
        });
    }
}    

class CheckoutButton {
    constructor(root, store, cart) {
        this.root = root;
        this.store = store;
        this.onClick = () => this.addItemToCart();
        this.init();
        this.cart = cart;
    }

    init () {
        this.root.addEventListener("click", this.onClick);
    }

    destroy () {
        this.root.removeEventListener("click", this.onClick);
    }

    addItemToCart () {
        // hint: you can use `dataset` to access data attributes
        // See passing data from HTML to JavaScript from course note
        let cartItems = this.store.cartItems || [];
        // TODO: replace with actual item
        var new_cart_item = true;
        for (var i = 0; i < cartItems.length; i++) {
            // go through each item name in cartItems. If they match, increase the quantity of existing item in cartItems by 1. Otherwise, add the item as a new entry in cartItems.

            var existing_cart_item_name = cartItems[i][0];
            if (this.root.dataset.name === existing_cart_item_name) {
                var amount_to_add = Number(this.root.dataset.quantity);
                cartItems[i][2] += amount_to_add;
                new_cart_item = false;
            }
        }
        if (new_cart_item) {
            cartItems.push([this.root.dataset.name, this.root.dataset.image, Number(this.root.dataset.quantity)]);
        }

        this.store.cartItems = cartItems;
        this.cart.render();
    }
}

class StatusTable {
    // take dom element into JavaScript class to attachment events
    constructor(root, store) {
        this.root = root;
        this.store = store;
        this.init();
    }

    init () {
        // attach click event listener to table header row on each column
        this.render();
    }

    destroy () {
        // remove all the events attached from init
        let clearHistoryButton = document.querySelector('.clear_history_button');
        clearHistoryButton.removeEventListener('click', () => {
            this.clearHistory();
        });
    }

    sort (columnName) {
        // after sorting the array of statuses, re render item to update view
        if (columnName === "name_ascending") {
            var final_sorted_queue = [];
            for (var i = 0; i < this.store.queue.length; i++) {
                var current_item = this.store.queue[i];
                if (i == 0) {
                    final_sorted_queue.push(current_item);
                } else {
                    // second item must compare to all items in new queue
                    var newly_sorted_queue = [];
                    var item_in_sort_position = false;
                    for (var j = 0; j < final_sorted_queue.length; j++) {
                        // item in appropriate position, all remaining items in the final_sorted_queue can go to the end
                        if (item_in_sort_position) {
                            newly_sorted_queue.push(final_sorted_queue[j]);
                            continue;
                        }

                        if (current_item[0] < final_sorted_queue[j][0]) {
                            newly_sorted_queue.push(current_item);
                            newly_sorted_queue.push(final_sorted_queue[j]);
                            item_in_sort_position = true;
                        } else {
                            newly_sorted_queue.push(final_sorted_queue[j]);
                            // if the last item was compared, and current_item is actually supposed to be the last one
                            if (j == (final_sorted_queue.length - 1)) {
                                newly_sorted_queue.push(current_item);
                            }
                        }
                    }
                    final_sorted_queue = newly_sorted_queue; 
                }
            }
            this.store.queue = final_sorted_queue;
        }
        if (columnName === "name_descending") {
            var final_sorted_queue = [];
            for (var i = 0; i < this.store.queue.length; i++) {
                var current_item = this.store.queue[i];
                if (i == 0) {
                    final_sorted_queue.push(current_item);
                } else {
                    // second item must compare to all items in new queue
                    var newly_sorted_queue = [];
                    var item_in_sort_position = false;
                    for (var j = 0; j < final_sorted_queue.length; j++) {
                        // item in appropriate position, all remaining items in the final_sorted_queue can go to the end
                        if (item_in_sort_position) {
                            newly_sorted_queue.push(final_sorted_queue[j]);
                            continue;
                        }

                        if (current_item[0] > final_sorted_queue[j][0]) {
                            newly_sorted_queue.push(current_item);
                            newly_sorted_queue.push(final_sorted_queue[j]);
                            item_in_sort_position = true;
                        } else {
                            newly_sorted_queue.push(final_sorted_queue[j]);
                            // if the last item was compared, and current_item is actually supposed to be the last one
                            if (j == (final_sorted_queue.length - 1)) {
                                newly_sorted_queue.push(current_item);
                            }
                        }
                    }
                    final_sorted_queue = newly_sorted_queue; 
                }
            }
            this.store.queue = final_sorted_queue;
        }

        if (columnName === "quantity_ascending") {
            var final_sorted_queue = [];
            for (var i = 0; i < this.store.queue.length; i++) {
                var current_item = this.store.queue[i];
                if (i == 0) {
                    final_sorted_queue.push(current_item);
                } else {
                    // second item must compare to all items in new queue
                    var newly_sorted_queue = [];
                    var item_in_sort_position = false;
                    for (var j = 0; j < final_sorted_queue.length; j++) {
                        // item in appropriate position, all remaining items in the final_sorted_queue can go to the end
                        if (item_in_sort_position) {
                            newly_sorted_queue.push(final_sorted_queue[j]);
                            continue;
                        }

                        if (current_item[2] < final_sorted_queue[j][2]) {
                            newly_sorted_queue.push(current_item);
                            newly_sorted_queue.push(final_sorted_queue[j]);
                            item_in_sort_position = true;
                        } else {
                            newly_sorted_queue.push(final_sorted_queue[j]);
                            // if the last item was compared, and current_item is actually supposed to be the last one
                            if (j == (final_sorted_queue.length - 1)) {
                                newly_sorted_queue.push(current_item);
                            }
                        }
                    }
                    final_sorted_queue = newly_sorted_queue; 
                }
            }
            this.store.queue = final_sorted_queue;
        }
        if (columnName === "quantity_descending") {
            var final_sorted_queue = [];
            for (var i = 0; i < this.store.queue.length; i++) {
                var current_item = this.store.queue[i];
                if (i == 0) {
                    final_sorted_queue.push(current_item);
                } else {
                    // second item must compare to all items in new queue
                    var newly_sorted_queue = [];
                    var item_in_sort_position = false;
                    for (var j = 0; j < final_sorted_queue.length; j++) {
                        // item in appropriate position, all remaining items in the final_sorted_queue can go to the end
                        if (item_in_sort_position) {
                            newly_sorted_queue.push(final_sorted_queue[j]);
                            continue;
                        }

                        if (current_item[2] > final_sorted_queue[j][2]) {
                            newly_sorted_queue.push(current_item);
                            newly_sorted_queue.push(final_sorted_queue[j]);
                            item_in_sort_position = true;
                        } else {
                            newly_sorted_queue.push(final_sorted_queue[j]);
                            // if the last item was compared, and current_item is actually supposed to be the last one
                            if (j == (final_sorted_queue.length - 1)) {
                                newly_sorted_queue.push(current_item);
                            }
                        }
                    }
                    final_sorted_queue = newly_sorted_queue; 
                }
            }
            this.store.queue = final_sorted_queue;
        }
        this.render();
    }

    clearHistory() {
        this.store.queue = [];
        this.render();
    }

    // render rows of items under table using root.innerHTML
    render () {
        let tbody = this.root.querySelector('tbody');
        // using innerHTML to render a list of table row item under tbody
        tbody.innerHTML = ``;
        if (this.store.queue === null) {
            this.store.queue = [];
        } 
        if (this.store.queue.length == 0) {
            tbody.innerHTML +=
            `<tr class="order_status_table">
                <td class="order_status_table" >
                    <p>You haven't purchased anything<br>
                    Buy something <a href="menu.html" class="link">here</a>.</p>
                </td>
            </tr>`; 
            return;
        }

        tbody.innerHTML += 
            `<tr class="order_status_table">
                <td class="order_status_table title">Food Item</td>
                <td class="order_status_table title">Quantity</td>
                <td class="order_status_table title">Status</td>
            </tr>`;

        for (var i = 0; i < this.store.queue.length; i++) {
            // for each item in local storage's QUEUE, create a row with a cell for the item name and image, a cell for quantity, and a cell for status (In Progress for now).
            var item_name = this.store.queue[i][0];
            var image_name = this.store.queue[i][1];
            var item_quantity = Number(this.store.queue[i][2]);

            tbody.innerHTML +=
                `<tr class="order_status_table">
                    <td class="order_status_table">
                        <h4>${item_name}</h4>
                        <img src=${image_name} class="small">
                    </td>
                    <td class="order_status_table">
                        <h4>${item_quantity}</h4>
                    </td>
                    <td class="order_status_table">
                        <h4>In Progress</h4>
                    </td>
                </tr>`;
        }

        tbody.innerHTML += 
            `<tr class="cart-table">
                <td class="cart-table" colspan="3">
                    <button class="clear_history_button">Clear All History</button>
                    <br>
                    <br>
                    <button class="sort_ascending_button">Sort By Ascending Name</button>
                    <br>
                    <br>
                    <button class="sort_descending_button">Sort By Descending Name</button>
                    <br>
                    <br>
                    <button class="sort_ascending_quantity_button">Sort By Ascending Quantity</button>
                    <br>
                    <br>
                    <button class="sort_descending_quantity_button">Sort By Descending Quantity</button>
                </td>
            </tr>`;

        let clearHistoryButton = document.querySelector('.clear_history_button');
        clearHistoryButton.addEventListener('click', () => {
            this.clearHistory();
        });
        let sortAscendingButton = document.querySelector('.sort_ascending_button');
        sortAscendingButton.addEventListener('click', () => {
            this.sort("name_ascending");
        });
        let sortDescendingButton = document.querySelector('.sort_descending_button');
        sortDescendingButton.addEventListener('click', () => {
            this.sort("name_descending");
        });
        let sortAscendingQuantityButton = document.querySelector('.sort_ascending_quantity_button');
        sortAscendingQuantityButton.addEventListener('click', () => {
            this.sort("quantity_ascending");
        });
        let sortDescendingQuantityButton = document.querySelector('.sort_descending_quantity_button');
        sortDescendingQuantityButton.addEventListener('click', () => {
            this.sort("quantity_descending");
        });
    }
}

// continue from Lab2 with Store, CheckoutButton, Cart components
class Inventory {
    constructor(root, store) {
        this.root = root;
        this.store = store;
        this.init();
    }

    init () {
        this.render();
        // TODO: attach event listeners like click to remove items after rendering
        /* Event listeners added in render() function */
    }

    destroy () {
        // TODO: remove event listeners added from the init above
        let inventoryAddDefaultButton = document.querySelector('.inventory_add_default_button');
        if (inventoryAddDefaultButton) {
            inventoryAddDefaultButton.removeEventListener("click", () => {
                this.addDefaultItems();
            });
        }

        let removeInventoryButtons = document.querySelectorAll('.remove_inventory_button');
        for (var i = 0; i < removeInventoryButtons.length; i++) {
            let btn = removeInventoryButtons[i];
            btn.removeEventListener('click', () => {
                let item = this.store.foods[parseInt(btn.dataset.index)];
                this.removeItem(item);
            });
        }
    }

    removeItem (itemName) {
        // TODO: function to remove item given item name from store
        if (this.store.foods !== null) {
            var updated_list = [];
            var to_compare = itemName.name;
            for (var i = 0; i < this.store.foods.length; i++) {
                if (this.store.foods[i].name !== to_compare) {
                    updated_list.push(this.store.foods[i]);
                }
            }
            this.store.foods = updated_list;
        }
        this.render();
    }

    addDefaultItems() {
        let storeFoods = this.store.foods || [];

        var salmon = {name: "Ginger Sesame Glazed Salmon", image: "../images/SoySearedSalmon.png", description: "$20 <br> <i> The salmon is sliced and marinated, then cooked in sesame oil. Served with sauce on the side and chopped fresh cilantro sprinkled on top. Garnished with black sesame seeds.</i>"};
        var chicken = {name: "Hasselback Marinara Chicken", image: "../images/HasselbackMarinaraChicken.jpg", description: "$18 <br> <i> The chicken breasts are sliced accordion style and stuffed with spinach and cheeses. Topped with tomato sauce and mozzarella.</i>"};
        var nachos = {name: "Nacho Steak Skillet", image: "../images/NachoSteakSkillet.jpg", description: "$16 <br> <i> This nacho steak skillet features roasted cauliflower, thin sliced steak, cheese, and lots of fun nacho toppings.</i>"};
        var updated_item_list = [salmon, chicken, nachos];

        var is_new_food = true;
        for (var i = 0; i < storeFoods.length; i++) {
            var is_new_food = true;
            for (var j = 0; j < updated_item_list.length; j++) {
                if (storeFoods[i].name === updated_item_list[j].name) {
                    is_new_food = false;
                    break;
                }
            }
            if (is_new_food) {
                updated_item_list.push(storeFoods[i]);
            }
        }
        this.store.foods = updated_item_list;
        this.render();
    }

    render () {
        // using innerHTML to render inventory listing
        let tbody = this.root.querySelector('tbody');
        // using innerHTML to render a list of table row item under tbody
        tbody.innerHTML = ``;

        // display message to add more liquor if there is no new recipes
        if (this.store.foods === null) {
            this.store.foods = [];
        } 
        // display all of the user-submitted brews
        for (var i = 0; i < this.store.foods.length; i++) {
            // for each item in local storage's FOODS, create a row with a cell for the item name and image, and one for description.
            var food_name = this.store.foods[i].name;
            var food_image = this.store.foods[i].image;
            var food_description = this.store.foods[i].description;

            tbody.innerHTML +=
                `<tr class="horizontal">
                    <td class="horizontal"><h3>${food_name}</h3>
                        <img class="small" src=${food_image}>
                    </td>
                    <td><p>${food_description}</p>
                    </td>
                    <td class="horizontal">
                        <button class="remove_inventory_button" data-index=${i}>Remove</button>
                     </td>
                  </tr>`;
        }

        tbody.innerHTML += 
        `<tr class="horizontal">
            <td class="horizontal" colspan="3"><p><a href="create-food-item.html" class="link">Add more food</a></p>
                <button class="inventory_add_default_button">Restore back to original food items</button>
            </td>
        </tr>`; 

        let inventoryAddDefaultButton = document.querySelector('.inventory_add_default_button');
        if (inventoryAddDefaultButton) {
            inventoryAddDefaultButton.addEventListener("click", () => {
                this.addDefaultItems();
            });
        }

        let removeInventoryButtons = document.querySelectorAll('.remove_inventory_button');
        for (var i = 0; i < removeInventoryButtons.length; i++) {
            let btn = removeInventoryButtons[i];
            btn.addEventListener('click', () => {
                let item = this.store.foods[parseInt(btn.dataset.index)];
                this.removeItem(item);
            });
        }
    }
}

class Menu {
    constructor(root, store, cart) {
        this.root = root;
        this.store = store;
        this.cart = cart;
        this.init();
    }

    init () {
        this.render();
    }

    render () {
        // TODO: render a list of food menu from store using innerHTML
        let tbody = this.root.querySelector('tbody');

        for (var i = 0; i < this.store.foods.length; i++) {
            // for each item in local storage's FOODS, create a row with a cell for the item name and image, and one for description.
            var food_name = this.store.foods[i].name;
            var food_image = this.store.foods[i].image;
            if (food_image.startsWith("../")) {
                food_image = food_image.slice(3);
            }
            var food_description = this.store.foods[i].description;

            tbody.innerHTML +=
                `<tr class="horizontal">
                    <td class="horizontal menu1"><h3>${food_name}</h3></td>
                    <td class="horizontal menu2"><img class="medium" src=${food_image}>
                    </td>
                    <td class="horizontal menu3"><p>${food_description}</p>
                    </td>
                    <td class="horizontal menu4">
                        <button class="checkout-button" data-name="${food_name}" data-image="${food_image}" data-quantity=1>Order Food</button>
                     </td>
                  </tr>`;
        }

        let checkoutButtons = document.querySelectorAll('.checkout-button');
        if (checkoutButtons && checkoutButtons.length) {
            for (var i = 0; i < checkoutButtons.length; i++) {
                new CheckoutButton(checkoutButtons[i], this.store, this.cart);
            }
        }
    }
}

class CreateFood {
    constructor(root, store) {
        this.root = root; // root should be the container of the form itself
        this.store = store;
        this.init();
    }

    init () {
        // attach click event to create button
        let createFoodButton = document.getElementById('create_food_button');
        if (createFoodButton) {
            createFoodButton.addEventListener("click", () => {
                this.createFood();
            });
        }
    }

    createFood () {
        // will need to do querySelector to find out every single form element
        // to get their values before creating a new food
        // after creating a new food item, add it to store
        let storeFoods = this.store.foods || [];
        var food_name = document.getElementById('food_name').value;
        var food_image = document.getElementById('food_image').value;
        var food_description = document.getElementById('food_description').value;
        var to_push = {name: food_name, image: food_image, description: food_description};

        if (window.confirm("Are you sure you want to create this food item?") == true) {

            // check to make sure submitted food is actually new
            var is_new_food = true;
            for (var i = 0; i < storeFoods.length; i++) {
                if (to_push.name === storeFoods[i].name) {
                    is_new_food = false;
                    break;
                }
            }
            if (is_new_food) {
                storeFoods.push(to_push);
                this.store.foods = storeFoods;
                document.getElementById("before_food_message").innerHTML = ``;

                document.getElementById("added_food_message").innerHTML = 
                `Added the following food:<br>
                    NAME: ${food_name}<br>
                    IMAGE LINK: ${food_image}<br>
                    DESCRIPTION: ${foood_description}<br>
                    <br>
                    Click <a href="inventory.html" class="link">here</a> to check it out
                `;
            } else {
                document.getElementById("added_brew_message").innerHTML = 
                `Food item already exists in the inventory. Try again`;
            }
        }
    }
}

// DOMContentLoaded event will allow us to run the following function when
// everything is ready. Think of the following code will only be executed by
// the end of document
document.addEventListener('DOMContentLoaded', () => {
    // use querySelector to find the table element (preferably by id selector)
    let statusTable = document.querySelector('.order_status_table');
    // // use querySelector to find the cart element (preferably by id selector)
    let cart = document.querySelector('.cart-table');
    let checkoutButtons = document.querySelectorAll('.checkout-button');

    // finding the form element to createFood
    let createFood = document.querySelector('#create_food_form');
    let inventory = document.querySelector('#inventory_table');
    let menu = document.querySelector('#menu_table');

    let store = new Store(window.localStorage);

    if (statusTable) {
        new StatusTable(statusTable, store);
    }
    if (cart) {
        var cartVar = new Cart(cart, store);
    }
    if (checkoutButtons && checkoutButtons.length) {
        for (var i = 0; i < checkoutButtons.length; i++) {
            new CheckoutButton(checkoutButtons[i], store, cartVar);
        }
    }

    if (createFood) {
        new CreateFood(createFood, store);
    }
    if (inventory) {
        new Inventory(inventory, store);
    }
    if (menu) {
        new Menu(menu, store, cartVar);
    }
});