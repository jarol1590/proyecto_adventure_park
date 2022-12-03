import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  VentasPlanes,
  Planes,
} from '../models';
import {VentasPlanesRepository} from '../repositories';

export class VentasPlanesPlanesController {
  constructor(
    @repository(VentasPlanesRepository)
    public ventasPlanesRepository: VentasPlanesRepository,
  ) { }

  @get('/ventas-planes/{id}/planes', {
    responses: {
      '200': {
        description: 'Planes belonging to VentasPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Planes)},
          },
        },
      },
    },
  })
  async getPlanes(
    @param.path.number('id') id: typeof VentasPlanes.prototype.id,
  ): Promise<Planes> {
    return this.ventasPlanesRepository.planes(id);
  }
}
