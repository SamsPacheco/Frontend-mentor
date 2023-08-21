/* menu hamburgesa */
const burgerMenu = document.querySelector('.navbar-modal__background');
const burgerIcon = document.querySelector('.header__navigation__icon');
const closeIcon = document.querySelector('.navbar-modal__close-icon');

burgerIcon.addEventListener('click', ()=>{
    burgerMenu.style.display = 'block';
});

closeIcon.addEventListener('click', ()=>{
    burgerMenu.style.display = 'none';
});

/* MODIFICADOR DE CANTIDAD DE PRODUCTO */
let minusBtn = document.querySelector('.input__minus');
let plusBtn = document.querySelector('.input__plus');
let inputNum = document.querySelector('.input__number');

let cant = 0;

minusBtn.addEventListener('click', ()=>{
    cant--;
    if(cant <= 1){
        cant = 0;
    }
    inputNum.value = cant;
});

plusBtn.addEventListener('click', ()=>{
    cant++;
    inputNum.value = cant;
});

// add to cart 
const addToCartBtn = document.querySelector('.details__Button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText);
let cartConteiner = document.querySelector('.cart-modal__checkout-container');

addToCartBtn.addEventListener('click', ()=>{
    lastValue += cant;
    cartNotification.innerText = lastValue;
    if(lastValue > 0){
        cartNotification.style.display = 'block';
    }
    drawCartProduct();
});

/* mostrar el modal con el detalle del carrito  */
const cartBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');

cartBtn.addEventListener('click', ()=>{
    cartModal.classList.toggle('show');
    if(lastValue > 0){
        drawCartProduct();
    }else{
        cartConteiner.innerHTML = '<p class="Empty-cart" >Your cart is empty.</p>';
    }
    
});

// carrusel de imagenes

const carruselImg = document.querySelector('.gallery__img-container');
const previousBtn = document.querySelector('.gallery__previous');
const nextBtn = document.querySelector('.gallery__next');
let count = 1;


previousBtn.addEventListener('click', ()=>{
    carruselPrevious(carruselImg);
});

nextBtn.addEventListener('click', ()=>{
    carruselNext(carruselImg);
});

/* carrusel de imgenes desktop */

const modalGalleryBackground = document.querySelector('.modal-gallery__background');
const closeIconGallery = document.querySelector('.modal-gallery__close-icon')
const galleryPreviousBtn = document.querySelector('.modal-gallery__previous');
const galleryNextBtn = document.querySelector('.modal-gallery__next');
const modalCarruselImg = document.querySelector('.modal-gallery__img-container');


carruselImg.addEventListener('click', ()=>{
    if (window.innerWidth < 1115) {
        carruselImg.disabled = true;
    } else {
        carruselImg.disabled = false;
        modalGalleryBackground.style.display = 'grid';
    }
});

closeIconGallery.addEventListener('click', ()=>{
    modalGalleryBackground.style.display = 'none';
});

galleryPreviousBtn.addEventListener('click', ()=>{
    carruselPrevious(modalCarruselImg);
});

galleryNextBtn.addEventListener('click', ()=>{
    carruselNext(modalCarruselImg);
});

// seleccion de thumnails para la vista de imgs

let thumbnails = document.querySelectorAll('.gallery__thumnail');
thumbnails = [...thumbnails];
thumbnails.forEach(thumbnail =>{
    /* escuchamos el evento de cada img */
    thumbnail.addEventListener('click', (event)=>{
        carruselImg.style.backgroundImage = `url(../images/image-product-${event.target.id}.jpg)`;
    })
    
});

let thumbnailsModal = document.querySelectorAll('.modal-gallery__thumnail');
thumbnailsModal = [...thumbnailsModal];
thumbnailsModal.forEach(thumbnail =>{
    /* escuchamos el evento de cada img */
    thumbnail.addEventListener('click', (event)=>{
        modalCarruselImg.style.backgroundImage = `url(../images/image-product-${event.target.id.slice(-1)}.jpg)`;
    })
    
});

// functions 
function carruselPrevious(imgContainer){

    if(count == 1){
        count = 4;
    }else{
        count--;
    }
    imgContainer.style.backgroundImage = `url(../images/image-product-${count}.jpg)`;
}

function carruselNext(imgContainer){
    
    if(count == 4){
        count = 1;
    }else{
        count++;
    }
    imgContainer.style.backgroundImage = `url(../images/image-product-${count}.jpg)`;
}

function deletProduct(){
    const deleteProductBtn = document.querySelector('.cart-maodal__delete-icon');
    deleteProductBtn.addEventListener('click', ()=>{
        cartConteiner.innerHTML = '<p class="Empty-cart" > Your cart is empty. </p>';
        lastValue = 0; 
        cartNotification.innerText = lastValue;
        cartNotification.style.display = 'none';
    })
}

function drawCartProduct(){
    cartConteiner.innerHTML = `
            <div class="cart-modal__details-container">
                <img class="cart-modal__img" src="images/image-product-1-thumbnail.jpg" alt="cart-img">
                <div>
                <p class="cart-modal__product">Fall Limited Edition Sneakers</p>
                <p class="cart-modal__price">$125.00 x ${lastValue}<span class="cart-modal__price__cant"> $${lastValue*125}.00</span></p>
            </div>
            <img class="cart-maodal__delete-icon" src="images/icon-delete.svg" alt="delete">
        </div>
        <button class="cart-modal__delete">Checkout</button>`;
        deletProduct();
}



