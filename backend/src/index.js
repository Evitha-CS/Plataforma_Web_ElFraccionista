
import app from './app.js';
import db from './database.js'; // Importa tu cliente de Prisma
import { poblarRegionesYCiudades } from './controllers/regiones.js'; // Importa la función de población



db.$connect()
  .then(async () => {
    // Verifica si hay regiones en la base de datos
    const totalRegiones = await db.region.count();
    if (totalRegiones === 0) {
      console.log('No se encontraron regiones, poblando la base de datos...');
      await poblarRegionesYCiudades();
    } else {
      console.log('La base de datos ya está poblada.');
    }

    app.listen(app.get('port'));
    console.log('Servidor en http://localhost:' + app.get('port'));
  })
  .catch(error => {
    console.error('Error al conectar con la base de datos:', error);
  });



