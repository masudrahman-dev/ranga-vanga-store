const arr = [];
const url = 'https://fakestoreapi.com/products';
const loadProducts = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      arr.push(data);
      showProducts(data);
    });
};
loadProducts(url);
// show all product in UI
const showProducts = (products) => {
  //   console.log('products :>> ', products);
    setInnerText('total_products', products.length);

  document.getElementById('all-products').innerHTML = '';

  const allProducts = products.slice(0, 5).map((pd) => pd);
  for (const product of allProducts) {
    //  console.log('product :>> ', product.image);
    const { image, title, category, price, id } = product;
    //  const image = product.image;
    //  console.log('image :>> ', image);
    const div = document.createElement('div');
    div.classList.add('product', 'col');
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${title}</h3>
      <p>Category: ${category}</p>
      <h2>Price: $ ${price}</h2>

      <button onclick="showProductDetails(${id})" id="details-btn"    data-bs-toggle="modal"
      data-bs-target="#exampleModal" class="btn btn-outline-secondary mb-2 rounded-1 mt-1">Details</button>
      
      <button onclick="addToCart('${id}','${price}')" id="addToCart-btn" class="buy-now btn btn-success border-0 w-100 rounded-0 bg-main py-2">Add to cart</button>
      `;
    document.getElementById('all-products').appendChild(div);
  }
};

let count = 0;

const addToCart = (id, price) => {
  count = count + 1;
  getPrice(id, price);

  //   updateTaxAndCharge();
  document.getElementById('total-Products').innerText = count;
};
// // modal
// const showProductDetails = (product_id) => {
//   console.log(product_id);
//   fetch(`https://fakestoreapi.com/products/${product_id}`)
//     .then((res) => res.json())
//     .then((data) => showProductDetailsInModal(data));
// };

// const showProductDetailsInModal = (product_details) => {
//   console.log(product_details);
//   setInnerText('exampleModalLabel', product_details.title);
//   setInnerText('product_id', product_details.id);
//   setInnerText('modal_body', product_details.description);
//   setInnerText('rating', product_details.rating.rate);
// };
// product price calculate
const getPrice = (id, price) => {
  const old_price = parseFloat(document.getElementById('price').innerText);
  const totalProductPrice = old_price + parseFloat(price);
  console.log('old_price :>> ', old_price);
  console.log('totalProductPrice :>> ', totalProductPrice);
  updateTaxAndCharge(totalProductPrice);
  document.getElementById('price').innerText = totalProductPrice;
  getUpdatePrice();
};
// update delivery charge and total Tax
const updateTaxAndCharge = (total_product_price) => {
  if (total_product_price > 200) {
    setInnerText('delivery-charge', 30);
    setInnerText('total-tax', total_product_price * 0.2);
  }
  if (total_product_price > 400) {
    setInnerText('delivery-charge', 50);
    setInnerText('total-tax', total_product_price * 0.3);
  }
  if (total_product_price > 500) {
    setInnerText('delivery-charge', 60);
    setInnerText('total-tax', total_product_price * 0.4);
  }
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};
//grandTotal update function
const getUpdatePrice = () => {
  const price = parseFloat(document.getElementById('price').innerText);
  const delivery_charge = parseFloat(
    document.getElementById('delivery-charge').innerText
  );
  const total_tax = parseFloat(document.getElementById('total-tax').innerText);
  const net_total = price + delivery_charge + total_tax;
  document.getElementById('total').innerText = net_total;
  console.log('net_total :>> ', net_total);
};

// // main price update function
// const updatePrice = (id, value) => {
//   //   console.log('id,value :>> ', id, value);
//   const convertedOldPrice = getPrice(id, value);
//   console.log('convertedOldPrice :>> ', convertedOldPrice);
//   //   const convertPrice = parseInt(value);
//   //   console.log('convertPrice :>> ', convertPrice);
//   //   const total = convertedOldPrice + convertPrice;
//   //   console.log('total :>> ', total);
//   //   document.getElementById(id).innerText = Math.round(total);
//   document.getElementById('price').innerText = convertedOldPrice;
// };

// // set innerText function
// const setInnerText = (id, value) => {
//   document.getElementById(id).innerText = Math.round(value);
// };

// // search by category
// document.getElementById('search-btn').addEventListener('click', function () {
//   const inputField = document.getElementById('input-value').value;
//   const searchedProduct = arr[0].find((p) =>
//     p.category.startsWith(`${inputField}`)
//   );
//   showProducts(searchedProduct);
// });
