// el document.addEventListener se asegura de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Script cargado correctamente');
    
    // FORMULARIO
    const formulario = document.querySelector('#formulario form');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            const mensaje = document.createElement('div');
            mensaje.textContent = '¡Formulario enviado correctamente!';
            mensaje.style.cssText = 'background: var(--light-primary); color: var(--dark-primary); padding: 15px; border-radius: 10px; margin-top: 15px; text-align: center; font-weight: 600;';
            formulario.appendChild(mensaje);
            setTimeout(() => mensaje.remove(), 4000);
        });
    }

    // CALCULADORA - BOTONES
    const btnCalcular = document.querySelector('.btn-calcular');
    const btnLimpiar = document.querySelector('.btn-limpiar');
    
    console.log('🔍 Botones encontrados:', {btnCalcular: !!btnCalcular, btnLimpiar: !!btnLimpiar});
    
    if (btnCalcular) {
        btnCalcular.addEventListener('click', function(e) {
            console.log('🧮 Botón Calcular clickeado');
            calcularInteresCompuesto();
        });
    } else {
        console.log('❌ NO se encontró .btn-calcular');
    }
    
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', function(e) {
            console.log('🧹 Botón Limpiar clickeado');
            limpiarCalculadora();
        });
    } else {
        console.log('❌ NO se encontró .btn-limpiar');
    }
});

// FUNCIONES DE LA CALCULADORA
function calcularInteresCompuesto() {
    console.log('🚀 Iniciando cálculo...');
    
    const capitalEl = document.getElementById('capital');
    const tasaEl = document.getElementById('tasa');
    const añosEl = document.getElementById('años');
    const aportacionEl = document.getElementById('aportacion');
    
    console.log('🔍 Elementos HTML:', {
        capital: !!capitalEl,
        tasa: !!tasaEl,
        años: !!añosEl,
        aportacion: !!aportacionEl
    });
    
    if (!capitalEl || !tasaEl || !añosEl || !aportacionEl) {
        console.error('❌ Faltan inputs de calculadora');
        alert('❌ Error: Faltan elementos HTML de la calculadora');
        return;
    }
    
    const capital = parseFloat(capitalEl.value) || 0;
    const tasa = parseFloat(tasaEl.value) / 100 || 0;
    const años = parseInt(añosEl.value) || 0;
    const aportacion = parseFloat(aportacionEl.value) || 0;
    
    console.log('📊 Valores:', {capital, tasa: tasa*100+'%', años, aportacion});
    
    if (capital <= 0 && aportacion <= 0) {
        alert('⚠️ Introduce capital inicial o aportaciones');
        return;
    }
    if (años <= 0) {
        alert('⚠️ Introduce años (mínimo 1)');
        return;
    }
    
    // CÁLCULO
    const n = 12, t = años, i = tasa / n, nt = n * t;
    const capitalFinal = capital * Math.pow(1 + i, nt);
    let aportacionesFinal = 0;
    if (aportacion > 0 && i > 0) {
        aportacionesFinal = aportacion * ((Math.pow(1 + i, nt) - 1) / i);
    } else if (aportacion > 0) {
        aportacionesFinal = aportacion * n * t;
    }
    
    const montoTotal = capitalFinal + aportacionesFinal;
    const totalAportado = capital + (aportacion * n * t);
    const ganancia = montoTotal - totalAportado;
    
    console.log('💰 Resultado:', {montoTotal, ganancia});
    
    // MOSTRAR RESULTADOS
    document.getElementById('montoFinal').textContent = 
        new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'}).format(montoTotal);
    document.getElementById('gananciaTotal').textContent = 
        `💰 Ganancia: ${new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'}).format(ganancia)}`;
    
    document.getElementById('detalleAportaciones').innerHTML = 
        (capital > 0 ? `📈 Capital compuesto: ${new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'}).format(capitalFinal)}<br>` : '') +
        (aportacion > 0 ? `💎 Aportaciones: ${new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'}).format(aportacion * n * t)}` : '');
    
    document.getElementById('resultado').classList.add('mostrar');
    document.getElementById('resultado').scrollIntoView({behavior: 'smooth'});
}

function limpiarCalculadora() {
    console.log('🧹 Limpiando...');
    document.getElementById('capital').value = '';
    document.getElementById('tasa').value = '';
    document.getElementById('años').value = '';
    document.getElementById('aportacion').value = '';
    document.getElementById('resultado').classList.remove('mostrar');
}