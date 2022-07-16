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
    const i = db[changeProp].findIndex((track) => track.id === id);
    for (const key in keys) {
      const changeKey = keys[key];
      db[changeProp][i][changeKey] = body[changeKey] || null;
    }
    return db[changeProp][i];
  }
  id = uuidv4();
  const track = { id };
  for (const key in keys) {
    const addKey = keys[key];
    track[addKey] = body[addKey] || null;
  }
  db.tracks.push(track);
  return track;
}
