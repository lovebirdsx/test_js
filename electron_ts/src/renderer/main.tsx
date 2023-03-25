import React from 'react';

interface IMainState {
  fileContent: string;
  a: number;
  b: number;
  r: number;
}

export class Main extends React.Component<unknown, IMainState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      fileContent: '',
      a: 0,
      b: 0,
      r: 0,
    };
  }

  async componentDidMount() {
    const content = await window.electronAPI.readFile('F:/Test/README.txt');
    this.setState({ fileContent: content });
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
        <p>{this.state.fileContent}</p>
      </div>
    );
  }
}
