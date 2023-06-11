var searchInput = document.getElementById("search-input");
var searchButton = document.querySelector(".search-button");
var productsContainer = document.getElementById("products-container");
var searchResultsContainer = document.getElementById("search-results");

// Event listener for the search button click
searchButton.addEventListener("click", performSearch);

// Event listener for the Enter key press in the search input
searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  var searchQuery = searchInput.value.trim().toLowerCase();

  // Clear previous search results
  searchResultsContainer.innerHTML = "";

  if (searchQuery !== "") {
    // Filter products based on search query
    var matchingProducts = filterProducts(searchQuery);

    // Display search results
    displaySearchResults(matchingProducts);
  } else {
    // Show all products if search query is empty
    displayAllProducts();
  }
}

function filterProducts(searchQuery) {
  var allProducts = Array.from(
    productsContainer.getElementsByClassName("col-4")
  );
  var matchingProducts = allProducts.filter(function (product) {
    var productName = product.querySelector("h4").innerText.toLowerCase();
    return productName.includes(searchQuery);
  });

  return matchingProducts;
}

function displaySearchResults(matchingProducts) {
  if (matchingProducts.length === 0) {
    searchResultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  matchingProducts.forEach(function (product) {
    product.classList.remove("hide");
    searchResultsContainer.appendChild(product.cloneNode(true));
  });
}

function displayAllProducts() {
  var allProducts = Array.from(
    productsContainer.getElementsByClassName("col-4")
  );
  allProducts.forEach(function (product) {
    product.classList.remove("hide");
  });
}

// Hide all products initially
var allProducts = Array.from(productsContainer.getElementsByClassName("col-4"));
allProducts.forEach(function (product) {
  product.classList.add("hide");
});

var addToCartButtons = document.querySelectorAll(".addToCartBtn");
addToCartButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    var product = event.target.parentElement;
    var title = product.querySelector("h4").innerText;
    var priceString = product.querySelector("p").innerText.replace(/\./g, "").replace("-сом", "");

    var price = Number(priceString);
    
    var imageSrc = product.querySelector("img").src;
    var quantity = product.querySelector(".item-quantity").value;

    var existingCartItemIndex = -1;
    var cart = JSON.parse(localStorage.getItem("cart") || "[]");
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].title === title) {
        existingCartItemIndex = i;
        break;
      }
    }

    if (existingCartItemIndex > -1) {
      // Product already exists in cart, update quantity
      cart[existingCartItemIndex].quantity =
        Number(cart[existingCartItemIndex].quantity) + Number(quantity);
    } else {
      // Product does not exist in cart, add it as a new item
      var cartItem = {
        title: title,
        price: price,
        imageSrc: imageSrc,
        quantity: quantity,
      };
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    var message = document.getElementById("message");
    message.textContent = "Товар добавлен в корзину!";
    message.classList.add("show");

    // Clear the message after a few seconds
    setTimeout(function () {
      message.textContent = "";
      message.classList.remove("show");
    }, 3000);
  });
});




