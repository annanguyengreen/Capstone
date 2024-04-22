
function loadContent() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const json = JSON.parse(xhr.response);  //making it response to JSON format
      renderCards(json)
    }
  }
}

//A function that renders what we want from json objects
function renderCards(json) {

  //array with categories
  const uniqueCategories = [...new Set(json.map(e => e.category))];


  //creates category divs
  uniqueCategories.forEach(e => {
    let category = document.createElement("div");
    category.setAttribute('id', `id_${e}`)
    category.setAttribute('class', 'category')
    category.innerHTML = `<h2 class="category_header">${e}</h2>`;
    document.getElementById('outer_container').append(category);

    //creating row-col div and put in category
    let rowCol = document.createElement("div");
    rowCol.setAttribute('id', `rc_${e}`);
    rowCol.setAttribute('class', 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gy-3 gx-3 p-3');
    category.append(rowCol);


    //dropdown menu
    let dropdownItem = document.createElement("a");
    dropdownItem.className = 'dropdown-item';
    dropdownItem.setAttribute('href', `#id_${e}`);
    dropdownItem.innerHTML = `${e}`;
    document.getElementById('dropdown-menu').append(dropdownItem);

  })

  json.forEach(e => {
    //putting cardCol in correct row category
    let cardCol = document.createElement("div");
    cardCol.setAttribute('class', `col d-flex align-items-stretch`);
    document.getElementById(`rc_${e.category}`).append(cardCol);
    let card = document.createElement("div");
    card.setAttribute('class', `card`);
    cardCol.append(card);


    let img = document.createElement("img");
    img.className = "card-img-top";
    img.src = `${e.image}`;
    card.append(img);


    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.append(cardBody);

    //Creating the title of each clothes and add it int cardbody above
    let cardTitle = document.createElement("h2");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = `${e.title}`;
    cardBody.append(cardTitle);

    //creating card description and add card body
    let cardText = document.createElement("div");
    cardText.className = "card-text collapse";
    cardText.innerHTML = `${e.description}`;
    cardBody.append(cardText);

    //card footer
    let cardFooter = document.createElement("div");
    cardFooter.className = "card-footer p-2";
    card.append(cardFooter);
    let dFlex = document.createElement("div");
    dFlex.className = "d-flex justify-content-between align-items-center";
    cardFooter.append(dFlex);

    //Pricetag of an item
    let price = document.createElement("h4");
    price.className = "price pt-2";
    price.innerHTML = `$${e.price.toFixed(2)}`;
    dFlex.append(price);

    //creating button
    let btn = document.createElement("a");
    btn.className = "btn btn-outline-success p-2";
    btn.setAttribute('id', `addCart_${e.id}`);
    btn.href = "#";
    btn.innerHTML = "Add to cart";
    btn.addEventListener('click', (event) => {
      addToCart(e);
    });
    dFlex.append(btn);


    //rating of the clothes
    let rating = document.createElement("p");
    rating.className = "rating";
    rating.innerHTML = `Rating: ${e.rating.rate} (${e.rating.count})`;
    cardFooter.append(rating);



    //https://getbootstrap.com/docs/4.0/components/modal/
    //this link allows us to use a dialog popup window that is displayed, showing the description of each clothes when a user clicks on it
    let modal = document.createElement("div");
    modal.className = "modal fade modal-sm";
    modal.setAttribute('id', `modal_${e.id}`);
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'exampleModalCenterTitle');
    modal.setAttribute('aria-hidden', 'true');
    document.getElementById('outer_container').append(modal);


    let modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog modal-dialog-centered";
    modalDialog.setAttribute('role', 'document');
    modal.append(modalDialog);

    //creating clothes content
    let modalContent = document.createElement("div");
    modalContent.className = 'modal-content';
    modalDialog.append(modalContent);

    //Header
    let modalHeader = document.createElement("div");
    modalHeader.className = 'modal-header';
    modalContent.append(modalHeader);

    //Title
    let modalTitle = document.createElement("h5");
    modalTitle.className = 'modal-title';
    modalTitle.setAttribute('id', 'exampleModalLongTitle');
    modalTitle.innerHTML = `${e.title}`;
    modalHeader.append(modalTitle);

    //Body
    let modalBody = document.createElement("div");
    modalBody.className = 'modal-body';
    modalBody.innerHTML = `${e.description}`;
    modalContent.append(modalBody);

    //footer
    let modalFooter = document.createElement("div");
    modalFooter.className = 'modal-footer';
    modalContent.append(modalFooter);

    let linkModal = document.createElement("a");
    linkModal.className = "linkModal stretched-link";  
    linkModal.setAttribute('href', `modal_${e.id}`);
    linkModal.setAttribute('data-bs-toggle', 'modal');
    linkModal.setAttribute('data-bs-target', `#modal_${e.id}`);
    linkModal.innerHTML = "Read more...";
    cardBody.append(linkModal);
    console.log(linkModal);
    
    //Close button
    let modalCloseBtn = document.createElement("button");
    modalCloseBtn.setAttribute('type', 'button');
    modalCloseBtn.setAttribute('class', 'btn btn-secondary');
    modalCloseBtn.setAttribute('data-bs-dismiss', 'modal');
    modalCloseBtn.setAttribute('data-bs-target', `#modal_${e.id}`);
    modalCloseBtn.innerHTML = 'Close';
    modalFooter.append(modalCloseBtn);

  })

}

function addToCart(e) {

  //Get current cart from localstorage or create a new one if not exists:
  let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  let newItem = {
    title: e.title,
    price: e.price,
    id: e.id,
    image: e.image,
  };

  shoppingCart.push(newItem);
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}


loadContent();

