var products = JSON.parse(localStorage.getItem("products")) || [];
console.log(products.length);
window.addEventListener("load", () => {
    update = document.getElementById("count")
    if (products.length > 0) {
        update.innerHTML = products.length;
    } else {
        update.innerHTML = 0;
    }
});



function createSpan(text, className = "", icon = "", id = " ") {
    var span = document.createElement("span");
    span.setAttribute("id", id);
    span.className = className;
    span.append(text);
    span.append(icon);
    return span;
}

function createIcon(className, id = "", src, alt = "", isAriaHidden) {
    var icon = document.createElement("i");
    icon.className = className;
    icon.setAttribute("id", id);
    icon.setAttribute("src", src);
    icon.setAttribute("alt", alt);
    icon.setAttribute("aria-hidden", isAriaHidden);
    return icon;
}

function createDiv(className, id="",){
    var div = document.createElement("div");
    div.className = className;

    if (!id) {
            div.setAttribute("id", id);
        }
    return div;
}

function createButton(className, id= "")  {
    var button = document.createElement("button");
    button.setAttribute("id", id);
    button.setAttribute("class", className);
    return button;
}

function createImage(className, id="", src, alt) {
    var image = document.createElement("img");
    image.className = className;

    if (!id) {
    image.setAttribute("id", id);
    }
    image.setAttribute("src", src);
    image.setAttribute("alt", alt);    
    return image;    
}

function createParagraph(className, id="", ) {
    var paragraph = document.createElement("p");
    paragraph.className = className;

    if (!id) {
    paragraph.setAttribute("id", id);
    }
    return paragraph;                    
}

var userName;
const navbar = document.getElementById("navbar");
document.innerHTML = createHeader();



function createHeader() {
    navbar.className = "header";
    navbar.appendChild(addNavbarLeftToHeader());
    navbar.appendChild(addNavbarCenterToHeader());
    navbar.appendChild(addNavbarRightToHeader());
    return navbar;
}

function addNavbarLeftToHeader() {
    const div = createDiv("navbar-left");
    div.append(createNavbarLogo());
    return div;
}

function createNavbarLogo() {
    var logo = document.createElement("img");
    logo.className = "title";
    logo.src = "/images/logo.png";
    logo.alt = "logo";
    return logo;
}

function addNavbarCenterToHeader() {
    var div = createDiv("navbar-center");
    menu(div);
    return div;
}

function menu(div) {
    const navigationOptions = new Set();
    navigationOptions.add("Home");
    navigationOptions.add("Features");
    navigationOptions.add("Shop");
    navigationOptions.add("Blog");
    navigationOptions.add("About US");
    navigationOptions.add("Contact");

    navigationOptions.forEach(navigation => {
        var icon = createIcon("fa fa-angle-down down-arrow","","","down-arrow",true);
        div.appendChild(createSpan(navigation, "navigation", icon, "navigation"));
    });
    return div;
}


function navIcons() {

    const icon1 = {
        id: "search",
        src: "/images/search.svg",
        alt: "search",
        class: "fa fa-search"
    }

    const icon2 = {
        id: "bag",
        src: "/images/bag.svg",
        alt: "cart",
        class: "fa fa-shopping-bag"
    }

    const icon3 = {
        id: "menu",
        src: "/images/menu.svg",
        alt: "menu",
        class: "fa fa-bars"
    }
    const navigationIcons = new Set();
    navigationIcons.add(icon1);
    navigationIcons.add(icon2);
    navigationIcons.add(icon3);

    return navigationIcons;
}



function addNavbarRightToHeader() {
    var div = createDiv("navbar-right");

    navIcons().forEach(icon => {
        className = "top-nav-icon " + icon.class;
        div.appendChild(createIcon(className, icon.id, icon.src, icon.alt, true));
    });
    var countButton = createButton("","count");
    countButton.append(localStorage.getItem("counter"));
    div.appendChild(countButton);
    return div;
}


document.getElementById("bag").addEventListener("click", showCart);
document.getElementById("cart-container").append(createCart());

function createCart() {
    
    var totalDiv = createDiv("total-price");
    var text = createSpan("Total :  ","total-text");
    totalAmount = createSpan("","checkoutAmount");
    totalAmount.innerHTML = "$ " + calculateTotalAmount(products);
    text.append(totalAmount);
    totalDiv.appendChild(text);
    var proceed = createButton("proceed-button");
    proceed.append("Proceed");
    totalDiv.append(proceed);
    return totalDiv;
}



function showCart() {
    console.log("================");
    var cartContainer = document.getElementById("cart-container");
    console.log(cartContainer);
    displayCart();
    cartContainer.style.display = "flex";
}

const cartItem = document.getElementById("addProductToCart");
const division = document.getElementById("top-right-section");
addItem();

