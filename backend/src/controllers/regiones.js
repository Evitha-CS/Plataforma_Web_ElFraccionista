import db from '../database.js'; 

import datos from '../regiones.json' assert { type: 'json' };


export const obtenerRegiones = async (req, res) => {
  try {
    const regiones = await db.region.findMany();
    res.json(regiones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las regiones' });
  }
};
export const obtenerComunasPorRegion = async (req, res) => {
    const { regionId } = req.params;
  
    try {
      const comunas = await db.ciudad.findMany({
        where: {
          regionId: parseInt(regionId),
        },
      });
  
      if (comunas.length === 0) {
        return res.status(404).json({ message: 'No se encontraron comunas para la región indicada' });
      }
  
      res.json(comunas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las comunas' });
    }
  };
  


  export async function poblarRegionesYCiudades() {
    for (const regionData of datos.regiones) {

      let region = await db.region.findFirst({
        where: {
          nombre: regionData.nombre
        }
      });
  

      if (!region) {
        region = await db.region.create({
          data: {
            nombre: regionData.nombre
          }
        });
      }
  

      for (const nombreCiudad of regionData.ciudades) {
        let ciudad = await db.ciudad.findFirst({
          where: {
            nombre: nombreCiudad,
            regionId: region.id
          }
        });
  
        if (!ciudad) {
          await db.ciudad.create({
            data: {
              nombre: nombreCiudad,
              regionId: region.id
            }
          });
        }
      }
    }
  
    console.log('Las regiones y ciudades han sido pobladas con éxito.');
  }