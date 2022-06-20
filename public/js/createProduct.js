const createProduct = (data) => {
    let productContainer = document.querySelector('.product__container');
    productContainer.innerHTML += `
 <div class="product__card">
    <button class="btn edit-btn" onclick="location.href = '/add-product/${data.id}'"><img src="./img/edit.png" alt=""></button>
    <button class="btn open-btn" onclick ="location.href = '/product/${data.id}'"><img src="./img/open.png" alt=""></button>
    <button class="btn delete-btn" onclick ="deleteItem('${data.id}')"><img src="./img/delete.png" alt=""></button>
    <img src="${data.image}" class="product__img" alt="">
    <p class="product__name">${data.name}</p>
</div>
`;
}

const deleteItem = (id) =>{
    fetch('/delete-product', {
        method: 'post',
        headers: new Headers({'Content-type': 'application/json'}),
        body: JSON.stringify({id:id})
    }).then(res => res.json())
    .then(data =>{
        //process data
        if(data == 'success'){
            location.reload();
        }else{
            showAlert('some error occures');
        }
    })
}