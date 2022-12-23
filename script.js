
document.addEventListener('DOMContentLoaded', () => {

    //NAVBAR
    const burger = document.querySelector('.burger-menu');
    const navOptions = document.querySelector('.nav-options');
    const closeMenu = document.querySelector('.close-menu');
    const blackFilter = document.querySelector('.black-filter');

    burger.addEventListener('click', () => {
        blackFilter.style.display = 'block';
        navOptions.style.left = '0'; //sliding navbar
    });

    closeMenu.addEventListener('click', () => {
        blackFilter.style.display = 'none';
        navOptions.style.left = '-50%'; //sliding it back :')
    });


    //IMAGES GALERY
    const galeryImages = document.querySelectorAll('.galery img');
    const biggerImage = document.querySelector('.bigger-image');

    galeryImages.forEach(image => {
        image.addEventListener('click', () => {
            galeryImages.forEach(image => {
                image.classList.remove('selected');
            });
            image.classList.add('selected');
            let number = image.getAttribute('src').charAt(21);
            biggerImage.setAttribute('src', `images/image-product-${number}.jpg`);
        });
    });

    /* A src de cada uma das imagens da galeria é "images/image-product-[1|2|3|4]-thumbnail.jpg", enquanto que a imagem maior correspondente está na path "images/image-product-[1|2|3|4].jpg". As duas versões da mesma imagem têm o mesmo número */


    //HOW MANY ITEMS DO WE WANT?
    const minus = document.querySelector('.minus');
    const plus = document.querySelector('.plus');

    const span = document.querySelector('.count span');

    let count = Number(span.innerText); //vai buscar o 0 que já lá está <=> let count = 0
    minus.addEventListener('click', () => {
        switch(count === 0){
            case true:
                break; //se a count for igual a zero, não podemos descer mais e comprar pares negativos de sapatilhas...
            case false:
                count--;
                break;
        };
        span.innerText = count;
    });

    plus.addEventListener('click', () => {
        count++;
        span.innerText = count;
    });


    //ADD TO CART
    const addToCart = document.querySelector('.add-to-cart');
    const cartFilled = document.querySelector('.cart-filled');
    const cartItems = document.querySelector('.cart-items');
    const emptyCart = document.querySelector('.empty-cart');

    //NOTA:
    //Se o utilizador adicionar 5 artigos depois de adicionar 2, por ex., a quantidade de artigos no carrinho é acumulada (5+2 = 7). Não sei se era isso que pretendiam com o desafio, mas faz mais sentido para mim do que substituir o número de artigos anterior.
    //Em E-commerce sites, como Amazon, por ex., é assim que funciona também.

    let acc = 0;
    addToCart.addEventListener('click', () => {
        //se o user tiver selecionado, pelo menos, 1 par de sapatilhas
        if(span.innerText !== '0'){
            acc = acc + +span.innerText;
            //aparece uma bolinha em cima do carrinho com o número de items selecionados
            cartFilled.innerText = acc;
            cartFilled.style.display = 'block';

            //console.log(cartItems.children);
            //se está lá o div.emptyCart, remove-se
            if(Array.from(cartItems.children).includes(emptyCart)){
                cartItems.removeChild(emptyCart);
            };

            //e o artigo e respetiva quantidade são adicionados ao carrinho
            cartItems.innerHTML = `
            
                <div class="header">
                    Cart
                </div>

                <div class="item">
                    <div>
                        <img src="images/image-product-1-thumbnail.jpg" alt="product" class="product">
                    </div>

                    <div class="text">
                        <p>Fall Limited Edition Sneakers</p>
                        <p>$125.00 x <span class="items-number">${acc}</span> <span class="price">$${+acc * 125}.00</span></p>
                    </div>

                    <div>
                        <img src="images/icon-delete.svg" alt="trash-icon" class="delete">
                    </div>
                    
                </div>

                <div class="checkout">
                    Checkout
                </div>
            `

            const item = document.querySelector('.item');
            const checkout = document.querySelector('.checkout');

            //DELETE ITEMS
            const trashIcon = document.querySelector('.delete');
            trashIcon.addEventListener('click', () => {
                //o carrinho fica vazio
                cartItems.removeChild(item);
                cartItems.removeChild(checkout);
                cartItems.appendChild(emptyCart);
                //e a bolinha com o número de artigos desaparece
                cartFilled.style.display = 'none';
                //o acc retorna a 0 (necessário, pq, caso contrário, ia registar a qtd de artigos adicionada antes de terem sido removidos e contar a partir daí)
                acc = 0;
            });
        };
    });


    //SHOW CART ITEMS
    const shoppingCart = document.querySelector('.shopping-cart');

    shoppingCart.addEventListener('click', () => {
        cartItems.classList.toggle('display-none');
    });


    //LIGHTBOX
    const lightbox = document.querySelector('.lightbox');

    const mediaQueryList = window.matchMedia('(max-width: 480px)');
    //console.log(mediaQueryList);
    //MediaQueryList {media: '(max-width: 480px)', matches: true, onchange: null}
   
    if(mediaQueryList.matches === true){ //se estou em Mobile (até 480px, inclusive)
        lightbox.style.display = 'none'; //não há lightbox

    }else{
        //se não, estamos noutro screen size (neste caso, a solução foi desenvolvida apenas para Mobile e  Desktop, mas as instruções deste block aplicam-se a todas as screen widths a cima de 480px)

        const lightboxImage = document.querySelector('.lightbox-image');
        const thumbnailImages = document.querySelectorAll('.thumbnail img');

        biggerImage.addEventListener('click', (eventObject) => {
            //console.log(eventObject);
            //a imagem que aparece na lightbox é a mesma em que o user clicou no main
            lightboxImage.setAttribute('src', eventObject.target.getAttribute('src'));
            //e a imagem da thumbnail equivalente aparece selecionada
            let imgNb = eventObject.target.getAttribute('src').charAt(21);
            thumbnailImages.forEach(image => {
                image.classList.remove('selected');
                if(image.getAttribute('src').charAt(21) === imgNb){
                    image.classList.add('selected');
                };
            });
            lightbox.style.display = 'flex';
        });

        const closeLightbox = document.querySelector('.close-lightbox');
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });


        //--NEXT & PREVIOUS IMAGE
        const next = document.querySelector('.next');
        const previous = document.querySelector('.previous');

        next.addEventListener('click', (eventObject) => {

            //console.log(eventObject.target.previousSibling.previousSibling) podia ter ido por aqui também
            let currentImg = eventObject.target.parentNode.children[0]; //imagem selecionada
            //vai buscar o número da imagem; podia ter utilizado charAt também, mas vou usar o método slice para relembrar
            let currentNb = currentImg.getAttribute('src').slice(-5,-4);

            if(currentNb !== '4'){
                let nextNb = +currentNb + 1;
                currentImg.setAttribute('src', `images/image-product-${nextNb}.jpg`);

                //deselicona a imagem da thumbnail anterior e seleciona a equivalente à imagem atual
                thumbnailImages.forEach(image => {
                    image.classList.remove('selected');
                    if(image.getAttribute('src').charAt(21) == nextNb){ // == em vez de === para NÃO comparar o datatype; neste caso, o charAt(21) é uma string e o nextNb é um integer. Podia também ter feito a conversão
                        image.classList.add('selected');
                    };
                });
            };
        });

        previous.addEventListener('click', (eventObject) => {
            let currentImg = eventObject.target.parentNode.children[0];
            //console.log(currentImg);
            let currentNb = currentImg.getAttribute('src').slice(-5,-4);
            if(currentNb !== '1'){ 
                let previousNb = +currentNb - 1;
                currentImg.setAttribute('src', `images/image-product-${previousNb}.jpg`);

                thumbnailImages.forEach(image => {
                    image.classList.remove('selected');
                    if(image.getAttribute('src').charAt(21) == previousNb){
                        image.classList.add('selected');
                    };
                });
            };
        });


        //--THUMBNAIL IMAGES - alterar a lightbox image quando clico nas imagens da thumbnail (mesmo algoritmo da secção IMAGES GALERY)
        thumbnailImages.forEach(image => {
            image.addEventListener('click', () => {
                thumbnailImages.forEach(image => {
                    image.classList.remove('selected');
                });
                image.classList.add('selected');
                let number = image.getAttribute('src').charAt(21);
                lightboxImage.setAttribute('src', `images/image-product-${number}.jpg`);
            });
        });
    };
});

