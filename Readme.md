# Devsu Test - Instrucciones de Instalación y Ejecución (Español)

---

Este repositorio contiene dos proyectos independientes:

- **Frontend:** Aplicación Angular (carpeta `frontend-bp`)
- **Backend:** API Node.js (carpeta `repo-interview-main`)

---

## Requisitos previos

- Node.js 20.18.x o superior
- npm 10.8.x o superior (o yarn si prefieres)

---

## Instalación y ejecución del Backend (Node.js)

1. Entra a la carpeta del backend:
   ```sh
   cd repo-interview-main
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Start the Node.js server:
   ```sh
   npm run start:dev
   ```
4. El backend estará disponible en [http://localhost:3000](http://localhost:3002) (o el puerto configurado)

---

## Instalación y ejecución del Frontend (Angular)

1. Entra a la carpeta del frontend:
   ```sh
   cd frontend-bp
   ```
2. Instala las dependencias:
   ```sh
   npm install
   # o
   npm i
   ```
3. Inicia la aplicación Angular:
   ```sh
   npm run start
   # o
   ng serve
   # o
   ng s
   ```
4. Accede a la app en [http://localhost:4200](http://localhost:4200)

5. Crea un Coverage (Que tambien correra los test de Jest)
    ```sh
    npm run test:coverage
    ```

---


## Notas

- Asegúrate de tener ambos proyectos corriendo para el funcionamiento completo.
- Si tienes problemas de dependencias, revisa la versión de Node y borra `node_modules` y `package-lock.json` antes de reinstalar.

---

**¡Listo! Ya puedes trabajar con el frontend y backend de este proyecto.**



# Devsu Test - Installation and Running Instructions (English)

---

This repository contains two independent projects:

- **Frontend:** Angular Application (`frontend-bp` folder)
- **Backend:** Node.js API (`repo-interview-main` folder)

---

## Prerequisites

- Node.js 20.18.x or higher
- npm 10.8.x or higher (or yarn if you prefer)

---

## Backend Installation and Running (Node.js)

1. Go to the backend folder:
   ```sh
   cd repo-interview-main
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Node.js server:
   ```sh
   npm run start:dev
   ```
4. The backend will be available at [http://localhost:3000](http://localhost:3002) (or the configured port)

---

## Frontend Installation and Running (Angular)

1. Go to the frontend folder:
   ```sh
   cd frontend-bp
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   npm i
   ```
3. Start the Angular application:
   ```sh
   npm run start
   # or
   ng serve
   # or
   ng s
   ```
4. Access the app at [http://localhost:4200](http://localhost:4200)

5. Generate Coverage (which will also run Jest tests):
    ```sh
    npm run test:coverage
    ```

---

## Notes

- Make sure both projects are running for full functionality.
- If you have dependency issues, check your Node version and delete `node_modules` and `package-lock.json` before reinstalling.

---

**Done! You can now work with the frontend and backend of this project.**



