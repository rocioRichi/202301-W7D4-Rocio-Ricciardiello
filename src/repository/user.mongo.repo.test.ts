import { User } from '../entities/user';
import { UserModel } from './users.mongo.model';
import { UsersMongoRepo } from './users.mongo.repo';

jest.mock('./users.mongo.model.js');

describe('Given repo class', () => {
  const repo = new UsersMongoRepo();

  describe('When  repo is instanced', () => {
    test('Then, we get a newrepo object ;', () => {
      expect(repo).toBeInstanceOf(UsersMongoRepo);
    });
  });

  describe('When  query method is called', () => {
    test('Then an empty array will be returned', async () => {
      const result = await repo.query();
      expect(result).toEqual([]);
    });
  });

  describe('When  queryID method is called', () => {
    test('Then, if  its a valid ID, and object  will be returned', async () => {
      (UserModel.findById as jest.Mock).mockResolvedValue({ id: '1' });
      const result = await repo.queryId('1');
      expect(result).toEqual({ id: '1' });
    });

    test('Then, if there is no valid Id, an Error will be thrown', async () => {
      (UserModel.findById as jest.Mock).mockResolvedValue(null);
      expect(async () => repo.queryId('')).rejects.toThrow();
    });
  });
  describe('Given  search method ', () => {
    test('when we have a query object, and match with models s query.value,this one will be returned', async () => {
      (UserModel.find as jest.Mock).mockResolvedValue([{ id: '1' }]);
      const mockQuery = { key: 'test', value: 'test' };
      const result = await repo.search(mockQuery);
      expect(result).toEqual([{ id: '1' }]);
    });
  });

  describe('When  create method is called', () => {
    test('Then, a parameter with new info is passed to create. Data with new info will be returned ', async () => {
      (UserModel.create as jest.Mock).mockResolvedValue({ email: 'test' });
      const result = await repo.create({ email: 'test' });
      expect(result).toEqual({ email: 'test' });
    });
  });

  describe('When the update method is called', () => {
    const mockUser = {
      email: 'test',
    } as Partial<User>;

    test('Then, if there is a valid ID  the same object should be returned', async () => {
      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        email: 'test',
      });
      const result = await repo.update(mockUser);
      expect(result).toEqual({ email: 'test' });
    });

    test('Then, if there is no valid Id, an Error should be thrown', async () => {
      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      expect(async () => repo.update(mockUser)).rejects.toThrow();
    });
  });

  describe('When the delete method is called', () => {
    test('Then, if there is no valid Id, an error should be thrown', async () => {
      (UserModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      expect(async () => repo.destroy('')).rejects.toThrow();
    });
  });
});
