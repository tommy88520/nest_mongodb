import { Hotel } from '../schema/hotel';

export class Detail {
  data: Promise<Hotel[]>;
  length: Promise<number>;
}
