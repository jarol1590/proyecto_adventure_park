import {Entity, model, property} from '@loopback/repository';

@model()
export class VentasPlanes extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  impuestos: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'number',
  })
  planesId?: number;

  constructor(data?: Partial<VentasPlanes>) {
    super(data);
  }
}

export interface VentasPlanesRelations {
  // describe navigational properties here
}

export type VentasPlanesWithRelations = VentasPlanes & VentasPlanesRelations;
