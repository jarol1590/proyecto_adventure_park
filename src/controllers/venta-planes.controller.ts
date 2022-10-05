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
import {VentasPlanes} from '../models';
import {PlanesRepository, VentasPlanesRepository} from '../repositories';
var now = require("date-now");

export class VentaPlanesController {
  constructor(
    @repository(VentasPlanesRepository)
    public ventasPlanesRepository: VentasPlanesRepository,
    @repository(PlanesRepository)
    private PlanesRepository: PlanesRepository
  ) { }

  @post('/ventas-planes')
  @response(200, {
    description: 'VentasPlanes model instance',
    content: {'application/json': {schema: getModelSchemaRef(VentasPlanes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentasPlanes, {
            title: 'NewVentasPlanes',
            exclude: ['id'],
          }),
        },
      },
    })
    ventasPlanes: Omit<VentasPlanes, 'id'>,
  ): Promise<VentasPlanes> {
    let fechaActual = now()
    let valorCompra = 0
    let plan = await this.PlanesRepository.findOne({
      where: {
        id: ventasPlanes.planesId
      }
    });
    if (plan) {
      valorCompra = (plan.valor * ventasPlanes.cant)
    }
    let impuestos = (valorCompra * 0.19)
    ventasPlanes.fecha = fechaActual
    ventasPlanes.total = (valorCompra + impuestos)
    ventasPlanes.impuestos = impuestos

    return this.ventasPlanesRepository.create(ventasPlanes);
  }

  @get('/ventas-planes/count')
  @response(200, {
    description: 'VentasPlanes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VentasPlanes) where?: Where<VentasPlanes>,
  ): Promise<Count> {
    return this.ventasPlanesRepository.count(where);
  }

  @get('/ventas-planes')
  @response(200, {
    description: 'Array of VentasPlanes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VentasPlanes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VentasPlanes) filter?: Filter<VentasPlanes>,
  ): Promise<VentasPlanes[]> {
    return this.ventasPlanesRepository.find(filter);
  }

  @patch('/ventas-planes')
  @response(200, {
    description: 'VentasPlanes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentasPlanes, {partial: true}),
        },
      },
    })
    ventasPlanes: VentasPlanes,
    @param.where(VentasPlanes) where?: Where<VentasPlanes>,
  ): Promise<Count> {
    return this.ventasPlanesRepository.updateAll(ventasPlanes, where);
  }

  @get('/ventas-planes/{id}')
  @response(200, {
    description: 'VentasPlanes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VentasPlanes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(VentasPlanes, {exclude: 'where'}) filter?: FilterExcludingWhere<VentasPlanes>
  ): Promise<VentasPlanes> {
    return this.ventasPlanesRepository.findById(id, filter);
  }

  @patch('/ventas-planes/{id}')
  @response(204, {
    description: 'VentasPlanes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VentasPlanes, {partial: true}),
        },
      },
    })
    ventasPlanes: VentasPlanes,
  ): Promise<void> {
    await this.ventasPlanesRepository.updateById(id, ventasPlanes);
  }

  @put('/ventas-planes/{id}')
  @response(204, {
    description: 'VentasPlanes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ventasPlanes: VentasPlanes,
  ): Promise<void> {
    await this.ventasPlanesRepository.replaceById(id, ventasPlanes);
  }

  @del('/ventas-planes/{id}')
  @response(204, {
    description: 'VentasPlanes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ventasPlanesRepository.deleteById(id);
  }
}
