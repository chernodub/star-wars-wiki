export class WrapDTO<T> {
  pk: number;
  model: string;
  fields: T;
}
