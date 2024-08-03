// 基础类型

type Primitive = number | string | boolean | undefined | object | bigint | symbol | Function;

function f(a: number, b: number) {
    return a + b;
}

type F = typeof f;

type Id = number | string;

class Base {
    name = '';
}

interface IBase {
    name: string;
}

interface Point {
    x: number;
    y: number;
}

declare function plot(point: Point): void;

const pos2d = { x: 10, y: 25 };
plot(pos2d);
const pos3d = { x: 10, y: 25, z: 0 };
plot(pos3d);

interface User {
    id: number;
    name: string;
}

interface Post {
    id: number;
    authorId: number;
    title: string;
    body: string;
}

declare function getPost(postId: number): Promise<Post>;
declare function getUser(userId: number): Promise<User>;

function authorOfPost(postId: number): Promise<User> {
    return getPost(postId).then((post) => getUser(post.id)); // ❌ post.id
}
