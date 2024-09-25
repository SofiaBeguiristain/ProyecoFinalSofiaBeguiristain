document.addEventListener('DOMContentLoaded', function() {
    fetch('../productos.json')
        .then(response => response.json())
        .then(productos => {
            localStorage.setItem('productos', JSON.stringify(productos)); // Guardar en localStorage
            mostrarProductos(productos); // Mostrar productos en la página
        })
        .catch(error => console.error('Error al cargar los productos:', error));


    function mostrarProductos(productos) {
        const productsContainer = document.querySelector('.products');
        productsContainer.innerHTML = ''; 

        productos.forEach(producto => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio}</p>
                <button class="addToCartButton" data-id="${producto.id}">Añadir al carrito</button>
            `;
            productsContainer.appendChild(productDiv);
        });


        const addToCartButtons = document.querySelectorAll('.addToCartButton');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.id;
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];


        if (productos.length === 0) {
            productos = [
                { id: 1, nombre: "Vinos", precio: 15, img: "../img/vino.jpg" },
                { id: 2, nombre: "Cervezas", precio: 10, img: "../img/cerveza.jpg" },
                { id: 3, nombre: "Licores", precio: 25, img: "../img/licor.jpg" }
            ];
        }

        const productToAdd = productos.find(product => product.id == productId);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];


        const existingProduct = cart.find(item => item.id == productToAdd.id);
        if (existingProduct) {
            existingProduct.cantidad += 1; 
        } else {
            productToAdd.cantidad = 1; 
            cart.push(productToAdd);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        Swal.fire({
            title: 'Producto añadido',
            text: `${productToAdd.nombre} ha sido añadido al carrito.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        mostrarCarrito(); // 
    }


    function mostrarCarrito() {
        const cartContainer = document.querySelector('.cart');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = ''; 

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            cart.forEach(producto => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button class="removeFromCartButton" data-id="${producto.id}">Eliminar</button>
                `;
                cartContainer.appendChild(cartItem);
            });

            const comprarButton = document.createElement('button');
            comprarButton.textContent = 'Comprar';
            comprarButton.className = 'comprarButton';
            comprarButton.addEventListener('click', finalizarCompra);
            cartContainer.appendChild(comprarButton);
        }


        const removeFromCartButtons = document.querySelectorAll('.removeFromCartButton');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.id;
                removeFromCart(productId);
            });
        });
    }


    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(product => product.id != productId);
        localStorage.setItem('cart', JSON.stringify(cart));

        Swal.fire({
            title: 'Producto eliminado',
            text: 'El producto ha sido eliminado del carrito.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });

        mostrarCarrito(); 
    }


    function finalizarCompra() {
        Swal.fire({
            title: 'Pedido completado',
            text: 'Su pedido ha sido completado con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });


        localStorage.removeItem('cart');
        mostrarCarrito(); 
    }


    mostrarCarrito();
});








document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos desde un archivo JSON local
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            mostrarPromociones(productos);
        })
        .catch(error => console.error('Error al cargar los productos:', error));

    // Mostrar promociones dinámicamente
    function mostrarPromociones(productos) {
        const promoContainer = document.getElementById('promoContainer');
        promoContainer.innerHTML = ''; // Limpiar contenedor de promociones

        const productosEnPromocion = productos.filter(producto => producto.promocion === "3x2");

        if (productosEnPromocion.length > 0) {
            productosEnPromocion.forEach(producto => {
                const promoDiv = document.createElement('div');
                promoDiv.className = 'promo-item';
                promoDiv.innerHTML = `
                    <img src="${producto.img}" alt="${producto.nombre}">
                    <h3>${producto.nombre} - ¡Oferta 3x2!</h3>
                    <p>${producto.descripcion}</p>
                    <p>Precio: $${producto.precio} (Compra 3 y paga solo 2 en nuestra tienda física)</p>
                    
                `;
                promoContainer.appendChild(promoDiv);
            });
        } else {
            promoContainer.innerHTML = '<p>No hay promociones disponibles.</p>';
        }
    }
});





const alertButton = document.getElementById('alertButton');
    if (alertButton) {
        alertButton.addEventListener('click', function() {
            Swal.fire({
                title: '¡Felicidades!',
                text: '¡Te ganaste un 10% de descuento comprando en nuestra tienda física!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        });
    }




// Obtener todos los botones "Añadir al carrito"
document.querySelectorAll('.addToCartButton').forEach(boton => {
    boton.addEventListener('click', () => {
        const productId = boton.getAttribute('data-id');
        agregarProductoAlCarrito(productId);
    });
});

// Función para agregar el producto al carrito
function agregarProductoAlCarrito(idProducto) {
    const producto = productos.find(producto => producto.id == idProducto);
    console.log(`Producto añadido al carrito: ${producto.nombre}`);
    // Aquí puedes añadir código para agregar el producto al carrito
}





function agregarProductoAlCarrito(idProducto) {
    const producto = productos.find(producto => producto.id == idProducto);
    Swal.fire({
        title: 'Producto añadido!',
        text: `Has añadido ${producto.nombre} al carrito.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}


