import {Entity, model, property} from '@loopback/repository';

@model()
export class Atracciones extends Entity {
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
  image: string;

  @property({
    type: 'string',
    required: true,
  })
  minimo_altura: string;

  @property({
    type: 'string',
    required: true,
  })
  video: string;

  @property({
    type: 'string',
  })
  descripcion?: string;


  constructor(data?: Partial<Atracciones>) {
    super(data);
  }
}

export interface AtraccionesRelations {
  // describe navigational properties here
}

export type AtraccionesWithRelations = Atracciones & AtraccionesRelations;
