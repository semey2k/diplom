//image collage

const collageImages = [...document.querySelectorAll('.collage__img')];

collageImages.map((item, i)=>{
    item.addEventListener('mouseover',()=>{
        collageImages.map((image, index)=>{
            if(index !=i){
                image.style.filter = `blur(5px)`;
                item.style.zIndex = 2;
            }
        })
    })

    item.addEventListener('mouseleave', ()=>{
        collageImages.map((image, index) => {
            image.style = null;
        })
    })
})

// get product functions
productId = null;
const getProducts = (tag) =>{
    return fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-type': 'application/json'}),
        body: JSON.stringify({tag: tag})
    })
    .then(res => res.json())
    .then(data =>{
        return data
    })
}

const createProductCards = (data, title, ele) => {
    let container = document.querySelector(ele);
    container.innerHTML += `
    <h1 class="section__title">${title}</h1>
        <div class="product__container">
            ${createCards(data)}   
        </div>
        `
}

const createCards = data => {
    let cards = '';

    data.forEach(item => {
        if(item.id != productId){
            cards += `
        <div class="product__card">
                <img src="${item.image}" onclick = "location.href = '/product/${item.id}'" class="product__img" alt="">
                <p class="product__name">${item.name}</p>
            </div>  
            `
        }
    })
    return cards;
}

// cart function 
const add_product_to_cart = product => {
    updateNavCartCounter();
    let cart = JSON.parse(localStorage.getItem('cart'));

    if(cart == null){
        cart = []
    }

    product = {
        item: 1,
        name: product.name,
        price: product.price,
        shortDes: product.shortDes,
        image: product.image
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    return 'added';
}