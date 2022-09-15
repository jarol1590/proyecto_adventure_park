import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Atracciones,
  Zona,
} from '../models';
import {AtraccionesRepository} from '../repositories';

export class AtraccionesZonaController {
  constructor(
    @repository(AtraccionesRepository)
    public atraccionesRepository: AtraccionesRepository,
  ) { }

  @get('/atracciones/{id}/zona', {
    responses: {
      '200': {
        description: 'Zona belonging to Atracciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Zona)},
          },
        },
      },
    },
  })
  async getZona(
    @param.path.number('id') id: typeof Atracciones.prototype.id,
  ): Promise<Zona> {
    return this.atraccionesRepository.zona(id);
  }
}
