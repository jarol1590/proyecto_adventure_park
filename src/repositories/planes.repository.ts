import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Planes, PlanesRelations, VentasPlanes} from '../models';
import {VentasPlanesRepository} from './ventas-planes.repository';

export class PlanesRepository extends DefaultCrudRepository<
  Planes,
  typeof Planes.prototype.id,
  PlanesRelations
> {

  public readonly ventasPlanes: HasManyRepositoryFactory<VentasPlanes, typeof Planes.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VentasPlanesRepository') protected ventasPlanesRepositoryGetter: Getter<VentasPlanesRepository>,
  ) {
    super(Planes, dataSource);
    this.ventasPlanes = this.createHasManyRepositoryFactoryFor('ventasPlanes', ventasPlanesRepositoryGetter,);
    this.registerInclusionResolver('ventasPlanes', this.ventasPlanes.inclusionResolver);
  }
}
