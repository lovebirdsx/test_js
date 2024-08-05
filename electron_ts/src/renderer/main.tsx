import React from 'react';
import { JsonConfig } from './common/jsonConfig';

interface IMainState {
    fileContent: string;
    a: number;
    b: number;
    r: number;
    isLoading: boolean;
}

const saveData = {
    path: '',
};

export class Main extends React.Component<unknown, IMainState> {
    private saveData = new JsonConfig('Main', saveData);

    constructor(props: unknown) {
        super(props);
        this.state = {
            fileContent: '',
            a: 0,
            b: 0,
            r: 0,
            isLoading: true,
        };
    }

    async componentDidMount() {
        await this.saveData.load();
        this.setState({ isLoading: false });
        await this.readFile();
    }

    async selectFile() {
        const path = await window.electronAPI.openFileDialog(this.saveData.get('path'));
        if (!path) {
            return;
        }

        await this.saveData.set('path', path);
        this.forceUpdate();
        await this.readFile();
    }

    async readFile() {
        const path = this.saveData.get('path');
        if (!path) {
            return;
        }
        const content = await window.electronAPI.readFile(path);
        this.setState({ fileContent: content });
    }

    renderFile() {
        if (this.state.isLoading) {
            return <div>loading...</div>;
        }
        return (
            <div>
                <p>
                    <label>文件路径：</label>
                    <input
                        size={40}
                        value={this.saveData.get('path')}
                        onChange={(ev) => {
                            this.saveData.set('path', ev.target.value);
                            this.forceUpdate();
                        }}
                    />
                    <button
                        onClick={() => {
                            this.selectFile();
                        }}
                    >
                        打开
                    </button>
                </p>
                <p>
                    <textarea readOnly={true} rows={40} cols={80} value={this.state.fileContent} />
                </p>
            </div>
        );
    }

    render() {
        return (
            <div>
                <p>
                    <input
                        size={5}
                        onChange={(event) => {
                            this.setState({ a: Number(event.target.value) });
                        }}
                        value={this.state.a}
                    />
                    <input
                        size={5}
                        onChange={(event) => {
                            this.setState({ b: Number(event.target.value) });
                        }}
                        value={this.state.b}
                    />
                    <button
                        onClick={async () => {
                            const result = await window.electronAPI.add(this.state.a, this.state.b);
                            this.setState({ r: result });
                        }}
                    >
                        Add
                    </button>
                    <label>{`Result = ${this.state.r}`}</label>
                </p>
                <p>
                    <button
                        onClick={async () => {
                            await window.electronAPI.setTitle('Wahaha');
                        }}
                    >
                        Set Title
                    </button>
                    <button
                        onClick={async () => {
                            await window.electronAPI.log('Hello World');
                        }}
                    >
                        Log
                    </button>
                    <button
                        onClick={() => {
                            window.port.postMessage('hello from renderer');
                        }}
                    >
                        MessagePort.Post
                    </button>
                </p>
                {this.renderFile()}
            </div>
        );
    }
}