/*Em alternativa ao código que começa das linhas 79 à 104, poderia ter feito

    const item = document.createElement('div');
    item.classList.add('item');

    const div = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('src', 'images/image-product-1-thumbnail.jpg');
    img.setAttribute('alt', 'product');
    img.classList.add('product');
    div.appendChild(img);

    item.appendChild(div);

    const text = document.createElement('div');
    text.classList.add('text');
    const p = document.createElement('p');
    p.innerText = 'Fall Limited Edition Sneakers';
    const p2 = document.createElement('p');
    p2.innerHTML = `
        $125.00 x <span class="items-number">${span.innerText}</span> <span class="price">$${+span.innerText * 125}.00</span>
    `; //aqui, não estaria a acumular o número de artigos, mas sim a substituir. Não sei o que pretendiam. Para mim, faz mais sentido a primeira, mas deixo as duas opções.
    text.appendChild(p);
    text.appendChild(p2);
    item.appendChild(text);

    const div2 = document.createElement('div');
    const img2 = document.createElement('img');
    img2.setAttribute('src', 'images/icon-delete.svg');
    img2.setAttribute('alt', 'trash-icon');
    img2.classList.add('delete');
    div2.appendChild(img2);
    item.appendChild(div2);

    const checkout = document.createElement('div');
    checkout.classList.add('checkout');
    checkout.innerText = 'Checkout';

    cartItems.appendChild(item);
    cartItems.appendChild(checkout);
*/
