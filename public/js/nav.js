const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () =>{
    if(scrollY >= 180){
        navbar.classList.add('bg');
    }else{
        navbar.classList.remove('bg');
    }
})

/* const createNavbar = () =>{
    let navbar = document.querySelector('.navbar');

    navbar.innerHTML += `
    <ul class="links__container">
    <li class="links__item">
            <a href="/" class="links active">home</a>
        </li>
        <li class="links__item">
            <a href="/dashboard" class="links">add product</a>
        </li>
        <li class="links__item">
            <a href="" class="links">about</a>
        </li>
        <li class="links__item">
            <a href="/contact" class="links">contact</a>
        </li>
    </ul>
    <div class="user__interactions">
        <div class="search__box">
            <input type="text" class="search" placeholder="search item">
            <button class="search__btn"><img src="../img/search.png" alt=""></button>
        </div>
        <div class="cart" onclick = "location.href = '/cart'">
            <img src="../img/cart.png" class="cart__icon" alt="">
            <span class="cart__item__count">00</span>
        </div>
        <div class="user">
            <img src="../img/user.png" class="user__icon" alt="">
            <div class="user__popup">
                <p>login to your account</p>
                <a>login</a>
            </div>
        </div>
    </div>
        `
}

createNavbar(); */

//user icon popup

let userIcon = document.querySelector('.user__icon');
let userPopupIcon = document.querySelector('.user__popup');

userIcon.addEventListener('click', () => userPopupIcon.classList.toggle('active'))

let text = userPopupIcon.querySelector('p');
let actionBtn = userPopupIcon.querySelector('a');
let user = JSON.parse(sessionStorage.user || null);

if(user != null){
    text.innerHTML = `log in as, ${user.name}`;
    actionBtn.innerHTML = 'log out';
    actionBtn.addEventListener('click', () => logout())
} else{
    text.innerHTML = 'login to your account';
    actionBtn.innerHTML = 'login'
    actionBtn.addEventListener('click', () => location.href = '/login')
}

const logout = () =>{
    sessionStorage.clear()
        location.reload('/')
}

//search box

let searchBtn = document.querySelector('.search__btn');
let searchBox = document.querySelector('.search');

searchBtn.addEventListener('click', () => {
    if(searchBox.value.length){
        location.href = `/search/${searchBox.value}`;
    }
})

// nav cart count

const updateNavCartCounter = () =>{
    let cartCounter = document.querySelector('.cart__item__count');

    let cartItem = JSON.parse(localStorage.getItem('cart'));

    if(cartItem == null){
        cartCounter.innerHTML = '00';
    }else{
        if(cartItem.length > 9){
            cartCounter.innerHTML = '9+';
        }else if(cartItem.length <= 9){
            cartCounter.innerHTML = `0${cartItem.length}`
        }
    }
}

updateNavCartCounter();