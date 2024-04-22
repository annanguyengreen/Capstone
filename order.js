function getShoppingCart() {
    return JSON.parse(localStorage.getItem("shoppingCart")) || [];
}



function retrieveCart() {

    const cartDiv = document.getElementById('cart');

    let shoppingCart = getShoppingCart();
    if (shoppingCart.length) {
        
        const uniqueItems = [...new Map(shoppingCart.map((item) => [(item).title, (item)])).values()];
        console.log(uniqueItems);

       
        uniqueItems.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));

        
        uniqueItems.forEach((item) => {

            let cartItem = document.createElement('div');
            cartItem.className = 'cartItem';
            cartItem.id = `cartItemId_${item.id}`;
            cartDiv.appendChild(cartItem);

            let box_left = document.createElement('div');
            box_left.className = 'box_left';
            cartItem.appendChild(box_left);

            let cartImage = document.createElement('img');
            cartImage.className = 'cartImage';
            cartImage.src = `${(item).image}`;
            box_left.append(cartImage);

            let box_title = document.createElement('div');
            box_title.className = 'box_title';
            cartItem.appendChild(box_title);

            let iTitle = document.createElement('div');
            iTitle.className = 'iTitle';
            iTitle.innerHTML = `${(item).title}`;
            box_title.appendChild(iTitle);

            let removeItemBox = document.createElement('div');
            removeItemBox.className = 'removeItemBox flex-fill';
            box_title.appendChild(removeItemBox);

            let removeItemBtn = document.createElement('button');
            removeItemBtn.className = 'removeItemBtn btn'
            removeItemBtn.id = `removeItemId_${item.id}`;
            removeItemBtn.innerHTML = 'x';
            removeItemBtn.addEventListener('click', (event) => {
                removeItemFromCart((item));
            });
            removeItemBox.appendChild(removeItemBtn);

            let box_price = document.createElement('div');
            box_price.className = 'box_price d-flex flex-row';
            cartItem.appendChild(box_price);

            let iQty = document.createElement('p');
            iQty.className = 'iQty';
            iQty.innerHTML = 'Qty:'
            box_price.appendChild(iQty);

            let btnBox = document.createElement('div');
            btnBox.className = "btnBox border-2 border-secondary border rounded-pill";
            box_price.appendChild(btnBox);

            let addBtn = document.createElement('button');
            addBtn.className = 'addBtn btn';
            addBtn.id = `addId_${item.id}`;
            addBtn.innerHTML = '+';
            addBtn.addEventListener('click', (event) => {
                addToCartAtCheckout((item));
            });
            btnBox.appendChild(addBtn);

            let iCount = document.createElement('div');
            iCount.className = 'icount';
            iCount.setAttribute('id', `iCountId_${(item).id}`)
            
            btnBox.appendChild(iCount);

            let removeBtn = document.createElement('button');
            removeBtn.className = 'removeBtn btn'
            removeBtn.id = `removeId_${item.id}`;
            removeBtn.innerHTML = '-';
            removeBtn.addEventListener('click', (event) => {
                removeFromCartAtCheckout((item));
            });
            btnBox.appendChild(removeBtn);

            let iPrice = document.createElement('div');
            iPrice.className = 'iPrice';
            iPrice.innerHTML = `$${(item).price.toFixed(2)}`;
            box_price.appendChild(iPrice);

            let iPriceTot = document.createElement('div');
            iPriceTot.className = 'iPriceTot flex-fill';
            iPriceTot.setAttribute('id', `iPriceTot_${(item).id}`);
           
            box_price.appendChild(iPriceTot);

            update_iCount_iPriceTot(item);

        });
    }
    updateTotalPrice();
}


function update_iCount_iPriceTot(item) {
    let shoppingCart = getShoppingCart();

    
    let itemCount = shoppingCart.filter(e => e.title == (item).title).length;
    document.getElementById(`iCountId_${(item).id}`).innerHTML = `${itemCount}`;

    //update price
    document.getElementById(`iPriceTot_${(item).id}`).innerHTML = `$${((item).price * itemCount).toFixed(2)}`;

}



function addToCartAtCheckout(item) {
    let shoppingCart = getShoppingCart();

    let newItem = {
        title: item.title,
        price: item.price,
        id: item.id,
        image: item.image,
    };
    shoppingCart.push(newItem);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    update_iCount_iPriceTot(item);
    updateTotalPrice();
}



function removeFromCartAtCheckout(item) {
    let shoppingCart = getShoppingCart();

    let itemIndex = -1;
    shoppingCart.forEach((e, index) => {
        if (e.id === item.id) {
            itemIndex = index;
        }
    })

    if (itemIndex > -1) {
        shoppingCart.splice(itemIndex, 1);
    } else {
        document.getElementById('cart').textContent = "";
        retrieveCart();
    }
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    update_iCount_iPriceTot(item);
    updateTotalPrice();
}


function removeItemFromCart(item) {
    let shoppingCart = getShoppingCart();

    shoppingCart = shoppingCart.filter(e => e.id !== item.id);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    document.getElementById('cart').textContent = "";
    retrieveCart();
}




function updateTotalPrice() {
    let shoppingCart = getShoppingCart();
    let totalPrice = 0;

    shoppingCart.forEach(e => {
        totalPrice += e.price;
    });

    totalPrice = totalPrice.toFixed(2);
    document.getElementById('totalPrice').innerHTML = `Total Price: $${totalPrice}`;
}


document.getElementById("btn_clearCart").addEventListener('click', function() {
    localStorage.removeItem('shoppingCart');
    document.getElementById('totalPrice').innerHTML = `Total Price: $0.00`;
    document.getElementById('cart').innerHTML = "";
});

retrieveCart();

function message() {
    var orderNumber = document.getElementById('Firstname');
    var firstName = document.getElementById('lastName');
    var lastName = document.getElementById('cardNumber');
    var email = document.getElementById('email');
    var write = document.getElementById('address');
    var postalCode = document.getElementById('postalCode');
    var city = document.getElementById('city');
    const success = document.getElementById('success');
    const danger = document.getElementById('danger');

    if (orderNumber.value == '' || Firstname.value == '' || lastName.value == '' || cardNumber.value == '' || email.value == '' || address.value == '' || postalCode == '' || city == '') {
        danger.style.display = 'block';
    }
    else {

        //clear the shopping cart
        localStorage.removeItem('shoppingCart');
        document.getElementById('totalPrice').innerHTML = `Total Price: $0.00`;
        document.getElementById('cart').innerHTML = "";

        //clear form fields after a timeout
        setTimeout(() => {
            orderNumber.value = '';
            firstName.value = '';
            lastName.value = '';
            email.value = '';
            address.value = '';
            postalCode.value = '';
            city.value = '';
        }, 1000);

        success.style.display = 'block';
        alert("Thank You, Your Message has been Send!")
        
    }

}