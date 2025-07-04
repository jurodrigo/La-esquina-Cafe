    document.querySelectorAll('.categoria-link').forEach(link => {
      link.addEventListener('click', function () {
        document.querySelectorAll('.categoria-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const categoria = this.getAttribute('data-categoria');
        document.querySelectorAll('.producto').forEach(prod => {
          if (categoria === 'todos' || prod.getAttribute('data-categoria').includes(categoria)) {
            prod.style.display = '';
          } else {
            prod.style.display = 'none';
          }
        });
      });
    });
  
  // Manejo de cantidad
  document.querySelectorAll('.producto').forEach(producto => {
    const input = producto.querySelector('.cantidad-input');
    const btnSumar = producto.querySelector('.btn-sumar');
    const btnRestar = producto.querySelector('.btn-restar');

    btnSumar.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
    });

    btnRestar.addEventListener('click', () => {
      if (parseInt(input.value) > 1) input.value = parseInt(input.value) - 1;
    });
  });

  // Carrito
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

 const actualizarCarrito = () => {
  const lista = document.getElementById('carrito-lista');
  const total = document.getElementById('carrito-total');
  const badge = document.getElementById('carrito-cantidad');
  const mensajeVacio = document.getElementById('mensaje-vacio');

  lista.innerHTML = '';
  let totalPrecio = 0;
  let cantidadTotal = 0;

  if (carrito.length === 0) {
    mensajeVacio.style.display = 'block';
  } else {
    mensajeVacio.style.display = 'none';
  }

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span>${item.nombre} × ${item.cantidad}</span>
      <span>$${item.precio * item.cantidad}</span>
    `;
    lista.appendChild(li);
    totalPrecio += item.precio * item.cantidad;
    cantidadTotal += item.cantidad;
  });

  total.textContent = totalPrecio;
  badge.textContent = cantidadTotal;
  localStorage.setItem('carrito', JSON.stringify(carrito));
};


  document.querySelectorAll('.btn-pedir').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = btn.closest('.producto');
      const nombre = card.querySelector('.card-title').textContent.trim();
      const cantidad = parseInt(card.querySelector('.cantidad-input').value);
      const precioTexto = card.querySelector('.precio').textContent;
      const precio = parseInt(precioTexto.replace('$', '').trim());


      const existente = carrito.find(p => p.nombre === nombre);
      if (existente) {
        existente.cantidad += cantidad;
      } else {
        carrito.push({ nombre, cantidad, precio });
      }

      actualizarCarrito();
    });
  });

  actualizarCarrito();
  document.getElementById('btn-vaciar-carrito').addEventListener('click', () => {
  carrito = [];
  actualizarCarrito();
});
document.querySelector('.btn-success').addEventListener('click', () => {
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Carrito vacío',
      text: 'Agrega productos antes de confirmar tu pedido.',
      confirmButtonColor: '#d33'
    });
    return;
  }

  Swal.fire({
    icon: 'success',
    title: '¡Compra exitosa!',
    text: 'Tu pedido ha sido confirmado. En breve comenzaremos a prepararlo.',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#198754'
  }).then(() => {
    carrito = [];
    actualizarCarrito();
  });
});