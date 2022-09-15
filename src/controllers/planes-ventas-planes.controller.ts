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
  Planes,
  VentasPlanes,
} from '../models';
import {PlanesRepository} from '../repositories';

export class PlanesVentasPlanesController {
  constructor(
    @repository(PlanesRepository) protected planesRepository: PlanesRepository,
  ) { }

  @get('/planes/{id}/ventas-planes', {
    responses: {
      '200': {
        description: 'Array of Planes has many VentasPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VentasPlanes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<VentasPlanes>,
  ): Promise<VentasPlanes[]> {
    return this.planesRepository.ventasPlanes(id).find(filter);
  }

  @post('/planes/{id}/ventas-planes', {
    responses: {
      '200': {
        description: 'Planes model instance',
        content: {'application/json': {schema: getModelSchemaRef(VentasPlanes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Planes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentasPlanes, {
            title: 'NewVentasPlanesInPlanes',
            exclude: ['id'],
            optional: ['planesId']
          }),
        },
      },
    }) ventasPlanes: Omit<VentasPlanes, 'id'>,
  ): Promise<VentasPlanes> {
    return this.planesRepository.ventasPlanes(id).create(ventasPlanes);
  }

  @patch('/planes/{id}/ventas-planes', {
    responses: {
      '200': {
        description: 'Planes.VentasPlanes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentasPlanes, {partial: true}),
        },
      },
    })
    ventasPlanes: Partial<VentasPlanes>,
    @param.query.object('where', getWhereSchemaFor(VentasPlanes)) where?: Where<VentasPlanes>,
  ): Promise<Count> {
    return this.planesRepository.ventasPlanes(id).patch(ventasPlanes, where);
  }

  @del('/planes/{id}/ventas-planes', {
    responses: {
      '200': {
        description: 'Planes.VentasPlanes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(VentasPlanes)) where?: Where<VentasPlanes>,
  ): Promise<Count> {
    return this.planesRepository.ventasPlanes(id).delete(where);
  }
}
