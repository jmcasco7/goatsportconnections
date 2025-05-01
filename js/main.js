// Código JavaScript básico
console.log("¡El sitio está funcionando!");

document.addEventListener('DOMContentLoaded', function() {
    console.log("El DOM está completamente cargado");

    // Dropdown para móviles y tablets
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                dropdownMenu.classList.remove('show');
            }
        });
    }

    // Reducir el header al hacer scroll (mejorado)
    const header = document.getElementById('header');
    function checkHeaderShrink() {
        if (window.location.hash === "#inicio" || window.scrollY < 150) {
            header.classList.remove('shrink');
        } else {
            header.classList.add('shrink');
        }
    }

    window.addEventListener('scroll', checkHeaderShrink);
    window.addEventListener('hashchange', checkHeaderShrink); // para cuando cambias de sección
    checkHeaderShrink(); // para que aplique apenas carga

    // Enviar formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const name = contactForm.name.value;
            const email = contactForm.email.value;
            const message = contactForm.message.value;

            try {
                const response = await fetch('http://localhost:3000/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, message })
                });

                if (response.ok) {
                    alert('Correo enviado exitosamente');
                    contactForm.reset();
                } else {
                    alert('Error al enviar el correo');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al enviar el correo');
            }
        });
    }
});
