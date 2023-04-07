window.addEventListener('load', () => {
    // Fetch data from the server
    fetch('http://localhost:3000/tshirts')
    .then(response => response.json())
    .then(data => {
      // Get the tshirt-list element
      const tshirtList = document.getElementById('tshirt-list');
  
      // Loop through the data and create HTML elements for each t-shirt
      data.forEach(tshirt => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div class="product-image">
            <img src="${tshirt.img}" alt="${tshirt.brand} ${tshirt.type}" style="width: 500px; height="400px">
          </div>
          <h2>${tshirt.brand} ${tshirt.type}</h2>
          <p>Size: ${tshirt.size} </p>
          <p>Color: ${tshirt.color}</p>
          <p>Price: $${tshirt.price}</p>
          <button class="buy-btn" style="width: 100px; height: 50px;">Buy</button>
          <button class="delete-btn" style="width: 100px; height: 50px;">delete</button>
        `;
  
        // Add event listener to the Buy button
        const buyBtn = li.querySelector('.buy-btn');
        buyBtn.addEventListener('click', () => {
          addToCart(tshirt, buyBtn);
          updateButton(buyBtn);
        });
  
        // Add event listener to the Delete button
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
          deleteTshirt(tshirt.id);
          li.remove();
        });
  
        tshirtList.appendChild(li);
      });
  
      // Update the number of t-shirts bought in the cart
      const cartCount = document.getElementById('cart-count');
      cartCount.innerText = cart.length;
    })
    .catch(error => console.error(error));
  
    // Add event listener to the search bar
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', () => {
      const filter = searchBar.value.toUpperCase();
      const tshirtList = document.getElementById('tshirt-list');
      const items = tshirtList.getElementsByTagName('li');
  
      // Loop through all list items, and hide those that don't match the search query
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const title = item.getElementsByTagName('h2')[0];
        if (title.innerText.toUpperCase().indexOf(filter) > -1) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      }
    });
  
    // Initialize shopping cart
    const cart = [];
  
    // Function to add a t-shirt to the shopping cart and update the button text
    function addToCart(tshirt, button) {
      cart.push(tshirt);
      console.log(`Added ${tshirt.brand} ${tshirt.type} to cart!`);
      console.log(`Current cart:`, cart);
      button.disabled = true;
  
      // Update the number of t-shirts bought in the cart
      const cartCount = document.getElementById('cart-count');
      cartCount.innerText = cart.length;
    }
  
    // Function to update the button text after clicking the Buy button
    function updateButton(button) {
      button.innerText = "Bought";
    }
  
    // Function to delete a t-shirt from the server
    function deleteTshirt(id) {
      fetch(`http://localhost:3000/tshirts/${id}`, )}
  });
  