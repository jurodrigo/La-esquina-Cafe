document.getElementById('form-contacto').addEventListener('submit', function (e) {
    e.preventDefault();
    Swal.fire({
    icon: 'success',
    title: '¡Mensaje enviado!',
    text: 'Nos pondremos en contacto contigo pronto.',
    confirmButtonColor: '#198754'
    });
    this.reset();
});
 