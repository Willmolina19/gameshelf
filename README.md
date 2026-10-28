## Arquitectura

Para organizar el backend separé el código por módulos.
En el módulo de videojuegos, `game.js` contiene las validaciones del dominio.
`gameService.js` maneja la lógica y las operaciones de los videojuegos.
`gameRepository.js` se encarga de las consultas a SQL Server.
`gameController.js` recibe las peticiones y `gameRoutes.js` define las rutas.
Lo organicé así para tener el código más ordenado y poder hacer cambios sin modificar todo.