function addItem() {
    const rightDivision = document.createElement("div");
    rightDivision.className = "right-rectangle-1";

    fetch("https://637f5df95b1cc8d6f942dc4c.mockapi.io/products").then(data => data.json())
        .then(data => {

            data.forEach(image => {
                var div = createDiv("small-ice-row-1-col-1 right-section");
                var img = createImage("small-ice", "",image.url, image.name);
                div.appendChild(img);

                for (var i = 0; i < image.button.length; i++) {
                    var button = document.createElement("button");

                    if (image.button.length == 1) {

                        if (image.button[i] === "Hot") {
                            button.className = "hot";
                        } else if (image.button[i] === "Sale") {
                            button.className = "sale-only";
                        }
                    } else {

                        if (image.button[i] === "Hot") {
                            button.className = "hot";
                        } else if (image.button[i] === "Sale") {
                            button.className = "sale";
                        }
                    }
                    button.append(image.button[i]);
                    div.appendChild(button);
                }

                
                var innerDivision = createDiv("txt");
                var paragraph = createParagraph("flavour");
                paragraph.append(image.name);
                innerDivision.appendChild(paragraph);
                var discountedAmount = "$" + image.price + " ";
                innerDivision.appendChild(createSpan(discountedAmount, "price"));

                if (image.discount !== 0.00) {
                    var amount = "$" + image.discount
                    innerDivision.appendChild(createSpan(amount, "old-price"));
                }

                var button =createButton("adder");
                button.append("Add To Cart");
                button.addEventListener("click", () => {
                    console.log(image.discount);
                    cartItem.append(addProductsToCart(image));
                    console.log(products);
                    button.innerHTML = ("Go To Cart")
                });

                
                button.addEventListener("click", () => {
                    
                    if ("Go To Cart" === button.value)  {
                        showCart();
                    }

                })
                console.log(button);


                innerDivision.append(button);
                console.log(innerDivision);
                div.appendChild(innerDivision);

                rightDivision.appendChild(div);
            });
            division.appendChild(rightDivision);
        })
}



document.getElementById("submit").addEventListener("click", addText);

function addText() {
    userName = document.querySelector(".text");
    console.log(userName);
    localStorage.setItem("name", userName.value);
    document.getElementById("cart-container").style.display = "none";
}


function updateBagCounter() {
    update = document.getElementById("count")
    update.innerHTML = products.length;

}



function addProductsToCart(product) {
    products.push(product);
    updateBagCounter();    
    var div = addToCart(product);
    addToLocalStorage(products);            
    document.querySelector(".checkoutAmount").innerHTML = ("$ " + calculateTotalAmount(products));   
    return div;
}

function addToCart(product) {
    
    var div = createDiv("cart-area product-container ");
    div.innerHTML = "";

    var productArea = createDiv( "product-area");
    productArea.setAttribute("id", product.id);
    var productIdentity = createDiv("product-image");
    var image = createImage("cart-item", "", product.url, product.name);
    productIdentity.appendChild(image);

    var descriptionDiv = createDiv("product-description");
    var name = createParagraph( "product-name");
    name.append(product.name);

    var counterDiv = createDiv("counter-area");
    var quantity = document.createElement("input");
    quantity.className = "quantity";
    quantity.type = "number";
    quantity.min = "1";
    quantity.value = 1;
    quantity.addEventListener("change", () => {

        console.log(quantity.value);
        product.totalPrice = product.price * quantity.value;
        product.count = quantity.value;
        price.innerHTML = ("$" + product.totalPrice);
        document.querySelector(".checkoutAmount").innerHTML = ("$ " + calculateTotalAmount(products));
        updateBagCounter();
        console.log(product.totalPrice);


    });
    counterDiv.appendChild(quantity);
    console.log(quantity.value);

    descriptionDiv.appendChild(name);
    descriptionDiv.appendChild(counterDiv);
    productIdentity.appendChild(descriptionDiv);
    productArea.appendChild(productIdentity);
    product.totalPrice = product.price * quantity.value;
    var price = createDiv("product-price");
    price.append("$" + product.totalPrice); /* 
    document.querySelector(".checkoutAmount").innerHTML = ("$ " + calculateTotalAmount(products));   */
    productArea.appendChild(price);
    console.log(price);
    var remove = createDiv("remove-product");
    var trash = createIcon("fa fa-trash trash");
    trash.addEventListener("click", () => {
        if (null != product.id) {
            products.splice(products.indexOf(product), 1);
            console.log("products : ", products);
            document.getElementById(product.id).remove();
            document.querySelector(".checkoutAmount").innerHTML = ("$ " + calculateTotalAmount(products));
            updateBagCounter();
            addToLocalStorage(products);
        }
    });
    remove.append(trash);
    productArea.appendChild(remove);
    div.appendChild(productArea);
    return div;
}

function displayCart() {

    var productCart = document.querySelector(".product-cart")
    var division = document.getElementById("addProductToCart");
    products.forEach(product => {
        division.append(addToCart(product));
       productCart.append(division);
    });
    return productCart;
}

function calculateTotalAmount(products) {
    var totalAmount = 0;
    for (var i = 0; i < products.length; i++) {
        totalAmount += products[i].totalPrice;
    }
    return totalAmount;
}

function addToLocalStorage(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

function displayProduct(products) {
    products.forEach(product => {
        addProductsToCart(product);
    });
}
















