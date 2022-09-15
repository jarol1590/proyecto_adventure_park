import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Planes} from './planes.model';
import {Zona} from './zona.model';

@model()
export class Parque extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadVisitas: number;

  @property({
    type: 'string',
    required: true,
  })
  logo: string;

  @property({
    type: 'string',
    required: true,
  })
  mapa: string;

  @property({
    type: 'string',
    required: true,
  })
  slogan: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  @property({
    type: 'number',
  })
  ciudadId?: number;

  @hasMany(() => Planes)
  planes: Planes[];

  @hasMany(() => Zona)
  zonas: Zona[];

  constructor(data?: Partial<Parque>) {
    super(data);
  }
}

export interface ParqueRelations {
  // describe navigational properties here
}

export type ParqueWithRelations = Parque & ParqueRelations;
