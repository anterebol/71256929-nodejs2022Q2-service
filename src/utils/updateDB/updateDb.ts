import { v4 as uuidv4 } from 'uuid';

export const createItemDB = (body, keys) => {
  const id = uuidv4();
  const item = { id: id, name: '', artistId: null, albumId: null, duration: 0 };
  for (const key in keys) {
    const addKey = keys[key];
    item[addKey] = body[addKey] || null;
  }
  return item;
};
