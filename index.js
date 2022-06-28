const state = {
   items: [
      {
         id: '001-beetroot',
         name: 'beetroot',
         price: 0.35,
         type: 'vegetable',
      },
      {
         id: '002-carrot',
         name: 'carrot',
         price: 0.35,
         type: 'vegetable',
      },
      {
         id: '003-apple',
         name: 'apple',
         price: 0.35,
         type: 'fruit',
      },
      {
         id: '004-apricot',
         name: 'apricot',
         price: 0.35,
         type: 'fruit',
      },
      {
         id: '005-avocado',
         name: 'avocado',
         price: 0.35,
         type: 'fruit',
      },
      {
         id: '006-bananas',
         name: 'bananas',
         price: 0.35,
         type: 'fruit',
      },
      {
         id: '007-bell-pepper',
         name: 'bell pepper',
         price: 0.35,
         type: 'vegetable',
      },
      {
         id: '008-berry',
         name: 'berry',
         price: 0.35,
         type: 'fruit',
      },
      {
         id: '009-blueberry',
         name: 'blueberry',
         price: 0.35,
         type: 'fruit',
      },
      {
         id: '010-eggplant',
         name: 'eggplant',
         price: 0.35,
         type: 'vegetable',
      },
   ],
   cart: [],
};

const storeList = document.querySelector('.store--item-list');
const cartList = document.querySelector('.cart--item-list');

function render() {
   clear();
   renderStore();
   renderCart();
   renderTotal();
}

function clear() {
   storeList.innerHTML = '';
   cartList.innerHTML = '';
}

function renderStore() {
   for (const item of state.items) {
      const storeItem = document.createElement('li');
      const storeDiv = document.createElement('div');
      storeDiv.setAttribute('class', 'store--item-icon');
      const storeImg = document.createElement('img');
      storeImg.setAttribute('src', `assets/icons/${item.id}.svg`);
      const storeButton = document.createElement('button');
      storeButton.innerText = 'ADD TO CART';
      storeButton.addEventListener('click', function () {
         const alreadyInCart = state.cart.find((i) => i.item === item);
         if (alreadyInCart !== undefined) {
            alreadyInCart.quantity++;
         } else {
            state.cart.push({
               quantity: 1,
               item: item,
            });
         }
         console.log('Items in cart', state.cart);
         render();
      });

      const fruitFilter = document.querySelector('.show-me-fruit');
      fruitFilter.addEventListener('click', function () {
         state.items = state.items.filter((item) => item.type === 'fruit');
         console.log('Clicking fruit button');
         render();
         return;
      });
      const vegFilter = document.querySelector('.show-me-veg');
      vegFilter.addEventListener('click', function () {
         state.items = state.items.filter((item) => item.type === 'vegetable');
         render();
         return;
      });

      const noFilter = document.querySelector('.show-me-it-all');
      noFilter.addEventListener('click', function () {
         state.items = state.items;
         render();
      });

      storeList.append(storeItem);
      storeItem.append(storeDiv, storeButton);
      storeDiv.append(storeImg);
   }
}

function renderCart() {
   for (const cartContents of state.cart) {
      const cartItem = document.createElement('li');
      const basketImg = document.createElement('img');
      basketImg.src = `assets/icons/${cartContents.item.id}.svg`;
      const basketItemName = document.createElement('p');
      basketItemName.textContent = cartContents.item.name;

      const counterSpan = document.createElement('span');
      counterSpan.className = '.quantity-text';
      counterSpan.innerText = cartContents.quantity;

      console.log('counterSpan check', cartContents.quantity);

      const removeButton = document.createElement('button');
      removeButton.innerText = '-';
      removeButton.className = '.quantity-btn .remove-btn .center';
      removeButton.addEventListener('click', function () {
         cartContents.quantity--;
         if (cartContents.quantity === 0) {
            const cartContentsIndex = state.cart.findIndex(
               (i) => i === cartContents
            );
            state.cart.splice(cartContentsIndex, 1);
         }
         render();
      });

      const addButton = document.createElement('button');
      addButton.innerText = '+';
      addButton.className = '.add-btn';
      addButton.addEventListener('click', function () {
         cartContents.quantity++;
         render();
      });

      console.log('Check counter function', cartContents.quantity);
      cartList.append(cartItem);
      cartItem.append(
         basketImg,
         basketItemName,
         removeButton,
         counterSpan,
         addButton
      );
   }
}

function renderTotal() {
   const totalPrice = document.querySelector('.total-number');
   let total = 0;
   for (const price of state.cart) {
      if (price) {
         total += price.item.price * price.quantity;
      } else {
         totalPrice;
      }
   }
   totalPrice.innerText = `£ ${total.toFixed(2)}`;
}

render();
