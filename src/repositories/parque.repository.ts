import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Parque, ParqueRelations, Usuario, Planes, Zona} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {PlanesRepository} from './planes.repository';
import {ZonaRepository} from './zona.repository';

export class ParqueRepository extends DefaultCrudRepository<
  Parque,
  typeof Parque.prototype.id,
  ParqueRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Parque.prototype.id>;

  public readonly planes: HasManyRepositoryFactory<Planes, typeof Parque.prototype.id>;

  public readonly zonas: HasManyRepositoryFactory<Zona, typeof Parque.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('PlanesRepository') protected planesRepositoryGetter: Getter<PlanesRepository>, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>,
  ) {
    super(Parque, dataSource);
    this.zonas = this.createHasManyRepositoryFactoryFor('zonas', zonaRepositoryGetter,);
    this.registerInclusionResolver('zonas', this.zonas.inclusionResolver);
    this.planes = this.createHasManyRepositoryFactoryFor('planes', planesRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
