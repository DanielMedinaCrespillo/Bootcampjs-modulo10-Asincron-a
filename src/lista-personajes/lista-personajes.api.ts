import axios from "axios";
import { Personaje } from "./lista-personajes.model";

export const obtenerPersonajes = async (): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get("http://localhost:3000/personajes");
    return data;
  } catch (error) {
    throw new Error("Error al obtener los personajes");
  }
};

export const buscarPersonaje = async (
  nombrePersonaje: string
): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/personajes?nombre_like=${nombrePersonaje}`
    );
    return data;
  } catch (error) {
    throw new Error("Error en buscar personaje");
  }
};
