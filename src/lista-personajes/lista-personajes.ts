import { buscarPersonaje, obtenerPersonajes } from "./lista-personajes.api";
import { Personaje } from "./lista-personajes.model";

const crearElementoImagen = (personaje: Personaje): HTMLImageElement => {
  const imagenPersonaje = document.createElement("img");
  imagenPersonaje.src = `http://localhost:3000/${personaje.imagen}`;
  return imagenPersonaje;
};

const crearElementoParrafo = (
  texto: string,
  datos: string,
  nombreClase: string
): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  const nombreNegrita = document.createElement("strong");
  const span = document.createElement("span");

  nombreNegrita.textContent = datos;
  span.setAttribute("clase", nombreClase);
  span.textContent = texto;

  parrafo.appendChild(nombreNegrita);
  parrafo.appendChild(span);

  return parrafo;
};

const crearContenedorPersonajes = (personaje: Personaje): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.classList.add("cards");

  const imagen = crearElementoImagen(personaje);
  elementoPersonaje.appendChild(imagen);

  const nombre = crearElementoParrafo(personaje.nombre, "Nombre: ", "nombre");
  elementoPersonaje.appendChild(nombre);

  const especialidad = crearElementoParrafo(
    personaje.especialidad,
    "Especialidad: ",
    "especialidad"
  );
  elementoPersonaje.appendChild(especialidad);

  const habilidades = crearElementoParrafo(
    personaje.habilidades.join(","),
    "Habilidades: ",
    "habilidad"
  );
  elementoPersonaje.appendChild(habilidades);

  return elementoPersonaje;
};

const pintarPersonajes = async (personajes: Personaje[]) => {
  const listado = document.querySelector("#contenedor-cards");
  if (listado && listado instanceof HTMLDivElement) {
    listado.innerText = "";
    personajes.forEach((personaje) => {
      const card = crearContenedorPersonajes(personaje);
      listado.appendChild(card);
    });
  } else {
    throw new Error("No se ha encontrado el contenedor del listado");
  }
};

const obtenerValorCampo = (campo: string): string => {
  const elementoCampo = document.querySelector(`#${campo}`);

  if (
    (elementoCampo && elementoCampo instanceof HTMLInputElement) ||
    elementoCampo instanceof HTMLTextAreaElement
  ) {
    return elementoCampo.value;
  } else {
    throw new Error(`No se ha encontrado el campo ${campo}`);
  }
};

const filtroPersonaje = async (evento: Event): Promise<void> => {
  evento.preventDefault();
  const nombrePersonaje = obtenerValorCampo("nombrePersonaje");
  console.log(nombrePersonaje);

  try {
    const personajesFiltrados = await buscarPersonaje(nombrePersonaje);
    pintarPersonajes(personajesFiltrados);
  } catch (error) {
    alert(error);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const personajes = await obtenerPersonajes();
  const fomrulario = document.querySelector("#formulario");
  if (fomrulario && fomrulario instanceof HTMLFormElement) {
    fomrulario.addEventListener("submit", filtroPersonaje);
  } else {
    throw new Error("No se ha encontrado el formulario");
  }
  pintarPersonajes(personajes);
});
