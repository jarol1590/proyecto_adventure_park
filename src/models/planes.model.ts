import {Entity, model, property, hasMany} from '@loopback/repository';
import {VentasPlanes} from './ventas-planes.model';

@model()
export class Planes extends Entity {
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
  color: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'number',
  })
  parqueId?: number;

  @hasMany(() => VentasPlanes)
  ventasPlanes: VentasPlanes[];

  constructor(data?: Partial<Planes>) {
    super(data);
  }
}

export interface PlanesRelations {
  // describe navigational properties here
}

export type PlanesWithRelations = Planes & PlanesRelations;
