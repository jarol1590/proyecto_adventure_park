import {Entity, model, property} from '@loopback/repository';

@model()
export class FoodVentas extends Entity {
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
  total: number;

  @property({
    type: 'date',
  })
  descripcion?: string;

  @property({
    type: 'number',
  })
  standComidasId?: number;

  constructor(data?: Partial<FoodVentas>) {
    super(data);
  }
}

export interface FoodVentasRelations {
  // describe navigational properties here
}

export type FoodVentasWithRelations = FoodVentas & FoodVentasRelations;
