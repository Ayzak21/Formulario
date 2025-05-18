// Función principal de validación
function validarFormulario(event) {
    // Evitar el envío del formulario hasta validar
    event.preventDefault();
    
    // Obtener referencias a los campos del formulario
    const nombres = document.querySelector('input[name="name_control"]');
    const apellidos = document.querySelector('input[name="subname_control"]');
    const telefono = document.querySelector('input[name="name"]'); // campo de teléfono
    const lugarNacimiento = document.querySelector('input[name="born_control"]');
    const edad = document.querySelector('input[name="age_control"]');
    const cedula = document.querySelector('input[name="dni_control"]');
    const fechaNacimiento = document.querySelector('input[name="date_control"]');
    
    // Variable para controlar la validación
    let esValido = true;
    
    // Validar nombres (solo letras y espacios)
    if (!validarSoloLetras(nombres.value)) {
        mostrarError(nombres, "El nombre debe contener solo letras");
        esValido = false;
    } else {
        quitarError(nombres);
    }
    
    // Validar apellidos (solo letras y espacios)
    if (!validarSoloLetras(apellidos.value)) {
        mostrarError(apellidos, "El apellido debe contener solo letras");
        esValido = false;
    } else {
        quitarError(apellidos);
    }
    
    // Validar teléfono (debe tener 10 dígitos numéricos)
    if (!validarTelefono(telefono.value)) {
        mostrarError(telefono, "El teléfono debe tener 10 dígitos numéricos");
        esValido = false;
    } else {
        quitarError(telefono);
    }
    
    // Validar lugar de nacimiento (letras, espacios y algunos caracteres especiales)
    if (!validarLugarNacimiento(lugarNacimiento.value)) {
        mostrarError(lugarNacimiento, "Ingrese un lugar de nacimiento válido");
        esValido = false;
    } else {
        quitarError(lugarNacimiento);
    }
    
    // Validar edad (debe ser un número entre 1 y 120)
    if (!validarEdad(edad.value)) {
        mostrarError(edad, "La edad debe ser un número entre 1 y 120");
        esValido = false;
    } else {
        quitarError(edad);
    }
    
    // Validar cédula (debe tener 10 dígitos numéricos)
    if (!validarCedula(cedula.value)) {
        mostrarError(cedula, "La cédula debe tener 10 dígitos y ser válida");
        esValido = false;
    } else {
        quitarError(cedula);
    }
    
    // Validar fecha de nacimiento (debe ser coherente con la edad y no ser futura)
    if (!validarFechaNacimiento(fechaNacimiento.value, edad.value)) {
        mostrarError(fechaNacimiento, "La fecha de nacimiento debe ser coherente con la edad");
        esValido = false;
    } else {
        quitarError(fechaNacimiento);
    }
    
    // Si todo es válido, enviar el formulario
    if (esValido) {
        document.querySelector('.formulario1').submit();
        alert('Formulario enviado correctamente');
    }
}

// Función para validar que solo contenga letras y espacios
function validarSoloLetras(texto) {
    return /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/.test(texto);
}

// Función para validar el teléfono (10 dígitos)
function validarTelefono(telefono) {
    return /^\d{10}$/.test(telefono);
}

// Función para validar el lugar de nacimiento
function validarLugarNacimiento(lugar) {
    return /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s\-,.]+$/.test(lugar);
}

// Función para validar la edad
function validarEdad(edad) {
    const edadNum = parseInt(edad);
    return !isNaN(edadNum) && edadNum >= 1 && edadNum <= 120;
}

// Función para validar la cédula ecuatoriana
function validarCedula(cedula) {
    // Verificar que tenga 10 dígitos
    if (!/^\d{10}$/.test(cedula)) {
        return false;
    }
    
    // Algoritmo de validación para cédula ecuatoriana
    // Este es un algoritmo simplificado para la validación
    const digitoVerificador = parseInt(cedula.substring(9, 10));
    let suma = 0;
    
    for (let i = 0; i < 9; i++) {
        let multiplicador = (i % 2 === 0) ? 2 : 1;
        let valor = multiplicador * parseInt(cedula.charAt(i));
        suma += (valor >= 10) ? (valor - 9) : valor;
    }
    
    const modulo = suma % 10;
    const resultadoVerificacion = (modulo === 0) ? 0 : 10 - modulo;
    
    return resultadoVerificacion === digitoVerificador;
}

// Función para validar la fecha de nacimiento
function validarFechaNacimiento(fecha, edadIngresada) {
    if (!fecha) return false;
    
    const fechaNac = new Date(fecha);
    const hoy = new Date();
    
    // Verificar que la fecha no sea futura
    if (fechaNac > hoy) return false;
    
    // Calcular la edad basada en la fecha de nacimiento
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    
    // Comparar con la edad ingresada (con un margen de error de 1 año)
    const edadNum = parseInt(edadIngresada);
    return Math.abs(edad - edadNum) <= 1;
}

// Función para mostrar mensaje de error
function mostrarError(elemento, mensaje) {
    // Quitar error previo si existe
    quitarError(elemento);
    
    // Crear elemento para mostrar el error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-mensaje';
    errorDiv.innerText = mensaje;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    
    // Agregar borde rojo al elemento
    elemento.style.borderColor = 'red';
    
    // Insertar mensaje después del elemento
    elemento.parentNode.insertBefore(errorDiv, elemento.nextSibling);
}

// Función para quitar mensaje de error
function quitarError(elemento) {
    // Restablecer el borde
    elemento.style.borderColor = '#ddd';
    
    // Buscar y eliminar el mensaje de error si existe
    const errorDiv = elemento.parentNode.querySelector('.error-mensaje');
    if (errorDiv) {
        errorDiv.parentNode.removeChild(errorDiv);
    }
}

// Agregar evento al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('.formulario1');
    formulario.addEventListener('submit', validarFormulario);
});