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
  })
  fecha?: string;

  @property({
    type: 'number',
  })
  impuestos?: number;

  @property({
    type: 'number',

  })
  total?: number;

  @property({
    type: 'number',
    required: true,
  })
  cant: number;

  @property({
    type: 'number',
    require: true
  })
  planesId: number;

  constructor(data?: Partial<VentasPlanes>) {
    super(data);
  }
}

export interface VentasPlanesRelations {
  // describe navigational properties here
}

export type VentasPlanesWithRelations = VentasPlanes & VentasPlanesRelations;
