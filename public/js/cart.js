// create small product cards
const createSmallCards = (data) =>{
    return `
    <div class="sm__product">
                    <img src="${data.image}" class="sm__product-img" alt="">
                    <div class="sm__text">
                        <p class="sm__product-name">${data.name}</p>
                        <p class="sm__des">${data.shortDes}</p>
                    </div>
                    <div class="item__counter">
                        <button class="counter__btn decrement">-</button>
                        <p class="item__count">${data.item}</p>
                        <button class="counter__btn increment">+</button>
                    </div>
                    <p class="sm__price" data-price="${data.price}">$${data.price * data.item}</p>
                    <button class="sm__delete-btn"><img src="./img/close.png" alt=""></button>
                </div>
                `
}

let totalBill = 0;

const setCartProducts = () =>{
    const cartContainer = document.querySelector('.cart__container')

    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart == null || cart.length == 0){
        cartContainer.innerHTML += `
        <img src="./img/empty-cart.png" class="empty__img" alt="">`
    }else{
        for(let i = 0; i< cart.length; i++){
        cartContainer.innerHTML += createSmallCards(cart[i]);
        totalBill += Number(cart[i].price * cart[i].item);

        updateBill()
     }

    }
    setupCardEvents()
}

const updateBill = () =>{
    updateNavCartCounter();
    let billPrice = document.querySelector('.bill');
    billPrice.innerHTML = `$${totalBill}`;
}

const setupCardEvents = () =>{
    //setup counter event
    const counterMinus = document.querySelectorAll('.cart__container .decrement');
    const counterPlus = document.querySelectorAll('.cart__container .increment');
    const counts = document.querySelectorAll('.cart__container .item__count');
    const price = document.querySelectorAll('.cart__container .sm__price');
    const deleteBtn = document.querySelectorAll('.cart__container .sm__delete-btn')

    let product = JSON.parse(localStorage.getItem('cart'));

    counts.forEach((item, i) =>{
        let cost = Number(price[i].getAttribute('data-price'));

        counterMinus[i].addEventListener('click',() =>{
            if(item.innerHTML > 1){
                item.innerHTML--;
                totalBill -= cost;
                updateBill();
                price[i].innerHTML = `$${item.innerHTML * cost}`;
                product[i].item = item.innerHTML;
                localStorage.setItem('cart', JSON.stringify(product));
            }
        })
        counterPlus[i].addEventListener('click',() =>{
            if(item.innerHTML < 9){
                item.innerHTML++;
                totalBill += cost;
                updateBill();
                price[i].innerHTML = `$${item.innerHTML * cost}`;
                product[i].item = item.innerHTML;
                localStorage.setItem('cart', JSON.stringify(product));
            }
        })
    })
    deleteBtn.forEach((item, i) =>{
        item.addEventListener('click', () =>{
            product = product.filter((data, index) => index != i);
            localStorage.setItem('cart', JSON.stringify(product))
            location.reload();
        })
    })
}



setCartProducts();