import {Entity, hasMany, model, property} from '@loopback/repository';
import {Parque} from './parque.model';

@model()
export class Ciudad extends Entity {
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
  postal: string;

  @property({
    type: 'number',
  })
  departamentoId?: number;

  @hasMany(() => Parque)
  parques: Parque[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
