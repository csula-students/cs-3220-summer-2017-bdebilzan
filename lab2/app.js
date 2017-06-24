// single state store

class Store {

    constructor (storage) {
            this.storage = storage; // assuming local storage will be passed in as storage

            //key names to use in Store
            this.CART_KEY = 'CART';
            this.QUEUE_KEY = 'QUEUE';
            this.FOODS_KEY = 'FOODS';
    }

    // you can get item by store.cartItems
    get cartItems () {
        //return store.cartItems; //added*
        return JSON.parse(this.storage.getItem(this.CART_KEY));
    }

    // to call setter, simply "assign" like store.cartItems = something
    set cartItems (cartItems) {
        //store.cartItems = storedCartItems; //added*
        this.storage.setItem(this.CART_KEY, JSON.stringify(cartItems));
    }

    get queue () {
       // return store.queue;
       return JSON.parse(this.storage.getItem(this.QUEUE_KEY));
    }

    set queue (queue) {
        this.storage.setItem(this.QUEUE_KEY, JSON.stringify(queue));
       // store.queue = storedQueue;
    }

    get foods () {
       // return store.foods; //added*
       return JSON.parse(this.storage.getItem(this.FOODS_KEY));
    }

    set foods (foods) {
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

    init () {
        // Render a list of items under root element
       // this.root.addEventListener('click', this.onClick); //added*
        this.render();
        // TODO: attach all necessary events
    }

    destroy () {
        // TODO: remove all the events attached from init
       // this.root.removeEventListener('click', this.onClick); //added*
       tbody.innerHTML = '';
    }

    // remove an item from shopping cart
    removeItem (item) {
        // TODO: logic to remove an item from cart
        // call render method when the item is removed to update view
        var remove = items.indexOf(item);
        items.splice(remove, 1);
        this.render();
    }

    placeOrder () {
        // add item to statuses in store as status "in progress"
    }

    // render a list of item under root element
    render () {
        console.log(this.store.cartItems);
        let tbody = this.root.querySelector('tbody');
        // using innerHTML to render a list of table row item under tbody
        tbody.innerHTML = `<tr class="item">
            <td>items.imgsrc'<br/>'items.name'</td>
            <td>'items.price'</td>
            <td><input type="checkbox" name="quant" value="dontremove" checked><br></td>
        </tr>`;
    }
}
class CheckoutButton {
    constructor(root, store) {
        this.root = root;
        this.store = store;
        this.onClick = () => this.addItemToCart();
        this.init();
    }

    init () {
         this.root.addEventListener('click', this.onClick); //added*
    }

    destroy () {
        this.root.removeEventListener('click', this.onClick); //added*
    }

    addItemToCart () {
        // hint: you can use `dataset` to access data attributes
        // See passing data from HTML to JavaScript from course note
        let cartItems = this.store.cartItems || [];
        // TODO: replace with actual item
        console.log(this.root.dataset);
        let d = new Date();
        cartItems.push({
            imgsrc: '<img src="SoySearedSalmon copy 2.png" width="400" height="300" alt="">',
            name: '<p>Ginger Sesame Glazed Salmon</p>',
            price: '<p>$18.00</p>',
            date: d.DatetoString(),
            customer: 'Bryce',
            status: 'In Progress',
        });
        console.log(cartItems);
        this.store.cartItems = cartItems;
    }
}

class StatusTable {
    // take dom element into JavaScript class to attachment events
    constructor(root, store) {
        this.root = root;
        this.store = store;
        init();
    }

    init () {
        // attach click event listener to table header row on each column
       // this.root.addEventListener('click', this.onClick); //added*
       let created = document.querySelector('#createdheader');
        createdheader.addEventListener("click", sort(date));
        let itemheader = document.querySelector('#itemheader');
        itemheader.addEventListener("click", sort(name));
        let customerheader = document.querySelector('#customerheader');
        customerheader.addEventListener("click", sort(customer));
        let statusheader = document.querySelector('#statusheader');
        statusheader.addEventListener("click", sort(status));
        render();
    }

    destroy () {
        // remove all the events attached from init
       //  this.root.removeEventListener('click', this.onClick); //added*
        tbody.innerHTML = '';
    }

    sort (columnName) {
        // after sorting the array of statuses, re render item to update view
        dynamicSort(columnName);
        render();
    }

    // render rows of items under table using root.innerHTML
    render () {
          console.log(this.store.cartItems);
        let tbody = this.root.querySelector('tbody');
        tbody.innerHTML = `<tr class="item">
            <td><p>'items.date'</p></td>
            <td>'items.imgsrc'<br />'items.name'</td>
            <td>'items.customer'</td>
            <td>'items.status'</td>
        </tr>`;
    }
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
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
    let cart = document.querySelector('#cart-table');
    let statusTable = document.querySelector('#status-table');
    let checkoutButtons = document.querySelectorAll('#checkout-button');

    let store = new Store(window.localStorage);
    if (table) {
        new StatusTable(table, store);
    }
    if (cart) {
        new Cart(cart, store);
    }
    if (checkoutButtons && checkoutButtons.length) {
        for(var i = 0; i < checkoutButtons.length; i++)
        {
            new CheckoutButton(checkoutButtons[i], store);
        }
    }
});