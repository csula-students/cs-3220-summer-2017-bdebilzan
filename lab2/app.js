// single state store

class Store {

    constructor(storage) {
        this.storage = storage; // assuming local storage will be passed in as storage

        //key names to use in Store
        this.CART_KEY = 'CART';
        this.QUEUE_KEY = 'QUEUE';
        this.FOODS_KEY = 'FOODS';
    }

    // you can get item by store.cartItems
    get cartItems() {
        //return store.cartItems; //added*
        return JSON.parse(this.storage.getItem(this.CART_KEY));
    }

    // to call setter, simply "assign" like store.cartItems = something
    set cartItems(cartItems) {
        //store.cartItems = storedCartItems; //added*
        this.storage.setItem(this.CART_KEY, JSON.stringify(cartItems));
    }

    get queue() {
        // return store.queue;
        return JSON.parse(this.storage.getItem(this.QUEUE_KEY));
    }

    set queue(queue) {
        this.storage.setItem(this.QUEUE_KEY, JSON.stringify(queue));
        // store.queue = storedQueue;
    }

    get foods() {
        // return store.foods; //added*
        return JSON.parse(this.storage.getItem(this.FOODS_KEY));
    }

    set foods(foods) {
        // store.foods = storedFoods;
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
    }

    init() {
        // Render a list of items under root element
        // this.root.addEventListener('click', this.onClick); //added*
        this.render();
        // TODO: attach all necessary events
    }

    destroy() {
        // TODO: remove all the events attached from init
        // this.root.removeEventListener('click', this.onClick); //added*
        //tbody.innerHTML = '';
    }

    // remove an item from shopping cart
    removeItem(item) {
        // TODO: logic to remove an item from cart
        // call render method when the item is removed to update view
        if (this.items != null) {
            var updated_list = [];
            var to_compare = item.name;
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].name != to_compare) {
                    updated_list.splice(i, 1);
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


    //var remove = items.indexOf(item);
    //items.splice(remove, 1);
    //this.render();

    placeOrder() {
        // add item to statuses and store as status "in progress"
        console.log("Your order is ready.");
    }

    // render a list of item under root element
    render() {
        //console.log(this.store.cartItems);
        let tbody = this.root.querySelector('tbody');
        // using innerHTML to render a list of table row item under tbody
        tbody.innerHTML = '';// this.renderListAsHTML(this.store.cartItems)
        if (this.items === null) {
            this.items = [];
        }
        else if (this.items.length == 0) {
            tbody.innerHTML += `
            <tr class = "cart-table">
            <td class = "cart-table">
            <h3>Add something to the cart</h3>
            </td>
            </tr>`
            return;
        }

        for (var i = 0; i < this.items.length; i++) {
            var item_name = this.items[i].name;
            var item_price = Number(this.items[i].price);

            tbody.innerHTML +=
            `<tr class="cart-table">
            <td class="cart-table">
            <h3>${item_name}</h3>
            
            </td>
            <td class="cart-table">
            <h3>${item_price}</h3>
            </td>
            <td class="cart-table">
            <button class="delete-button" data-name=${item_name} data-index=${i}>Remove all items from cart</button>
            </td>
            </tr>`;
        }
        /*let deleteButtons = this.root.querySelectorAll('.delete-button');
        let fakeList = [{name: 'test', price: 9.99}, {name: 'test2', price: 9.59}];
        for(var i = 0; i < deleteButtons; i++)
        {
            let deleteBtn = deleteButtons[i];
            let scopedFakeList = fakeList;
            deleteBtn.addEventListener('click', () =>
            {
                scopedFakeList.splice(0,1);
                alert('You are deleting' + deleteBtn);
            });
        }*/
        let removeButtons = document.querySelectorAll('.delete-button');
        for (var i = 0; i < removeButtons.length; i++) {
            let btn = removeButtons[i];
            btn.addEventListener('click', () => {
                let item = this.items[parseInt(btn.dataset.index)];
                this.removeItem(item);
            });
        }

    }
}

class RemoveButton {
    constructor(root, store, cart) {
        this.root = root;
        this.store = store;
        this.cart = cart;
        this.onClick = () => this.cart.removeItem(this.root.dataset.name);
        this.init();
    }

    init() {
        this.root.addEventListener("click", this.onClick);
    }

    destroy() {
        this.root.removeEventListener("click", this.onClick);
    }

}

class ClearStatusButton {
    constructor(root, store, cart) {
        this.root = root;
        this.store = store;
        this.cart = cart;
        this.onClick = () => this.clearStatuses();
        this.init();
    }

    init() {
        this.root.addEventListener("click", this.onClick);
    }

    destroy() {
        this.root.removeEventListener("click", this.onClick);
    }

