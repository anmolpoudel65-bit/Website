let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Exquisite Watch',
        image: '1.avif',
        price: 212999
    },
    {
        id: 2,
        name: "Collector's Timepiece",
        image: 'Watch2.jpg.webp',
        price: 349999
    },
    {
        id: 3,
        name: 'Timeless Luxury Timepiece',
        image: 'watch3.webp',
        price:  548999
    },
    {
        id: 4,
        name: 'Functional Timepiece',
        image: 'watch4.webp',
        price: 11999
    },
    {
        id: 5,
        name: 'Day-to-Day Watch',
        image: 'watch5.webp',
        price: 12999
    },
    {
        id: 6,
        name: 'Casual Watch',
        image: 'watch6.webp',
        price: 12999
    }
    ,
    {
        id: 7,
        name: 'Smartband',
        image: 'watch7.webp',
        price: 29999
    }
    ,
    {
        id: 8,
        name: 'Connected Timepiece',
        image: 'watch8.webp',
        price: 17999
    }
    ,
    {
        id: 9,
        name: 'Smart Chronometer',
        image: 'watch9.webp',
        price: 22999
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
    showPopup("Item has been added to the cart!");
}

function showPopup(message) {
    let popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.backgroundColor = "#2a2c30";
    popup.style.color = "white";
    popup.style.padding = "12px 24px";
    popup.style.borderRadius = "6px";
    popup.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.1)";
    popup.style.zIndex = "1000";
    popup.style.fontSize = "16px";
    popup.style.fontWeight = "bold";
    document.body.appendChild(popup);

    // Remove popup after 2 seconds
    setTimeout(() => {
        popup.remove();
    }, 2000);
}





function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}