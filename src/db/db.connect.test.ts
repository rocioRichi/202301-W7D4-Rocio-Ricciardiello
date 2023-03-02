import mongoose from 'mongoose';
import { dbConnect } from './db.connetc';
describe('when we connect', () => {
  test('then it should return a typeof mongoose', async () => {
    const result = await dbConnect();
    expect(typeof result).toBe(typeof mongoose);
    mongoose.disconnect();
  });
});
