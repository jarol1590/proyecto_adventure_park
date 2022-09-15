import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Zona,
  Atracciones,
} from '../models';
import {ZonaRepository} from '../repositories';

export class ZonaAtraccionesController {
  constructor(
    @repository(ZonaRepository) protected zonaRepository: ZonaRepository,
  ) { }

  @get('/zonas/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Array of Zona has many Atracciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atracciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Atracciones>,
  ): Promise<Atracciones[]> {
    return this.zonaRepository.atracciones(id).find(filter);
  }

  @post('/zonas/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Zona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atracciones)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Zona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atracciones, {
            title: 'NewAtraccionesInZona',
            exclude: ['id'],
            optional: ['zonaId']
          }),
        },
      },
    }) atracciones: Omit<Atracciones, 'id'>,
  ): Promise<Atracciones> {
    return this.zonaRepository.atracciones(id).create(atracciones);
  }

  @patch('/zonas/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Zona.Atracciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atracciones, {partial: true}),
        },
      },
    })
    atracciones: Partial<Atracciones>,
    @param.query.object('where', getWhereSchemaFor(Atracciones)) where?: Where<Atracciones>,
  ): Promise<Count> {
    return this.zonaRepository.atracciones(id).patch(atracciones, where);
  }

  @del('/zonas/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Zona.Atracciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Atracciones)) where?: Where<Atracciones>,
  ): Promise<Count> {
    return this.zonaRepository.atracciones(id).delete(where);
  }
}
