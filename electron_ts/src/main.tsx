import React from 'react';

export class Main extends React.Component {
    state = { fileContent: '' };

    async componentDidMount() {
        const content = await window.api.readFile('F:/Test/README.txt');
        // 设置组件状态更新界面
        this.setState({ fileContent: content });
    }

    render() {
        return (
            <div>{this.state.fileContent}</div>
        );
    }
}
