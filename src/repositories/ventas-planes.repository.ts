import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {VentasPlanes, VentasPlanesRelations} from '../models';

export class VentasPlanesRepository extends DefaultCrudRepository<
  VentasPlanes,
  typeof VentasPlanes.prototype.id,
  VentasPlanesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(VentasPlanes, dataSource);
  }
}
