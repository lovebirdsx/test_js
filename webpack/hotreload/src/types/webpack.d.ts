declare module NodeJS {
    interface Module {
        hot?: HotModule;
    }

    interface HotModule {
        /**
         * 接受一个或多个模块的更新。
         * @param path - 可以是字符串或字符串数组，指定接受更新的模块路径。
         * @param callback - 当模块更新后会调用此回调函数。
         */
        accept(path?: string | string[], callback?: () => void): void;

        /**
         * 拒绝一个或多个模块的热替换。
         * @param path - 可以是字符串或字符串数组，指定拒绝热替换的模块路径。
         */
        decline(path?: string | string[]): void;

        /**
         * 添加代码卸载或替换前的处理函数。
         * @param callback - 处理函数，替换前调用。
         */
        dispose(callback: (data: any) => void): void;

        /**
         * 移除 dispose 添加的处理函数。
         * @param callback - 需要移除的处理函数。
         */
        removeDisposeHandler(callback: (data: any) => void): void;

        /**
         * 检查所有模块是否有更新。
         * @param autoApply - 是否自动应用所有更新。
         * @returns 返回一个承诺，解析为更新的模块数组。
         */
        check(autoApply?: boolean | ApplyOptions): Promise<UpdatedModule[]>;

        /**
         * 应用更新。
         * @param options - 应用更新的选项。
         * @returns 返回一个承诺，解析为更新的模块数组。
         */
        apply(options?: ApplyOptions): Promise<UpdatedModule[]>;
    }

    interface ApplyOptions {
        ignoreUnaccepted?: boolean;
        ignoreDeclined?: boolean;
        ignoreErrored?: boolean;
        onDeclined?: (info: any) => void;
    }

    interface UpdatedModule {
        id: string;
        path: string;
    }
}
