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
  StandComidas,
} from '../models';
import {ZonaRepository} from '../repositories';

export class ZonaStandComidasController {
  constructor(
    @repository(ZonaRepository) protected zonaRepository: ZonaRepository,
  ) { }

  @get('/zonas/{id}/stand-comidas', {
    responses: {
      '200': {
        description: 'Array of Zona has many StandComidas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(StandComidas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<StandComidas>,
  ): Promise<StandComidas[]> {
    return this.zonaRepository.standComidas(id).find(filter);
  }

  @post('/zonas/{id}/stand-comidas', {
    responses: {
      '200': {
        description: 'Zona model instance',
        content: {'application/json': {schema: getModelSchemaRef(StandComidas)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Zona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StandComidas, {
            title: 'NewStandComidasInZona',
            exclude: ['id'],
            optional: ['zonaId']
          }),
        },
      },
    }) standComidas: Omit<StandComidas, 'id'>,
  ): Promise<StandComidas> {
    return this.zonaRepository.standComidas(id).create(standComidas);
  }

  @patch('/zonas/{id}/stand-comidas', {
    responses: {
      '200': {
        description: 'Zona.StandComidas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StandComidas, {partial: true}),
        },
      },
    })
    standComidas: Partial<StandComidas>,
    @param.query.object('where', getWhereSchemaFor(StandComidas)) where?: Where<StandComidas>,
  ): Promise<Count> {
    return this.zonaRepository.standComidas(id).patch(standComidas, where);
  }

  @del('/zonas/{id}/stand-comidas', {
    responses: {
      '200': {
        description: 'Zona.StandComidas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(StandComidas)) where?: Where<StandComidas>,
  ): Promise<Count> {
    return this.zonaRepository.standComidas(id).delete(where);
  }
}
