import {Entity, hasMany, model, property} from '@loopback/repository';
import {FoodVentas} from './food-ventas.model';

@model()
export class StandComidas extends Entity {
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
  menu: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'number',
  })
  zonaId?: number;

  @hasMany(() => FoodVentas)
  foodVentas: FoodVentas[];

  constructor(data?: Partial<StandComidas>) {
    super(data);
  }
}

export interface StandComidasRelations {
  // describe navigational properties here
}

export type StandComidasWithRelations = StandComidas & StandComidasRelations;
