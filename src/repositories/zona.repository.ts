import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Zona, ZonaRelations, Parque, Atracciones, StandComidas} from '../models';
import {ParqueRepository} from './parque.repository';
import {AtraccionesRepository} from './atracciones.repository';
import {StandComidasRepository} from './stand-comidas.repository';

export class ZonaRepository extends DefaultCrudRepository<
  Zona,
  typeof Zona.prototype.id,
  ZonaRelations
> {

  public readonly parque: BelongsToAccessor<Parque, typeof Zona.prototype.id>;

  public readonly atracciones: HasManyRepositoryFactory<Atracciones, typeof Zona.prototype.id>;

  public readonly standComidas: HasManyRepositoryFactory<StandComidas, typeof Zona.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ParqueRepository') protected parqueRepositoryGetter: Getter<ParqueRepository>, @repository.getter('AtraccionesRepository') protected atraccionesRepositoryGetter: Getter<AtraccionesRepository>, @repository.getter('StandComidasRepository') protected standComidasRepositoryGetter: Getter<StandComidasRepository>,
  ) {
    super(Zona, dataSource);
    this.standComidas = this.createHasManyRepositoryFactoryFor('standComidas', standComidasRepositoryGetter,);
    this.registerInclusionResolver('standComidas', this.standComidas.inclusionResolver);
    this.atracciones = this.createHasManyRepositoryFactoryFor('atracciones', atraccionesRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
    this.parque = this.createBelongsToAccessorFor('parque', parqueRepositoryGetter,);
    this.registerInclusionResolver('parque', this.parque.inclusionResolver);
  }
}
