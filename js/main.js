console.log("¡El sitio está funcionando!");

document.addEventListener('DOMContentLoaded', function () {
    console.log("El DOM está completamente cargado");

    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.dropdown')) {
                dropdownMenu.classList.remove('show');
            }
        });
    }

    const header = document.getElementById('header');
    function checkHeaderShrink() {
        if (window.location.hash === "#inicio" || window.scrollY < 150) {
            header.classList.remove('shrink');
        } else {
            header.classList.add('shrink');
        }
    }

    window.addEventListener('scroll', checkHeaderShrink);
    window.addEventListener('hashchange', checkHeaderShrink);
    checkHeaderShrink();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const name = contactForm.name.value;
            const email = contactForm.email.value;
            const message = contactForm.message.value;

            // Detectar entorno
            const baseUrl = window.location.hostname.includes("localhost")
                ? "http://localhost:3000"
                : ""; // mismo dominio de producción

            try {
                const response = await fetch(`${baseUrl}/send-email`, {
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
