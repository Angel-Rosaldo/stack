document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validación básica
            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            const terminos = document.getElementById('terminos').checked;
            
            if (!nombre || !correo || !telefono || !mensaje || !terminos) {
                alert('Por favor complete todos los campos requeridos');
                return;
            }

            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                alert('Por favor complete el reCAPTCHA');
                return;
            }

            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            try {
                const response = await fetch('/api/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre,
                        correo,
                        telefono,
                        mensaje,
                        terminos,
                        recaptcha: recaptchaResponse
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Mensaje enviado con éxito');
                    contactForm.reset();
                    grecaptcha.reset();
                } else {
                    throw new Error(result.error || 'Error al enviar el formulario');
                }
            } catch (error) {
                console.error('Error:', error);
                alert(error.message || 'Error al enviar el mensaje');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensaje';
            }
        });
    }
});