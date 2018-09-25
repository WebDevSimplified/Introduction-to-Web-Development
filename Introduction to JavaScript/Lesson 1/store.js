if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var shopItemButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < shopItemButtons.length; i++) {
        shopItemButtons[i].addEventListener('click', addToCartClicked)
    }

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        removeCartItemButtons[i].addEventListener('click', removeCartItem)
    }

    var cartQuantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < cartQuantityInputs.length; i++) {
        cartQuantityInputs[i].addEventListener('change', quantityChanged)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function addToCartClicked(event) {
    var shopItemContainer = event.target.parentElement.parentElement
    var priceString = shopItemContainer.getElementsByClassName('shop-item-price')[0].innerText
    var itemName = shopItemContainer.getElementsByClassName('shop-item-title')[0].innerText
    var imageUrl = shopItemContainer.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(itemName, imageUrl, priceString)
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonElement = event.target
    buttonElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var quantityInput = event.target
    if (isNaN(quantityInput.value) || quantityInput.value <= 0) {
        quantityInput.value = 1
    }
    updateCartTotal()
}

function purchaseClicked() {
    alert('Thank you for your purchase!')
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    while(cartItemContainer.hasChildNodes()) {
        cartItemContainer.removeChild(cartItemContainer.firstChild)
    }
    updateCartTotal()
}

function addItemToCart(itemName, imageUrl, priceString) {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItemContainer.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == itemName) {
            alert('This item is already in your cart')
            return
        }
    }
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.innerHTML = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageUrl}" width="100" height="100">
            <span class="cart-item-title">${itemName}</span>
        </div>
        <span class="cart-price cart-column">${priceString}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" min="1" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `
    cartItemContainer.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartRows = document.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        if (priceElement == null || quantityElement == null) continue
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = parseInt(quantityElement.value)
        total += price * quantity
    }

    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + Math.round(total * 100) / 100
}