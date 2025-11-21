API Gestor de Hábitos y Rutinas

Backend TypeScript + Express con autenticación JWT, Prisma ORM y PostgreSQL.

Se uso un API REST que permite a los usuarios gestionar sus hábitos diarios y rutinas personalizadas. Incluye autenticación segura, CRUD completo para hábitos y rutinas, y documentación interactiva con Swagger.

Características:

• Autenticación con JWT  
• Cifrado de contraseñas con bcryptjs  
• 12 endpoints REST funcionales  
• ORM Prisma con PostgreSQL  
• Documentación interactiva Swagger  
• Validación de datos  
• Manejo de errores  
• Aislamiento de datos por usuario  

Requisitos:

- Node.js 16+
- npm o yarn
- PostgreSQL 12+

Instalación

1. Clonar repositorio
```bash
git clone https://github.com/MapacheLoC0/Proyecto-Habitos-Parcial3.git
cd Backend
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno

Crear archivo `.env` en la raíz del Backend:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/gestor_habitos"
JWT_SECRET="tu_secret_muy_seguro_aqui"
NODE_ENV="development"
```

4. Configurar base de datos

```bash
# Ejecutar migraciones
npx prisma migrate dev --name init

# Opcional: Popular con datos de prueba
npm run seed
```

5. Iniciar servidor
```bash
# Desarrollo (con hot-reload)
npm run dev

# Producción
npm run build
npm run start
```

El servidor estará disponible en `http://localhost:3000`

Documentación API.

• Swagger UI (Interactivo)
```
http://localhost:3000/api-docs
```

• Base URL
```
http://localhost:3000/api
```

-----------------------------------------------------------------------------------------------------------------

Autenticación

Todos los endpoints (excepto register y login) requieren token JWT.

Obtener token
1. Registrarse: `POST /api/auth/register`
2. Login: `POST /api/auth/login` → Recibirás un `token`
3. Usar token en headers: `Authorization: Bearer <token>`

Ejemplo: 
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:3000/api/habits
```

------------------------------------------------------------------------------------------------------------------
Endpoints

• Autenticación

1. Registrar usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (200)**
```json
{
  "id": 1,
  "email": "usuario@example.com",
  "password": "$2a$10$hashed..."
}
```

-----------------------------------------------------------------------------------------

2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

**Respuesta exitosa (200)**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMyMDAwMDAwLCJleHAiOjE2MzI2MDQ4MDB9.signature"
}
```

----------------------------------------------------------------------------------------------------------------

• Hábitos

3. Crear hábito
```http
POST /api/habits
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Hacer ejercicio"
}
```

**Respuesta exitosa (201)**
```json
{
  "id": 1,
  "name": "Hacer ejercicio",
  "userId": 1,
  "createdAt": "2024-11-20T22:30:00.000Z"
}
```

----------------------------------------------------------------------------------------------------------

4. Obtener todos los hábitos
```http
GET /api/habits
Authorization: Bearer <token>
```

**Respuesta exitosa (200)**
```json
[
  {
    "id": 1,
    "name": "Hacer ejercicio",
    "userId": 1,
    "createdAt": "2024-11-20T22:30:00.000Z"
  },
  {
    "id": 2,
    "name": "Leer",
    "userId": 1,
    "createdAt": "2024-11-20T22:31:00.000Z"
  }
]
```

-----------------------------------------------------------------------------------------

5. Obtener hábito por ID
```http
GET /api/habits/1
Authorization: Bearer <token>
```

**Respuesta exitosa (200)**
```json
{
  "id": 1,
  "name": "Hacer ejercicio",
  "userId": 1,
  "createdAt": "2024-11-20T22:30:00.000Z"
}
```

**Respuesta error (404)**
```json
{
  "error": "Hábito no encontrado"
}
```

-----------------------------------------------------------------------------------------

6. Actualizar hábito
```http
PUT /api/habits/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Correr 5km"
}
```

**Respuesta exitosa (200)**
```json
{
  "id": 1,
  "name": "Correr 5km",
  "userId": 1,
  "createdAt": "2024-11-20T22:30:00.000Z"
}
```

-------------------------------------------------------------------------------------------------

7. Eliminar hábito
```http
DELETE /api/habits/1
Authorization: Bearer <token>
```

**Respuesta exitosa (200)**
```json
{
  "message": "Hábito eliminado",
  "habit": {
    "id": 1,
    "name": "Correr 5km",
    "userId": 1,
    "createdAt": "2024-11-20T22:30:00.000Z"
  }
}
```

---------------------------------------------------------------------------------------------------------------

• Rutinas

8. Crear rutina
```http
POST /api/routines
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Rutina matutina"
}
```

**Respuesta exitosa (201)**
```json
{
  "id": 1,
  "title": "Rutina matutina",
  "userId": 1,
  "createdAt": "2024-11-20T22:30:00.000Z"
}
```

------------------------------------------------------------------------------------------------------------------

9. Obtener todas las rutinas
```http
GET /api/routines
Authorization: Bearer <token>
```

**Respuesta exitosa (200)**
```json
[
  {
    "id": 1,
    "title": "Rutina matutina",
    "userId": 1,
    "createdAt": "2024-11-20T22:30:00.000Z"
  },
  {
    "id": 2,
    "title": "Rutina nocturna",
    "userId": 1,
    "createdAt": "2024-11-20T22:31:00.000Z"
  }
]
```

------------------------------------------------------------------------------------------------------------

10. Obtener rutina por ID
```http
GET /api/routines/1
Authorization: Bearer <token>
```

