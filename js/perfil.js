 document.querySelectorAll('.categoria-link').forEach(link => {
      link.addEventListener('click', function () {
        // Activar la categoría seleccionada
        document.querySelectorAll('.categoria-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        const categoriaSeleccionada = this.getAttribute('data-categoria');

        // Mostrar solo la sección seleccionada
        document.querySelectorAll('[data-categoria]').forEach(section => {
          if (section.getAttribute('data-categoria') === categoriaSeleccionada) {
            section.classList.remove('d-none');
          } else if (!section.classList.contains('categoria-link')) {
            section.classList.add('d-none');
          }
        });
      });
    });