    clearStatuses() {
        let status = document.querySelector(".status_table");
    }
}


//input is a list of cart items (that were added through checkout button)
//output is a String (which is HTML itself)


/*
	 * Input is a list of cart items (that were added through checkout button)
	 *
	 * Output is a String (which is HTML itself)
	 */
//renderListAsHTML(list) {
//	// replace with the for loop
//	let result = '<tr><td>Name</td><td>Price</td><td><button class="delete-button" data-id="0">Delete</button></td></tr>';
//	return result;
//}
/**
 * Class CartItem {
 *   String name;
 *   double price;
 * }
 *
 * public String rednerListAsHTML(List<CartItem> list) {
 *   // loop through the list and add it to single string
 *   String result = "";
 *   for (int i = 0; i < list.size(); i ++) {
 *     result += list.get(i).name + "-" + this.get(i).price;
 *   }
 *   return result;
 * }
 */
//}

class CheckoutButton {
    constructor(root, store) {
        this.root = root;
        this.store = store;
        this.onClick = () => this.addItemToCart();
        this.init();
    }

    init() {
        this.root.addEventListener('click', this.onClick); //added*
    }

    destroy() {
        this.root.removeEventListener('click', this.onClick); //added*
    }

    addItemToCart() {
        // hint: you can use `dataset` to access data attributes
        // See passing data from HTML to JavaScript from course note
        let cartItems = this.store.cartItems || [];
        // TODO: replace with actual item
        var new_cart_item = true;

        // for (var i = 0; i < cartItems.length; i++) {
        //     // go through each item name in cartItems. If they match, increase the quantity of existing item in cartItems by 1. Otherwise, add the item as a new entry in cartItems.
        //     var existing_cart_item_name = cartItems[i][0]
        //     if (this.root.dataset.name === existing_cart_item_name) {
        //         var amount_to_add = Number(this.root.dataset.price);
        //         cartItems[i][1] += amount_to_add;
        //         new_cart_item = false;
        //     }
        // }
        
        // if (new_cart_item) {
        //     cartItems.push([this.root.dataset.name, Number(this.root.dataset.price)]);
        // }
        // this.store.cartItems = cartItems;
        // console.log(this.store.carItems);
        // TODO: replace with actual item
        console.log(this.root.dataset);
        cartItems.push({
            name: this.root.dataset.name,
            price: Number(this.root.dataset.price)
        });
        console.log(cartItems);
        this.store.cartItems = cartItems;

        //console.log(this.root.dataset);
        //let d = new Date();
        //cartItems.push({
        // imgsrc: '<img src="SoySearedSalmon copy 2.png" width="400" height="300" alt="">',
        // name: '<p>Ginger Sesame Glazed Salmon</p>',
        //name: 'test',
        // price: '<p>$18.00</p>',
        // date: d.DatetoString(),
        // customer: 'Bryce',
        // status: 'In Progress',
        // });
        // console.log(cartItems);
        // this.store.cartItems = cartItems;
    }
}

class StatusTable {
    // take dom element into JavaScript class to attachment events
    constructor(root, store) {
        this.root = root;
        this.store = store;
        init();
    }

    init() {
        // attach click event listener to table header row on each column
        // this.root.addEventListener('click', this.onClick); //added*
        /*let created = document.querySelector('#createdheader');
         createdheader.addEventListener("click", sort(date));
         let itemheader = document.querySelector('#itemheader');
         itemheader.addEventListener("click", sort(name));
         let customerheader = document.querySelector('#customerheader');
         customerheader.addEventListener("click", sort(customer));
         let statusheader = document.querySelector('#statusheader');
         statusheader.addEventListener("click", sort(status));*/
        render();
    }

    destroy() {
        // remove all the events attached from init
        //  this.root.removeEventListener('click', this.onClick); //added*
        // tbody.innerHTML = '';
    }

    sort(columnName) {
        // after sorting the array of statuses, re render item to update view
        // dynamicSort(columnName);
        render();
    }

    // render rows of items under table using root.innerHTML
    render() {
        //  console.log(this.store.cartItems);
        // let tbody = this.root.querySelector('tbody');
        // tbody.innerHTML = `<tr class="item">
        //   <td><p>'items.date'</p></td>
        //   <td>'items.imgsrc'<br />'items.name'</td>
        // <td>'items.customer'</td>
        //      <td>'items.status'</td>
        //  </tr>`;
    }
}

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

// DOMContentLoaded event will allow us to run the following function when
// everything is ready. Think of the following code will only be executed by
// the end of document
document.addEventListener('DOMContentLoaded', () => {
    // use querySelector to find the table element (preferably by id selector)
    // let statusTable = document.querySelector('');
    // use querySelector to find the cart element (preferably by id selector)
    let cart = document.querySelector('.cart-table');
    //let statusTable = document.querySelector('.status-table');
    let checkoutButtons = document.querySelectorAll('.checkout-button');

    //consolee.log(cart);
    // console.log(checkoutButtons);

    let store = new Store(window.localStorage);
    //if (table) {
    //    new StatusTable(table, store);
    //}
    if (cart) {
        new Cart(cart, store);
    }
    if (checkoutButtons && checkoutButtons.length) {
        for (var i = 0; i < checkoutButtons.length; i++) {
            new CheckoutButton(checkoutButtons[i], store);
        }
    }
});