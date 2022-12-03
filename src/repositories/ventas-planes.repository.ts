import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {VentasPlanes, VentasPlanesRelations, Planes} from '../models';
import {PlanesRepository} from './planes.repository';

export class VentasPlanesRepository extends DefaultCrudRepository<
  VentasPlanes,
  typeof VentasPlanes.prototype.id,
  VentasPlanesRelations
> {

  public readonly planes: BelongsToAccessor<Planes, typeof VentasPlanes.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanesRepository') protected planesRepositoryGetter: Getter<PlanesRepository>,
  ) {
    super(VentasPlanes, dataSource);
    this.planes = this.createBelongsToAccessorFor('planes', planesRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
  }
}
