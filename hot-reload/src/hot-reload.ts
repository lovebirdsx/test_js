import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

const handlerMap = new Map<string, unknown>();
const hotsPath = path.join(__dirname);

// 加载指定文件的代码
function load(filename: string) {
    return new Promise<NodeRequire | undefined>((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) {
                resolve(undefined);
            } else {
                try {
                    // 使用vm模块的Script方法来预编译发生变化后的文件代码，检查语法错误，提前发现是否存在语法错误等报错
                    new vm.Script(data.toString());
                } catch (e) {
                    // 语法错误,编译失败
                    reject(e);
                    return;
                }

                // 修改file内容，让其require热重载模块
                

                // 编译通过后，重新require加载最新的代码
                resolve(require(filename));
            }
        });
    });
};

// 监视指定文件夹下的文件变动
async function watch() {
    // 这里建议用chokidar的npm包代替文件夹监听
    fs.watch(hotsPath, { recursive: true }, async (eventType, filename) => {
        if (!filename) {
            return;
        }

        // 获取到每个文件的绝对路径 
        // 包一层require.resolve的原因，拼接好路径以后，它会主动去帮你判断这个路径下的文件是否存在
        const targetFile = require.resolve(path.join(hotsPath, filename));

        // 当你适应require加载一个模块后，模块的数据就会缓存到require.cache中，下次再加载相同模块，就会直接走require.cache
        // 所以我们热加载部署，首要做的就是清除require.cache中对应文件的缓存
        const cacheModule = require.cache[targetFile];
        if (!cacheModule) {
            return;
        }

        console.log("检测到文件变动：", filename);
        console.log(cacheModule);

        // 去除掉在require.cache缓存中parent对当前模块的引用，否则会引起内存泄露，具体解释可以看下面的文章
        // 《记录一次由一行代码引发的“血案”》https://cnodejs.org/topic/5aaba2dc19b2e3db18959e63
        // 《一行 delete require.cache 引发的内存泄漏血案》https://zhuanlan.zhihu.com/p/34702356
        if (cacheModule.parent) {
            cacheModule.parent.children.splice(cacheModule.parent.children.indexOf(cacheModule), 1);
        }

        // 清除指定路径对应模块的require.cache缓存
        require.cache[targetFile] = undefined;

        // 重新加载发生变动后的模块文件，实现热加载部署效果，并将重新加载后的结果，更新到handlerMap变量当中
        const code = await load(targetFile);
        if (!code) {
            return;
        }

        handlerMap.set(filename, code);

        console.log("热部署文件：", filename, "，执行结果：", handlerMap);
    });
};

// 加载文件代码 并 监听指定文件夹目录文件内容变动
const loadAll = async () => {
    console.log(`开始加载${hotsPath}目录下的所有文件`);

    // 遍历出指定文件夹下的所有文件
    const files = await new Promise<string[]>((resolve, reject) => {
        fs.readdir(hotsPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });

    // 初始化加载所有文件 把每个文件结果缓存到handlerMap变量当中
    for (let f in files) {
        handlerMap.set(files[f], await load(path.join(hotsPath, files[f])));
    }

    // 监听指定文件夹的文件内容变动
    await watch();
};

loadAll()