**Respuesta exitosa (200)**
```json
{
  "id": 1,
  "title": "Rutina matutina",
  "userId": 1,
  "createdAt": "2024-11-20T22:30:00.000Z"
}
```

-----------------------------------------------------------------------------------------------------------------

11. Actualizar rutina
```http
PUT /api/routines/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Rutina matutina mejorada"
}
```

**Respuesta exitosa (200)**
```json
{
  "id": 1,
  "title": "Rutina matutina mejorada",
  "userId": 1,
  "createdAt": "2024-11-20T22:30:00.000Z"
}
```

---------------------------------------------------------------------------------------------------------------------

12. Eliminar rutina
```http
DELETE /api/routines/1
Authorization: Bearer <token>
```

**Respuesta exitosa (200)**
```json
{
  "message": "Rutina eliminada",
  "routine": {
    "id": 1,
    "title": "Rutina matutina",
    "userId": 1,
    "createdAt": "2024-11-20T22:30:00.000Z"
  }
}
```

--------------------------------------------------------------------------------------------------------------------------

• Códigos de Respuesta HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Error en la solicitud |
| 401 | Unauthorized - Falta token o inválido |
| 403 | Forbidden - Token inválido |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---------------------------------------------------------------------------------------------------------------------------

• Testing con cURL

 - Registrarse
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

 - Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

 - Crear hábito (usa el token del login)
```bash
curl -X POST http://localhost:3000/api/habits \
  -H "Authorization: Bearer TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{"name":"Meditar"}'
```

 - Obtener hábitos
```bash
curl -X GET http://localhost:3000/api/habits \
  -H "Authorization: Bearer TOKEN_AQUI"
```

---------------------------------------------------------------------------------------------------------------------

• Estructura de Base de Datos

- Tabla: User
```sql
id (INT, PK, AUTO_INCREMENT)
email (STRING, UNIQUE)
password (STRING)
```

- Tabla: Habit
```sql
id (INT, PK, AUTO_INCREMENT)
name (STRING)
userId (INT, FK → User.id)
createdAt (DATETIME)
```

- Tabla: Routine
```sql
id (INT, PK, AUTO_INCREMENT)
title (STRING)
userId (INT, FK → User.id)
createdAt (DATETIME)
```

----------------------------------------------------------------------------------------------------------------------

• Estructura del Proyecto

```
Backend/
├── src/
│   ├── app.ts                 # Configuración de Express
│   ├── server.ts              # Entry point
│   ├── config/
│   │   ├── prisma.ts          # Cliente Prisma
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── habits.controller.ts
│   │   └── routines.controller.ts
│   ├── services/
│   │   ├── auth.services.ts
│   │   ├── habits.services.ts
│   │   └── routines.services.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts # JWT verification
│   │   └── validateBody.ts
│   ├── routes/
│   │   ├── index.ts           # Router principal
│   │   ├── auth.routes.ts
│   │   ├── habits.routes.ts
│   │   └── routine.routes.ts
│   ├── swagger/
│   │   └── swagger.config.ts
│   ├── types/
│   │   ├── auth.d.ts
│   │   ├── habit.d.ts
│   │   ├── routine.d.ts
│   │   └── express.d.ts
│   └── utils/
│       ├── generateToken.ts
│       └── hashPassword.ts
├── prisma/
│   ├── schema.prisma          # Modelos de BD
│   ├── seed.ts                # Datos iniciales
│   └── migrations/
├── .env                       # Variables de entorno
├── package.json
└── tsconfig.json
```

-----------------------------------------------------------------------------------------------------------------

• Credenciales de Prueba (después de seed)

| Email | Contraseña |
|-------|-----------|
| jhonatan@example.com | password123 |
| willy@example.com | password123 |

------------------------------------------------------------------------------------------------------------------

• Scripts NPM

```bash
npm run dev      # Inicia servidor en desarrollo con hot-reload
npm run build    # Compila TypeScript a JavaScript
npm run start    # Ejecuta la versión compilada
npm run seed     # Llena la BD con datos de prueba
```

------------------------------------------------------------------------------------------------------------------

• Tecnologías Utilizadas

- **Express.js** 4.18.2 - Framework web
- **TypeScript** 5.0.0 - Lenguaje tipado
- **Prisma** 5.22.0 - ORM
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **Swagger/OpenAPI** - Documentación
- **ts-node-dev** - Hot-reload en desarrollo

------------------------------------------------------------------------------------------------------------------

• Variables de Entorno

```env
# Base de datos
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/gestor_habitos

# JWT
JWT_SECRET=tu_secret_muy_seguro_aqui_minimo_32_caracteres

# Entorno
NODE_ENV=development
```

------------------------------------------------------------------------------------------------------------------

• Manejo de Errores

La API devuelve errores en este formato:

```json
{
  "error": "Descripción del error"
}
```

Ejemplos:
- `"El correo ya está registrado"` (400)
- `"Usuario no encontrado"` (404)
- `"Token requerido"` (401)
- `"Token inválido"` (403)
- `"Hábito no encontrado"` (404)

------------------------------------------------------------------------------------------------------------------

• Seguridad

- Contraseñas hasheadas con bcryptjs (10 rounds)  
- JWT con expiración (7 días)  
- CORS habilitado  
- Validación de datos  
- Aislamiento de datos por usuario  
- Variables de entorno protegidas  

------------------------------------------------------------------------------------------------------------------
**Versión:** 1.0.0  
**Último update:** Noviembre 2024  
**Autor:** Jhonatan Valencia