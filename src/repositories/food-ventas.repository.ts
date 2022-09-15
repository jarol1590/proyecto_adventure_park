import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {FoodVentas, FoodVentasRelations} from '../models';

export class FoodVentasRepository extends DefaultCrudRepository<
  FoodVentas,
  typeof FoodVentas.prototype.id,
  FoodVentasRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(FoodVentas, dataSource);
  }
}
