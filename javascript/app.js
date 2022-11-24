var counter=0;

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
    const div = document.createElement("div");
    div.className = "navbar-left";
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
    var div = document.createElement("div");
    div.className = "navbar-center";
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
        var icon = document.createElement("i");
        icon.className = "fa fa-angle-down down-arrow";
        icon.setAttribute("aria-hidden", "true");
        div.appendChild(createSpan(navigation, "navigation", icon, "navigation"));
    });
    return div;
}

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
    var div = document.createElement("div");
    div.className = "navbar-right";

    navIcons().forEach(icon => {
        className = "top-nav-icon " + icon.class;
        div.appendChild(createIcon(className, icon.id, icon.src, icon.alt, true));
    });
    var count = document.createElement("button");
    count.className = "count";
    count.append(localStorage.getItem("counter"));   
    div.appendChild(count);
    return div;
    
}


const division = document.getElementById("top-right-section");
addItem();

function addItem() {
    const rightDivision = document.createElement("div");
    rightDivision.className = "right-rectangle-1";

    fetch("https://637f5df95b1cc8d6f942dc4c.mockapi.io/products").then(data => data.json())
        .then(data => {

            data.forEach(image => {
                var div = document.createElement("div");
                div.className = "small-ice-row-1-col-1 right-section";

                var img = document.createElement("img");
                img.className = "small-ice";
                img.setAttribute("src", image.url);
                img.setAttribute("alt", image.name);
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

                var innerDivision = document.createElement("div");
                innerDivision.className = "txt";
                var paragraph = document.createElement("p");
                paragraph.className = "flavour";
                paragraph.append(image.name);
                innerDivision.appendChild(paragraph);
                innerDivision.appendChild(createSpan(image.price, "price"));

                if (image.discount !== "$0.00") {
                    innerDivision.appendChild(createSpan(image.discount, "old-price"));
                }

                var  button = document.createElement("button");
                button.setAttribute("id", "adder");
                button.append("Add");
                console.log(button);

                innerDivision.append(button);
                console.log(innerDivision);
                div.appendChild(innerDivision);

                rightDivision.appendChild(div);
            });
            division.append(rightDivision);
        })
}


document.querySelector("#bag").addEventListener("click", showCart);


function showCart() {
    /* 
        var div = document.createElement("div");
        div.className = "cart-block-container";
        var input = document.createElement("input");
        input.type = "number";
        input.className = "cart-input";
        div.appendChild(input);
    
    
        console.log("cart button clicked");
        document.innerHTML= div.innerHTML; */

    console.log("================");
    var cartContainer = document.getElementById("cart-container");
    console.log(cartContainer);
    cartContainer.style.display = "flex";
}

document.getElementById("submit").addEventListener("click", addText);

function addText() {
    userName = document.querySelector(".text");
    console.log(userName);
    localStorage.setItem("name", userName.value);
    document.getElementById("cart-container").style.display = "none";
}

document.getElementById("adder").addEventListener("click", addCount);

function addCount() {
    let a = 1;
    localStorage.setItem("counter",a);
    console.log(a);
    return a;
}















