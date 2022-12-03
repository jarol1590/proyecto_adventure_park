import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Planes} from './planes.model';

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

  @belongsTo(() => Planes)
  planesId: number;


  constructor(data?: Partial<VentasPlanes>) {
    super(data);
  }
}

export interface VentasPlanesRelations {
  // describe navigational properties here
}

export type VentasPlanesWithRelations = VentasPlanes & VentasPlanesRelations;
