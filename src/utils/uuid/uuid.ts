import { HttpException } from '@nestjs/common';
import { NOT_UUID } from 'src/constants/constants';

export function checkUuid(id: string) {
  const status =
    /[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/.exec(id) &&
    id.length === 36;
  if (!status) {
    throw new HttpException(NOT_UUID, 400);
  }
}
