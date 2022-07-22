import { db } from 'src/db/db';
import { v4 as uuidv4 } from 'uuid';

export function updateDb(
  props: { id: string | undefined; changeProp: string },
  body,
  keys,
) {
  let { id } = props;
  const { changeProp } = props;
  if (id) {
    const i = db[changeProp].findIndex((item) => item.id === id);
    for (const key in keys) {
      const changeKey = keys[key];
      if (typeof body[changeKey] !== 'boolean') {
        db[changeProp][i][changeKey] =
          body[changeKey] || db[changeProp][i][changeKey];
      } else {
        db[changeProp][i][changeKey] = body[changeKey];
      }
    }
    return db[changeProp][i];
  } else {
    id = uuidv4();
    const item = { id: id };
    for (const key in keys) {
      const addKey = keys[key];
      item[addKey] = body[addKey] || null;
    }
    db[changeProp].push(item);
    return item;
  }
}
