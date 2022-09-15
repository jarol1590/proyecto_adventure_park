import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Atracciones, AtraccionesRelations, Zona} from '../models';
import {ZonaRepository} from './zona.repository';

export class AtraccionesRepository extends DefaultCrudRepository<
  Atracciones,
  typeof Atracciones.prototype.id,
  AtraccionesRelations
> {

  public readonly zona: BelongsToAccessor<Zona, typeof Atracciones.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>,
  ) {
    super(Atracciones, dataSource);
    this.zona = this.createBelongsToAccessorFor('zona', zonaRepositoryGetter,);
    this.registerInclusionResolver('zona', this.zona.inclusionResolver);
  }
}
