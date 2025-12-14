// JavaScript para manejar el envío del formulario y mostrar mensaje de confirmación
document.addEventListener('DOMContentLoaded', function() { // Espera a que el HTML cargue completamente antes de ejecutar el código. Sin esto, querySelector fallaría porque el formulario no existe aún.
    const formulario = document.querySelector('#formulario form'); // Selecciona el formulario dentro de la sección #formulario. Guarda referencia en constante
    
    formulario.addEventListener('submit', function(e) { // Escucha el evento "submit" del formulario. Cuando usuario haga clic en "Enviar", ejecuta esta función. e es el objeto evento.
        e.preventDefault(); // Evita envío real
        
        // Crea mensaje de confirmación
        const mensaje = document.createElement('div'); //Crea un nuevo elemento <div> dinámicamente y le asigna ID único para identificarlo después si necesitas.
        mensaje.id = 'mensaje-confirmacion';
        // Inserta HTML completo dentro del div: estilos inline con las variables CSS (--primary, etc.), texto de éxito y pequeño con info adicional.
        mensaje.innerHTML = ` 
            <div style="
                background: linear-gradient(135deg, var(--primary), var(--dark-primary));
                color: var(--text-icons);
                padding: 1.5rem 2rem;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 8px 30px rgba(76, 175, 80, 0.4);
                max-width: 500px;
                margin: 2rem auto;
                font-weight: 600;
                font-size: 1.1rem;
                animation: slideIn 0.4s ease;
            ">
                ✅ ¡Gracias! Hemos recibido tu solicitud.<br>
                <small style="font-weight: 400; opacity: 0.9;">
                    Te contactaremos en 24-48h con tus consejos personalizados.
                </small>
            </div>
        `;
        
        const section = document.querySelector('#formulario'); // Encuentra la sección contenedora.
        section.innerHTML = ''; // borra TODO el contenido (incluido formulario).
        section.appendChild(mensaje); // Añade solo el mensaje de éxito.
        
        // Scroll suave al mensaje
        mensaje.scrollIntoView({ behavior: 'smooth' });
    });
});