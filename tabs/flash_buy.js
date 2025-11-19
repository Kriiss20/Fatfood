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

document.addEventListener('DOMContentLoaded', () => {
    searchBuy();
    orderOfBuy()
    orderCar()
    setTimeout(() => calcularResumen(), 200)

    document.getElementById('button_car_eliminar').addEventListener('click', () => {
        saveCar = []
        localStorage.setItem('saveCar', JSON.stringify(saveCar))
        window.location.href = window.location.pathname
    })
});

function searchBuy () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product_id")
    return productId
}

function orderOfBuy() {
    let order = searchBuy() !== null ? Number(searchBuy()) : false;

    if (!order) return; // No hay compra directa

    fetch('https://raw.githubusercontent.com/Kriiss20/Fatfood/refs/heads/main/fatfood_server.json')
        .then(r => r.json())
        .then(data => {

            let pid = data.productos.find(p => p.id === order);
            if (!pid) return;

            let container_productos = document.querySelector('.container_productos');
            let container_producto_detalle = document.querySelector('.container_producto_detalle');

            // Agregar al resumen visual
            let productos = document.createElement('div');
            productos.className = 'productos';
            productos.innerHTML = `
                <img class="producto_imagen" src="${pid.imagen}">
                <label>${pid.nombre}</label>
                <label class="product_precio">${pid.precio}$</label>
            `;
            container_productos.appendChild(productos);

            let producto_detalle = document.createElement('div');
            producto_detalle.className = 'producto_detalle';
            producto_detalle.innerHTML = `
                <label>1x</label>
                <label>${pid.nombre}:</label>
                <label>${pid.precio}$</label>
            `;

            let producto_detalle_inside = document.createElement('div');
            producto_detalle_inside.className = 'producto_detalle--inside';
            producto_detalle_inside.innerHTML = `<label>${pid.descripcion}</label>`;

            container_producto_detalle.appendChild(producto_detalle);
            container_producto_detalle.appendChild(producto_detalle_inside);
        });
}

let saveCar = JSON.parse(localStorage.getItem('saveCar'));
function orderCar () {
    let order = saveCar
    let container_productos = document.querySelector('.container_productos')
    let container_producto_detalle = document.querySelector('.container_producto_detalle')
    fetch('https://raw.githubusercontent.com/Kriiss20/Fatfood/refs/heads/main/fatfood_server.json')
        .then(r => r.json())
        .then(data => {
            if ((!order || order.length === 0) && searchBuy() === null) {
                container_productos.innerHTML = `<label style='text-align:center;font-weight:550;font-size:1.1em'>No hay Productos</label>`;
                container_producto_detalle.innerHTML = `<label style='font-weight:550;font-size:1.1em'>No hay Productos</label>`;
                return;
            }
            
            order.forEach(item => {
                let pidID = item[0] || item;
                let sabor = item[1] || '';

                let pid = data.productos.find(p => p.id === pidID);
                if (!pid) return;

                let productos = document.createElement('div');
                productos.className = 'productos';
                productos.innerHTML = `
                    <img class="producto_imagen" src="${pid.imagen}">
                    <label>${pid.nombre}</label>
                    <label class="product_precio">${pid.precio}$</label>`;
                container_productos.appendChild(productos);

                let producto_detalle = document.createElement('div');
                producto_detalle.className = 'producto_detalle';
                producto_detalle.innerHTML = `
                    <label>1x</label>
                    <label>${pid.nombre} :</label>
                    <label>${pid.precio}$</label>
                `;

                let producto_detalle_inside = document.createElement('div');
                producto_detalle_inside.className = 'producto_detalle--inside';
                producto_detalle_inside.innerHTML = `
                    <label>${pid.descripcion} ${sabor}</label>
                `; 

                container_producto_detalle.appendChild(producto_detalle);
                container_producto_detalle.appendChild(producto_detalle_inside);
            });
        })
}
function calcularResumen () {
    let totalPrecio= 0

    document.querySelectorAll('.product_precio').forEach(p => {
        console.log(p)
        num = p.textContent.replace('$','') || 0
        suma = Number(num)
        totalPrecio+= suma
    })
    document.getElementById('resumenTotal').innerHTML = totalPrecio
}
