function sideBar () {
    back = document.getElementById('body_container--sideBar').style.display= 'block'
    button_menu = document.getElementById('icon_menu').style.display= 'none'
}
function closeBar() {
    back = document.getElementById('body_container--sideBar').style.display= 'none'
    button_menu = document.getElementById('icon_menu').style.display= ''
}

document.addEventListener('click', (e) => {
    let back = document.getElementById('body_container--sideBar')
    if (back.style.display === 'block' && e.target === back) {
        back.style.display = 'none'
        button_menu = document.getElementById('icon_menu').style.display= ''
    }
})
let tabActive = '1'
function button_catalogo_hover (tab) {
    let button1 = document.getElementById('catalogo_label--1')
    let button2 = document.getElementById('catalogo_label--2')
    let button3 = document.getElementById('catalogo_label--3')
    let button4 = document.getElementById('catalogo_label--4')

    button1.style.color = '';
    button1.style.backgroundColor = '';
    button2.style.color = '';
    button2.style.backgroundColor = '';
    button3.style.color = '';
    button3.style.backgroundColor = '';
    button4.style.color = '';
    button4.style.backgroundColor = '';

    if (tab === '1') {
        button1.style.color = '#FFD700';
        button1.style.backgroundColor = '#97333b'
        tabActive = '1'
    } else if (tab === '2') {
        button2.style.color = '#FFD700';
        button2.style.backgroundColor = '#97333b'
        tabActive = '2'
    } else if (tab === '3') {
        button3.style.color = '#FFD700';
        button3.style.backgroundColor = '#97333b'
        tabActive = '3'
    } else if (tab === '4') {
        button4.style.color = '#FFD700';
        button4.style.backgroundColor = '#97333b'
        tabActive = '4'
    }
    selectorCatalogo(tab)
}
document.addEventListener('DOMContentLoaded', () => {
    button_catalogo_hover('1')
    arrow()
    server_on()
})

function selectorCatalogo(tabActive) {
    const salados = document.querySelectorAll('.productos_salados');
    const dulces = document.querySelectorAll('.productos_dulces');
    const bebidas = document.querySelectorAll('.productos_bebidas');

    // Ocultar todos
    document.querySelectorAll('.container_productos').forEach(p => {
        p.style.display = 'none';
    });

    // Mostrar según el tab
    if (tabActive === '1') {
        [salados, dulces, bebidas].forEach(grupo => {
            grupo.forEach(producto => producto.style.display = 'flex');
        });
    } else if (tabActive === '2') {
        salados.forEach(p => p.style.display = 'flex');
    } else if (tabActive === '3') {
        dulces.forEach(p => p.style.display = 'flex');
    } else if (tabActive === '4') {
        bebidas.forEach(p => p.style.display = 'flex');
    }
}
function arrow () {
    let carousel = document.getElementById('container_masSells--inside')
    let arrowLeft = document.getElementById('arrow_left')
    let arrowRight = document.getElementById('arrow_right')

    arrowLeft.style.opacity = carousel.scrollLeft <= 0 ? '0' : '1';
    const scrollAmount = 250; // Cuánto desplazar por clic (ajusta según necesites)

    arrowLeft.addEventListener('click', () => {
        carousel.scrollLeft -= scrollAmount;
    });

    arrowRight.addEventListener('click', () => {
        carousel.scrollLeft += scrollAmount;
    });

    carousel.addEventListener('scroll', () => {
        arrowLeft.style.opacity = carousel.scrollLeft <= 0 ? '0' : '1';
        arrowRight.style.opacity = 
            carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth - 10) 
            ? '0' : '1';
    });
}

document.querySelectorAll('.button_buy').forEach(button => {
    button.addEventListener('click', () =>{
        const productId = button.getAttribute('data-product-id')
        document.write(productId)
    })
})

function server_on () {
    fetch('https://raw.githubusercontent.com/Kriiss20/Fatfood/refs/heads/main/fatfood_server.json')
        .then(r => r.json())
        .then(data => {
            let catalogo_productos = document.querySelector('.catalogo_productos')
            data.productos.forEach(p => {
                const container_productos = document.createElement('div')
                container_productos.className = 'container_productos'
                container_productos.className += ` productos_${p.categoria}`
                container_productos.innerHTML = `
                <img class="producto_imagen" src="${p.imagen}">
                <label>${p.nombre}</label>
                <label>${p.precio}$ </label>
                <div class="productos_buttom">
                    <button class="button_buy" data-product-id="${p.id}">Comprar</button>
                    <img class="producto_car--svg" src="svg/cart.svg" alt="">
                </div>
                `;
                catalogo_productos.appendChild(container_productos)
            })
        })
}




