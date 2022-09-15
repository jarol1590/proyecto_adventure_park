import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {StandComidas, StandComidasRelations, FoodVentas} from '../models';
import {FoodVentasRepository} from './food-ventas.repository';

export class StandComidasRepository extends DefaultCrudRepository<
  StandComidas,
  typeof StandComidas.prototype.id,
  StandComidasRelations
> {

  public readonly foodVentas: HasManyRepositoryFactory<FoodVentas, typeof StandComidas.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FoodVentasRepository') protected foodVentasRepositoryGetter: Getter<FoodVentasRepository>,
  ) {
    super(StandComidas, dataSource);
    this.foodVentas = this.createHasManyRepositoryFactoryFor('foodVentas', foodVentasRepositoryGetter,);
    this.registerInclusionResolver('foodVentas', this.foodVentas.inclusionResolver);
  }
}
