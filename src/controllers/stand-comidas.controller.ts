import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {StandComidas} from '../models';
import {StandComidasRepository} from '../repositories';
//@authenticate("admin", "registros")
export class StandComidasController {
  constructor(
    @repository(StandComidasRepository)
    public standComidasRepository: StandComidasRepository,
  ) { }

  @post('/stand-comidas')
  @response(200, {
    description: 'StandComidas model instance',
    content: {'application/json': {schema: getModelSchemaRef(StandComidas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StandComidas, {
            title: 'NewStandComidas',
            exclude: ['id'],
          }),
        },
      },
    })
    standComidas: Omit<StandComidas, 'id'>,
  ): Promise<StandComidas> {
    return this.standComidasRepository.create(standComidas);
  }

  @get('/stand-comidas/count')
  @response(200, {
    description: 'StandComidas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(StandComidas) where?: Where<StandComidas>,
  ): Promise<Count> {
    return this.standComidasRepository.count(where);
  }

  @get('/stand-comidas')
  @response(200, {
    description: 'Array of StandComidas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(StandComidas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(StandComidas) filter?: Filter<StandComidas>,
  ): Promise<StandComidas[]> {
    return this.standComidasRepository.find(filter);
  }

  @patch('/stand-comidas')
  @response(200, {
    description: 'StandComidas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StandComidas, {partial: true}),
        },
      },
    })
    standComidas: StandComidas,
    @param.where(StandComidas) where?: Where<StandComidas>,
  ): Promise<Count> {
    return this.standComidasRepository.updateAll(standComidas, where);
  }

  @get('/stand-comidas/{id}')
  @response(200, {
    description: 'StandComidas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(StandComidas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(StandComidas, {exclude: 'where'}) filter?: FilterExcludingWhere<StandComidas>
  ): Promise<StandComidas> {
    return this.standComidasRepository.findById(id, filter);
  }

  @patch('/stand-comidas/{id}')
  @response(204, {
    description: 'StandComidas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StandComidas, {partial: true}),
        },
      },
    })
    standComidas: StandComidas,
  ): Promise<void> {
    await this.standComidasRepository.updateById(id, standComidas);
  }

  @put('/stand-comidas/{id}')
  @response(204, {
    description: 'StandComidas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() standComidas: StandComidas,
  ): Promise<void> {
    await this.standComidasRepository.replaceById(id, standComidas);
  }

  @del('/stand-comidas/{id}')
  @response(204, {
    description: 'StandComidas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.standComidasRepository.deleteById(id);
  }
}
