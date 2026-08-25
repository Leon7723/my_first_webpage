console.log("¡bienvenido a León DEV!");
let nombre = "León";
console.log("hola" + nombre);
const boton = document.getElementById("saludo");
boton.addEventListener("click", function() {
    alert("¡hola! este mensaje lo mostró JavaScript.");
});

const enlacesNavegacion = document.querySelectorAll(".navegacion a");

const botonIdioma = document.getElementById("cambiar-idioma");
let idiomaActual = localStorage.getItem("idioma") || "es";

function aplicarIdioma(idioma) {
    document.querySelectorAll("[data-es][data-en]").forEach(function (elemento) {
        elemento.innerHTML = elemento.dataset[idioma];
    });

    document.querySelectorAll("[data-placeholder-es][data-placeholder-en]").forEach(function (elemento) {
        elemento.placeholder = elemento.dataset["placeholder-" + idioma];
    });

    document.documentElement.lang = idioma;
    botonIdioma.querySelector("span").textContent = idioma;
    botonIdioma.querySelector("strong").textContent = idioma === "es" ? "en" : "es";
    botonIdioma.setAttribute("aria-label", idioma === "es" ? "Cambiar a inglés" : "Switch to Spanish");
}

aplicarIdioma(idiomaActual);

botonIdioma.addEventListener("click", function () {
    idiomaActual = idiomaActual === "es" ? "en" : "es";
    botonIdioma.classList.remove("cambiando");
    requestAnimationFrame(function () {
        botonIdioma.classList.add("cambiando");
        localStorage.setItem("idioma", idiomaActual);
        setTimeout(function () {
            aplicarIdioma(idiomaActual);
            botonIdioma.classList.remove("cambiando");
        }, 550);
    });
});

enlacesNavegacion.forEach(function (enlace) {
    enlace.addEventListener("click", function (evento) {
        const destino = document.querySelector(enlace.getAttribute("href"));
        if (!destino) return;

        evento.preventDefault();
        destino.scrollIntoView({ behavior: "smooth", block: "start" });
        destino.classList.remove("destino-activo");
        requestAnimationFrame(function () {
            destino.classList.add("destino-activo");
        });
    });
});

const logros = document.querySelectorAll(".logro");
const listaLogros = document.querySelector(".lista-de-logros");

function cargarProgresos() {
    logros.forEach(function (logro) {
        const porcentaje = logro.querySelector("strong");
        const valor = Math.min(100, Math.max(0, Number.parseFloat(porcentaje.textContent) || 0));
        porcentaje.textContent = valor + "%";
        logro.querySelector(".progreso").style.width = valor + "%";
    });
}

if ("IntersectionObserver" in window && listaLogros) {
    const observador = new IntersectionObserver(function (entradas, observer) {
        if (entradas[0].isIntersecting) {
            requestAnimationFrame(cargarProgresos);
            observer.disconnect();
        }
    }, { threshold: 0.25 });
    observador.observe(listaLogros);
} else {
    cargarProgresos();
}

const tarjetasParaRevelar = document.querySelectorAll(".herramienta-card, .meta-card");

tarjetasParaRevelar.forEach(function (tarjeta) {
    tarjeta.classList.add("revelar");
});

if ("IntersectionObserver" in window) {
    const observadorTarjetas = new IntersectionObserver(function (entradas, observer) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    tarjetasParaRevelar.forEach(function (tarjeta) {
        observadorTarjetas.observe(tarjeta);
    });
} else {
    tarjetasParaRevelar.forEach(function (tarjeta) {
        tarjeta.classList.add("visible");
    });
}

const abrirContacto = document.getElementById("abrir-contacto");
const cerrarContacto = document.getElementById("cerrar-contacto");
const contacto = document.getElementById("contacto");
const mensaje = document.getElementById("mensaje");
const estadoCopia = document.getElementById("estado-copia");

abrirContacto.addEventListener("click", function () {
    contacto.hidden = false;
    mensaje.focus();
});

cerrarContacto.addEventListener("click", function () {
    contacto.hidden = true;
});

contacto.addEventListener("click", function (evento) {
    if (evento.target === contacto) contacto.hidden = true;
});

document.getElementById("copiar-correo").addEventListener("click", async function () {
    await navigator.clipboard.writeText(document.getElementById("correo").textContent);
    estadoCopia.textContent = "Correo copiado.";
});

document.getElementById("copiar-mensaje").addEventListener("click", async function () {
    if (!mensaje.value.trim()) {
        estadoCopia.textContent = "Escribe un mensaje primero.";
        return;
    }
    await navigator.clipboard.writeText(mensaje.value);
    estadoCopia.textContent = "Mensaje copiado.";
});