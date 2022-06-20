


//product page setting 
let productName = document.querySelector('.product__title');
let shortDes = document.querySelector('.product__desc');
let price = document.querySelector('.price');
let detail = document.querySelector('.desc');
let productImage = document.querySelector('.product__image');
let title = document.querySelector('title');

let cartBtn = document.querySelector('.cart__btn');


const setData = (data) => {
    productName.innerHTML = title.innerHTML = data.name;
    productImage.src = data.image;
    shortDes.innerHTML = data.shortDes;
    detail.innerHTML = data.detail;
    price.innerHTML = `$${data.price}`;

    cartBtn.addEventListener('click', () =>{
        cartBtn.innerHTML = add_product_to_cart(data);
    })
}


const fetchProductData = () =>{
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-type': 'application/json'}),
        body: JSON.stringify({id: productId})
    }).then(res => res.json())
    .then(data =>{
        setData(data)
        getProducts(data.tags[0]).then(res => createProductCards(res, 'similar products', '.best__selling'))
    })
    .catch(err => {
        console.log(err);
        alert('no product found');
        location.replace('/404');
    })
}

let productId = null;
if(location.pathname != '/add-product'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}