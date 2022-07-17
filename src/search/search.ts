import { HttpException } from '@nestjs/common';
import { NOT_FOUND } from 'src/constants/constants';
import { db } from 'src/db/db';

export function searchElement(prop: string, id: string) {
  const elem = db[prop].find((element) => element.id === id);
  if (!elem) {
    throw new HttpException(NOT_FOUND, 404);
  }
  return elem;
}
