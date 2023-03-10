// const arr = [];
const url = 'https://fakestoreapi.com/products';
const loadProducts = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // arr.push(data);
      showProducts(data);
      searchByCategory(data);
    });
};
loadProducts(url);
// show all product in UI
const showProducts = (products) => {
  // console.log('products :>> ', products);
  //   console.log('products :>> ', products);
  setInnerText('total_products', products.length);

  document.getElementById('all-products').innerHTML = '';

  const allProducts = products.slice(0, 19).map((pd) => pd);
  for (const product of allProducts) {
    //  console.log('product :>> ', product.image);
    const { image, title, category, price, id } = product;
    //  const image = product.image;
    //  console.log('image :>> ', image);
    const div = document.createElement('div');
    div.classList.add('product', 'col');
    div.innerHTML = `

    <div class="card " >
    <div class="card-body">
    <img src=${image} class="img-fluid " >
       <h5 class="card-title">${title}</h5>
       <p>Category: ${category}</p>
       <h2>Price: $ ${price}</h2>
          <button onclick="showProductDetails('${id}')" id="details-btn"    data-bs-toggle="modal"
          data-bs-target="#exampleModal" class="btn btn-outline-secondary mb-2 rounded-1 mt-1">Details</button>
            <button onclick="addToCart('${id}','${price}')" id="addToCart-btn" class=" btn btn-success">Add to cart</button>
    </div>
 </div>
    `;

    document.getElementById('all-products').appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  getPrice(id, price);
  document.getElementById('total-Products').innerText = count;
};
// modal
const showProductDetails = (product_id) => {
  // console.log(product_id);
  // console.log(product_id);
  fetch(`${url}/${product_id}`)
    .then((res) => res.json())
    .then((data) => showProductDetailsInModal(data));
};

const showProductDetailsInModal = (product_details) => {
  setInnerText('exampleModalLabel', product_details.title);
  setInnerText('product_id', product_details.id);
  setInnerText('modal_body', product_details.description);
  // console.log();
  setInnerText('rating', product_details.rating.rate);
};
// product price calculate
const getPrice = (id, price) => {
  const old_price = parseFloat(document.getElementById('price').innerText);
  const totalProductPrice = old_price + parseFloat(price);

  updateTaxAndCharge(totalProductPrice);
  document.getElementById('price').innerText = totalProductPrice.toFixed(2);
  getUpdatePrice();
};
// update delivery charge and total Tax
const updateTaxAndCharge = (total_product_price) => {
  if (total_product_price > 200) {
    setInnerText('delivery-charge', 30);
    setInnerText('total-tax', (total_product_price * 0.2).toFixed(2));
  }
  if (total_product_price > 400) {
    setInnerText('delivery-charge', 50);
    setInnerText('total-tax', (total_product_price * 0.3).toFixed(2));
  }
  if (total_product_price > 500) {
    setInnerText('delivery-charge', 60);
    // const tax = (total_product_price * 0.4).toFixed(2);
    // console.log('tax :>> ', tax);
    setInnerText('total-tax', (total_product_price * 0.4).toFixed(2));
  }
};

// set innerText function
const setInnerText = (id, charge) => {

  document.getElementById(id).innerText = charge;
};
//grandTotal update function
const getUpdatePrice = () => {
  const price = parseFloat(document.getElementById('price').innerText);
  const delivery_charge = parseFloat(
    document.getElementById('delivery-charge').innerText
  );
  const total_tax = parseFloat(document.getElementById('total-tax').innerText);
  const net_total = price + delivery_charge + total_tax;
  document.getElementById('total').innerText = net_total.toFixed(2);
  //   console.log('net_total :>> ', net_total);
};

// search by category
const searchByCategory = (data) => {
  document.getElementById('search-btn').addEventListener('click', function () {
    const inputField = document.getElementById('input-value').value;
    //  console.log(inputField);
    //  const searchedProduct = data.map((p) => p.category).filter( prd => prd.startsWith(`${inputField}`));
    const searchedProduct = data.filter((prd) =>
      prd.category.startsWith(`${inputField}`)
    );
    // startsWith(`${inputField}`)

    showProducts(searchedProduct);
  });
};
