import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { DbLeaves, Leaves, safeKey } from '../shared/scheme.type';

interface IPost {
  title: string;
  content: string;
}

interface IBoard {
  name: string;
  description: string;
  posts: IPost[] | Types.ObjectId[];
}

interface IProduct {
  name: string;
  description: string;
  boards: IBoard[] | Types.ObjectId[];
}

const PostSchema = new mongoose.Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const BoardSchema = new mongoose.Schema<IBoard>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  posts: [{ type: Types.ObjectId, required: true, ref: 'Post' }],
});

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  boards: [{ type: Types.ObjectId, ref: 'Board' }],
});

const PostModel = mongoose.model('Post', PostSchema);
const ProductModel = mongoose.model('Product', ProductSchema);
const BoardModel = mongoose.model('Board', BoardSchema);

describe('database', () => {
  let server: MongoMemoryServer;
  let connection: typeof mongoose;

  beforeAll(async () => {
    server = await MongoMemoryServer.create();
    connection = await mongoose.connect(server.getUri());
  });

  afterAll(async () => {
    await connection.disconnect();
    await server.stop();
  });

  it('should be defined', () => {
    expect(server).toBeDefined();
    expect(connection).toBeDefined();
  });

  it('nested', async () => {
    interface IAddress {
      street: string;
      city: string;
      zipCode: number;
    }

    const AddressSchema = new mongoose.Schema<IAddress>({
      street: String,
      city: String,
      zipCode: Number,
    });

    interface IUser {
      name: string;
      age: number;
      address: IAddress;
    }

    const UserSchema = new mongoose.Schema<IUser>({
      name: { type: String, required: true },
      age: { type: Number, required: true },
      address: { type: AddressSchema, required: true },
    });

    const UserModel = mongoose.model('User', UserSchema);
    const user = new UserModel({
      name: 'John',
      age: 42,
      address: {
        street: 'Fakestreet 123',
        city: 'Springfield',
        zipCode: 12345,
      },
    } as IUser);
    await user.save();

    const user1 = await UserModel.findOne({ name: 'John' });
    expect(user1).toBeDefined();
    expect(user1.name).toEqual('John');
    expect(user1.age).toEqual(42);
    expect(user1.address).toBeDefined();
    expect(user1.address.street).toEqual('Fakestreet 123');
    expect(user1.address.city).toEqual('Springfield');
    expect(user1.address.zipCode).toEqual(12345);

    // 更新地址 (强类型)
    const field1: Leaves<IUser> = 'address.street';
    await UserModel.updateOne({ name: 'John' }, { $set: { [field1]: 'Fakestreet 456' } });

    // 选择性查询 (强类型)
    const filed2: DbLeaves<IUser> = 'address._id';
    const user2 = await UserModel.findOne({ name: 'John' }).select({ _id: 0, __v: 0, [filed2]: 0 });
    expect(user2.address.street).toEqual('Fakestreet 456');
    expect(user2.address.city).toEqual('Springfield');
    expect(user2._id).toBeUndefined();
  });

  it('ref', async () => {
    const post1 = new PostModel({ title: 'post1', content: 'post1' } as IPost);
    await post1.save();
    const post2 = new PostModel({ title: 'post2', content: 'post2' } as IPost);
    await post2.save();

    const board1 = new BoardModel({ name: 'board1', description: 'board1', posts: [post1.id, post2.id] } as IBoard);
    await board1.save();

    const board2 = new BoardModel({ name: 'board2', description: 'board2', posts: [] } as IBoard);
    await board2.save();

    const product = new ProductModel({
      name: 'product1',
      description: 'product1',
      boards: [board1._id, board2._id],
    } as IProduct);

    await product.save();

    // populate
    const product1 = await ProductModel.findOne({ name: 'product1' }).populate({
      path: safeKey<IProduct>('boards'),
      populate: {
        path: safeKey<IBoard>('posts'),
      },
    });
    expect(product1.boards).toBeDefined();
    expect(product1.boards.length).toEqual(2);
    expect(((product1.boards[0] as IBoard).posts[0] as IPost).title).toEqual('post1');
    expect((product1.boards[0] as IBoard).name).toEqual('board1');

    // 不 populate
    const product2 = await ProductModel.findOne({ name: 'product1' });
    expect(product2.boards).toBeDefined();
    expect(product2.boards.length).toEqual(2);
    expect((product2.boards[0] as IBoard).name).toBeUndefined();
  });
});
