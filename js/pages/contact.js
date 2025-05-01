document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };
  
    const response = await fetch('http://localhost:3000/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
  
    if (response.ok) {
      alert('¡Mensaje enviado con éxito!');
      e.target.reset();
    } else {
      alert('Error al enviar el mensaje.');
    }
  });
  