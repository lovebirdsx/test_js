import { readFileSync } from 'fs';
import { MongoClient } from 'mongodb';

const recipes = [
    {
        name: 'elotes',
        ingredients: [
            'corn',
            'mayonnaise',
            'cotija cheese',
            'sour cream',
            'lime',
        ],
        prepTimeInMinutes: 35,
    },
    {
        name: 'loco moco',
        ingredients: [
            'ground beef',
            'butter',
            'onion',
            'egg',
            'bread bun',
            'mushrooms',
        ],
        prepTimeInMinutes: 54,
    },
    {
        name: 'patatas bravas',
        ingredients: [
            'potato',
            'tomato',
            'olive oil',
            'onion',
            'garlic',
            'paprika',
        ],
        prepTimeInMinutes: 80,
    },
    {
        name: 'fried rice',
        ingredients: [
            'rice',
            'soy sauce',
            'egg',
            'onion',
            'pea',
            'carrot',
            'sesame oil',
        ],
        prepTimeInMinutes: 40,
    },
];

function getPassword() {
    return readFileSync('.password', 'utf8').trim();
}

async function run() {
    const uri = `mongodb+srv://lovebirdsx:${getPassword()}@cluster0.egbcdxd.mongodb.net/`;
    const client = new MongoClient(uri);
    await client.connect();
    const dbName = 'myDatabase';
    const collectionName = 'recipes';
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 删除集合
    collection.drop();
    console.log(`Dropped collection ${dbName}.${collectionName}`);

    // 插入多个文档
    const insertResult = await collection.insertMany(recipes);
    console.log(`Inserted ${insertResult.insertedCount} documents into ${dbName}.${collectionName}`);

    // 查询多个文档
    const findQuery = { prepTimeInMinutes: { $lt: 45 } };
    const cursor = await collection.find(findQuery).sort({ name: 1 });
    for await (const doc of cursor) {
        console.log(doc);
    }

    // 查询单个文档
    const findOneQuery = { ingredients: 'potato' };
    const findResult = await collection.findOne(findOneQuery);
    console.log(`Found document: ${JSON.stringify(findResult)}`);

    // 更新文档
    const updateDoc = { $set: { prepTimeInMinutes: 72 } };
    const updateResult = await collection.findOneAndUpdate(findOneQuery, updateDoc);
    console.log(`Updated document: ${JSON.stringify(updateResult)}`);

    // 删除文档
    const deleteQuery = { name: { $in: ['elotes', 'fried rice'] } };
    const deleteResult = await collection.deleteMany(deleteQuery);
    console.log(`Deleted ${deleteResult.deletedCount} documents`);

    // 使用事务
    // 1.开始一个新的事务
    const session = client.startSession();
    session.startTransaction();

    try {
        // 2.在会话中执行操作
        const updateDoc1 = { $set: { prepTimeInMinutes: 90 } };
        const findOneQuery1 = { name: 'patatas bravas' };
        await collection.findOneAndUpdate(findOneQuery1, updateDoc1, { session });

        const updateDoc2 = { $set: { prepTimeInMinutes: 30 } };
        const findOneQuery2 = { name: 'loco moco' };
        await collection.findOneAndUpdate(findOneQuery2, updateDoc2, { session });

        // 3.提交事务
        await session.commitTransaction();
        console.log('Transaction committed.');
    } catch (error) {
        // 如果出错，回滚事务
        await session.abortTransaction();
        console.log('Transaction aborted. Error:', error);
    } finally {
        // 结束会话
        session.endSession();
    }

    await client.close();
}

run();
