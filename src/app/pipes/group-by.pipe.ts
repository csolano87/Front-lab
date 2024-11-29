import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy',
})
export class GroupByPipe implements PipeTransform {
  transform(pruebas: any[]): any {
    if (!pruebas || !Array.isArray(pruebas)) return null;
    const groupedByModel = pruebas.reduce((acc, prueba) => {
     
      const modeloNombre = prueba.panelprueba.modelo.NOMBRE || 'Sin modelo';
     
      if (!acc[modeloNombre]) {
        acc[modeloNombre] = [];
      }

      // Extraer la información completa de cada prueba
      const panelPrueba = prueba.panelprueba;
      const rangos = panelPrueba.rango?.map(rango => ({
        descripcion: panelPrueba.NOMBRE,
        rango: rango.rangos,
        unidad: rango.unidad?.DESCRIPCION || 'N/A',
        edad: `${rango.edadinicial}-${rango.edadfinal} ${rango.unidadedad?.DESCRIPCION || ''}`
      }));

      // Agregar la prueba al grupo correspondiente con toda la información
      acc[modeloNombre].push({
        prueba: panelPrueba.NOMBRE,
        rangos,
        pruebaId: prueba.id,
        modeloId: prueba.modelo?.id,
        otroCampo: prueba.otroCampo // Puedes incluir más campos si es necesario
      });

      return acc;
    }, {});

    // Devolver el objeto con las agrupaciones
    return groupedByModel;
  }
}
