const productos = [
    {
        nombre: "Vinos",
        descripcion: "Variedades de vinos seleccionados.",
        img: "img/vino.jpg"
    },
    {
        nombre: "Cervezas",
        descripcion: "Amplia gama de cervezas locales e internacionales.",
        img: "img/cerveza.jpg"
    },
    {
        nombre: "Licores",
        descripcion: "Los mejores licores para cualquier ocasión.",
        img: "img/licor.jpg"
    }
];

localStorage.setItem('productos', JSON.stringify(productos));

document.addEventListener('DOMContentLoaded', function() {
    // Manejo de los productos
    const storedProductos = JSON.parse(localStorage.getItem('productos'));
    if (storedProductos) {
        const productsContainer = document.querySelector('.products');
        storedProductos.forEach(producto => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    // Manejo del botón de alerta
    const alertButton = document.getElementById('alertButton');
    if (alertButton) {
        alertButton.addEventListener('click', function() {
            alert('¡Te ganaste un 10% comprando en nuestra tienda física!');
        });
    }

    // Manejo de los botones de promoción
    const promoButtons = document.querySelectorAll('.promo-button');
    const promoContainer = document.getElementById('promoContainer');
    promoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tipoProducto = button.textContent;
            mostrarPromociones(tipoProducto);
        });
    });

    function mostrarPromociones(tipoProducto) {
        let promociones = '';
        switch(tipoProducto) {
            case 'Vinos':
                promociones = '<p>Promociones en Vinos: 2x1 en vinos seleccionados.</p>';
                break;
            case 'Cervezas':
                promociones = '<p>Promociones en Cervezas: 3x2 en todas las cervezas.</p>';
                break;
            case 'Licores':
                promociones = '<p>Promociones en Licores: 20% de descuento en licores premium.</p>';
                break;
        }
        promoContainer.innerHTML = promociones;
    }

    // Filtro de productos
    document.getElementById('filterVinos').addEventListener('click', function() {
        filterProducts('Vinos');
    });

    document.getElementById('filterCervezas').addEventListener('click', function() {
        filterProducts('Cervezas');
    });

    document.getElementById('filterLicores').addEventListener('click', function() {
        filterProducts('Licores');
    });

    function filterProducts(categoria) {
        const productsContainer = document.querySelector('.products');
        productsContainer.innerHTML = ''; 

        const filteredProducts = productos.filter(producto => producto.nombre === categoria);

        filteredProducts.forEach(producto => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
            `;
            productsContainer.appendChild(productDiv);
        });
    }
});



