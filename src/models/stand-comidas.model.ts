import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<StandComidas>) {
    super(data);
  }
}

export interface StandComidasRelations {
  // describe navigational properties here
}

export type StandComidasWithRelations = StandComidas & StandComidasRelations;
