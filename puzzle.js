// Snippets de código para poder componer el programa

//Usado?: YES
const middlewares = require('./middlewares');
//--- Explicación: Almacena en una variable el contenido del archivo 'middlewares' para usarlo.

// -------------------------------------------------------------------------------------
//Usado?: YES
const bodyParser = require('body-parser');
//--- Explicación: Importa el módulo 'body-parser' para procesar datos de formularios.

// -------------------------------------------------------------------------------------
//Usado?: YES
const session = require('express-session');
//--- Explicación: Importa el módulo 'express-session' para manejar sesiones.

// -------------------------------------------------------------------------------------
//Usado?: YES
const express = require('express');
//--- Explicación: Importa el framework Express para crear la aplicación web.

// -------------------------------------------------------------------------------------
//Usado?: YES
const bodyParser = require('body-parser');
//--- Explicación: Importa el módulo 'body-parser' para procesar datos de formularios (duplicado, usado en setupAPP).

// -------------------------------------------------------------------------------------
//Usado?: YES
const session = require('express-session');
//--- Explicación: Importa el módulo 'express-session' para manejar sesiones (duplicado, usado en setupAPP).

// -------------------------------------------------------------------------------------
//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación: Importa el módulo 'dotenv' para cargar variables de entorno.

// -------------------------------------------------------------------------------------
//Usado?: YES
const middlewares = require('./middlewares');
//--- Explicación: Almacena en una variable el contenido del archivo 'middlewares' para usarlo (duplicado, usado en rutas).

// -------------------------------------------------------------------------------------
//Usado?: YES
const routes = require('./routes');
//--- Explicación: Almacena en una variable el contenido del archivo 'routes' para usarlo.

// -------------------------------------------------------------------------------------
//Usado?: YES
dotenv.config();
//--- Explicación: Carga las variables de entorno del archivo '.env'.

// -------------------------------------------------------------------------------------
//Usado?: YES
const app = express();
//--- Explicación: Crea una instancia de la aplicación Express.

// -------------------------------------------------------------------------------------
//Usado?: YES
const PORT = 4000;
//--- Explicación: Define el puerto en el que se ejecutará el servidor.

// -------------------------------------------------------------------------------------
//Usado?: YES
const dotenv = require('dotenv');
//--- Explicación: Importa el módulo 'dotenv' para cargar variables de entorno (duplicado).

// -------------------------------------------------------------------------------------
//Usado?: YES
dotenv.config();
//--- Explicación: Carga las variables de entorno del archivo '.env' (duplicado, usado para asegurar configuración).

// -------------------------------------------------------------------------------------
//Usado?: YES
middlewares.setupApp(app);
//--- Explicación: Configura los middlewares de la aplicación usando la función setupApp.

// -------------------------------------------------------------------------------------
//Usado?: YES
routes.setup(app);
//--- Explicación: Configura las rutas de la aplicación usando la función setup.

// -------------------------------------------------------------------------------------
//Usado?: YES
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';
  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: Middleware que valida la palabra secreta y permite continuar o redirige con error.

// -------------------------------------------------------------------------------------
//Usado?: YES
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: Define la ruta GET '/' y prepara la lógica para el formulario (completa con res.send).

// -------------------------------------------------------------------------------------
//Usado?: YES
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: Envía un HTML con un formulario para ingresar la palabra y muestra mensajes de error.

// -------------------------------------------------------------------------------------
//Usado?: YES
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación: Configura los middlewares 'body-parser' y 'session' para la aplicación.

// -------------------------------------------------------------------------------------
//Usado?: YES
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Define la ruta POST '/profile' que valida la palabra y muestra la página de perfil.

// -------------------------------------------------------------------------------------
//Usado?: YES
app.use(bodyParser.urlencoded({ extended: true }));
//--- Explicación: Habilita el middleware 'body-parser' para procesar datos de formularios (duplicado, usado en setupAPP).

// -------------------------------------------------------------------------------------
//Usado?: YES
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));
//--- Explicación: Configura el middleware de sesiones con la palabra secreta del entorno (duplicado, usado en app.js).

// -------------------------------------------------------------------------------------
//Usado?: YES
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: Inicia el servidor en el puerto especificado y muestra un mensaje.

// -------------------------------------------------------------------------------------
//Usado?: YES
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: Middleware que verifica si hay una sesión activa y permite continuar o redirige.

// -------------------------------------------------------------------------------------
//Usado?: YES
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: Define la ruta GET '/profile' que verifica la sesión y muestra la página de perfil.

// -------------------------------------------------------------------------------------
//Usado?: YES
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: Define la ruta POST '/logout' para destruir la sesión y redirigir al inicio.

// -------------------------------------------------------------------------------------
//Usado?: YES
module.exports = {
  setup,
};
//--- Explicación: Exporta la función 'setup' para que pueda ser usada en otros archivos.

// -------------------------------------------------------------------------------------
//Usado?: YES
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: Exporta los middlewares y la función setupAPP para que puedan ser usados.

