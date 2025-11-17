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
    searchBuy()
    orderOfBuy()
})

function searchBuy () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product_id")
    return productId
}

function orderOfBuy () {
    let order = searchBuy() !== null ? searchBuy() : false;
    order = Number(order)
    fetch('https://raw.githubusercontent.com/Kriiss20/Fatfood/refs/heads/main/fatfood_server.json')
        .then(r => r.json())
        .then(data => {
            let container_productos = document.querySelector('.container_productos')
            let container_producto_detalle = document.querySelector('.container_producto_detalle')
            data.productos.forEach(pid => {
                if (order !== false && order === pid.id) {
                    console.log(pid)
                    productos = document.createElement('div')
                    productos.className = 'productos'
                    productos.innerHTML = `
                    <img class="producto_imagen" src="${pid.imagen}">
                    <label>${pid.nombre} </label>
                    <label>${pid.precio} $</label>`;
                    container_productos.appendChild(productos)

                    producto_detalle = document.createElement('div')
                    producto_detalle.className = 'producto_detalle'
                    producto_detalle.innerHTML = `
                    <label>1x ${pid.nombre} :</label>
                    <label>${pid.precio}$</label>`

                    producto_detalle_inside = document.createElement('div')
                    producto_detalle_inside.className = 'producto_detalle--inside'
                    producto_detalle_inside.innerHTML = `<label>${pid.descripcion}</label>`
                    container_producto_detalle.appendChild(producto_detalle)
                    container_producto_detalle.appendChild(producto_detalle_inside)
                } else if (order === 0 || order == false){
                    document.querySelector('.container_productos').innerHTML =`<label style='text-align:center;font-weight:550;font-size:1.1em'> No hay Productos</label>`
                    document.querySelector('.container_producto_detalle').innerHTML =`<label style='font-weight:550;font-size:1.1em'> No hay Productos</label>`

                }
            })
        })
}