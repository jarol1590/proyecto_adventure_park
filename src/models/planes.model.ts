import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Planes>) {
    super(data);
  }
}

export interface PlanesRelations {
  // describe navigational properties here
}

export type PlanesWithRelations = Planes & PlanesRelations;
