# Frontend Películas - IU Digital

Evidencia de Aprendizaje 2 - Ingeniería Web II.

Aplicación web hecha con ReactJs que consume la API REST de la [EA1](https://github.com/Biershoot/Biershoot-api-peliculas-iudigital). Tiene las pantallas para los módulos de Género, Director, Productora, Tipo y Media (películas y series), y en todos se puede crear, listar, actualizar y eliminar.

**Integrantes:**
- Alejandro Arango Calderón

## Tecnologías

- ReactJs 18 (con Vite)
- React Router DOM (rutas de las pantallas)
- Axios (peticiones a la API)
- Bootstrap 5 (estilos, tablas, formularios y modales)
- SweetAlert2 (mensajes de carga, éxito, error y confirmación)

## Estructura

```
src/
├── config/axiosConfig.js      -> instancia de axios con la url de la API
├── services/                  -> un archivo por módulo con las peticiones (GET, POST, PUT, DELETE)
├── helpers/mensajes.js        -> alertas de SweetAlert2 y manejo de errores de la API
└── components/
    ├── ui/                    -> Header, Footer, Inicio, Modal y EstadoBadge
    ├── generos/               -> GeneroView (tabla) y GeneroForm (crear / editar)
    ├── directores/            -> DirectorView y DirectorForm
    ├── productoras/           -> ProductoraView y ProductoraForm
    ├── tipos/                 -> TipoView y TipoForm
    └── medias/                -> MediaView (tarjetas), MediaCard, MediaForm y MediaUpdate
```

## Rutas

| Ruta | Pantalla |
|---|---|
| `/` | Inicio |
| `/generos` | Géneros |
| `/directores` | Directores |
| `/productoras` | Productoras |
| `/tipos` | Tipos |
| `/medias` | Películas y series |
| `/medias/editar/:mediaId` | Editar una película o serie |

## Cómo ejecutar

1. Tener corriendo la API de la EA1 (por defecto en `http://localhost:4000`).
2. Instalar las dependencias:
```
npm install
```
3. (Opcional) Crear un archivo `.env` como el `.env.example` si la API está en otra url:
```
VITE_API_URL=http://localhost:4000
```
4. Correr el proyecto:
```
npm run dev
```
La aplicación queda en `http://localhost:3000`.

## Reglas del caso de estudio que se manejan en el frontend

- Género, director y productora se crean con estado Activo o Inactivo. Tipo no tiene estado.
- Al crear o editar una película o serie, en las listas solo salen los géneros, directores y productoras **activos** (se usan los servicios `/genero/activos`, `/director/activos` y `/productora/activas`).
- Si la API responde con error (por ejemplo, nombre o serial repetido), se muestra el mensaje con SweetAlert2.
