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
  StandComidas,
  FoodVentas,
} from '../models';
import {StandComidasRepository} from '../repositories';

export class StandComidasFoodVentasController {
  constructor(
    @repository(StandComidasRepository) protected standComidasRepository: StandComidasRepository,
  ) { }

  @get('/stand-comidas/{id}/food-ventas', {
    responses: {
      '200': {
        description: 'Array of StandComidas has many FoodVentas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FoodVentas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FoodVentas>,
  ): Promise<FoodVentas[]> {
    return this.standComidasRepository.foodVentas(id).find(filter);
  }

  @post('/stand-comidas/{id}/food-ventas', {
    responses: {
      '200': {
        description: 'StandComidas model instance',
        content: {'application/json': {schema: getModelSchemaRef(FoodVentas)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof StandComidas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FoodVentas, {
            title: 'NewFoodVentasInStandComidas',
            exclude: ['id'],
            optional: ['standComidasId']
          }),
        },
      },
    }) foodVentas: Omit<FoodVentas, 'id'>,
  ): Promise<FoodVentas> {
    return this.standComidasRepository.foodVentas(id).create(foodVentas);
  }

  @patch('/stand-comidas/{id}/food-ventas', {
    responses: {
      '200': {
        description: 'StandComidas.FoodVentas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FoodVentas, {partial: true}),
        },
      },
    })
    foodVentas: Partial<FoodVentas>,
    @param.query.object('where', getWhereSchemaFor(FoodVentas)) where?: Where<FoodVentas>,
  ): Promise<Count> {
    return this.standComidasRepository.foodVentas(id).patch(foodVentas, where);
  }

  @del('/stand-comidas/{id}/food-ventas', {
    responses: {
      '200': {
        description: 'StandComidas.FoodVentas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FoodVentas)) where?: Where<FoodVentas>,
  ): Promise<Count> {
    return this.standComidasRepository.foodVentas(id).delete(where);
  }
}
