/**
 * 测试和React生命周期相关的内容，包括：
 * 1. React.StrictMode下的相关调用时序
 *   * strict模式下，每个组件会先被mount一次，但不会调用useEffect，接下来再mount一次，并执行 useEffect，cleanup，useEffect
 *   * 具体可以参考：https://legacy.reactjs.org/docs/strict-mode.html
 */

import React from 'react';
import { render } from '@testing-library/react';

describe('lifetime', () => {
  const callRecords: string[] = [];
  class Service {
    static globalId = 0;

    id = Service.globalId++;

    call() {
      callRecords.push(`Service${this.id}.call`);
    }

    dispose() {
      callRecords.push(`Service${this.id}.dispose`);
    }
  }

  beforeEach(() => {
    callRecords.length = 0;
    Service.globalId = 0;
  });

  it('strict mode - basic', () => {
    function Component() {
      callRecords.push('call');
      return <></>;
    }

    render(<React.StrictMode><Component /></React.StrictMode>);

    expect(callRecords).toEqual(['call', 'call']);
  });

  it('strict mode - use effect - function component', () => {
    let id = 0;

    function Component() {
      const callId = id++;
      callRecords.push(`constructor ${callId}`);

      React.useEffect(() => {
        callRecords.push(`call ${callId}`);
        return () => {
          callRecords.push(`dispose ${callId}`);
        };
      }, []);
      return <></>;
    }

    render(<React.StrictMode><Component /></React.StrictMode>);

    expect(callRecords).toEqual(['constructor 0', 'constructor 1', 'call 1', 'dispose 1', 'call 1']);

    id = 0;
    callRecords.length = 0;

    render(<Component />);
    expect(callRecords).toEqual(['constructor 0', 'call 0']);
  });

  it('strict mode - use effect - class component', () => {
    let id = 0;

    class Component extends React.Component {
      constructor(props: any) {
        super(props);
        this.callId = id++;
        callRecords.push(`constructor ${this.callId}`);
      }

      callId: number;

      componentDidMount() {
        callRecords.push(`call ${this.callId}`);
      }

      componentWillUnmount() {
        callRecords.push(`dispose ${this.callId}`);
      }

      render() {
        return <></>;
      }
    }

    render(<React.StrictMode><Component /></React.StrictMode>);

    expect(callRecords).toEqual(['constructor 0', 'constructor 1', 'call 1', 'dispose 1', 'call 1']);

    id = 0;
    callRecords.length = 0;

    render(<Component />);
    expect(callRecords).toEqual(['constructor 0', 'call 0']);
  });

  it('strict mode - normal', () => {
    function Component() {
      const serviceRef = React.useRef<Service>();
      React.useEffect(() => {
          const service = new Service();
          serviceRef.current = service;
          service.call();
        return () => {
          service.dispose();
          serviceRef.current = undefined;
        };
      }, []);
      return <></>;
    }

    render(<React.StrictMode><Component /></React.StrictMode>);

    expect(callRecords).toEqual(['Service0.call', 'Service0.dispose', 'Service1.call']);
  });

  it('strict mode - context provider', () => {
    const Context = React.createContext<Service>(undefined!);
    function ServiceContextProvider({ children }: { children: React.ReactNode }) {
      const [service, setService] = React.useState<Service>();
      const serviceRef = React.useRef<Service>();

      React.useEffect(() => {
        const service = new Service();
        serviceRef.current = service;
        service.call();

        setService(service);

        return () => {
          service.dispose();
          serviceRef.current = undefined;
        };
      }, []);

      if (!service) {
        return null;
      }

      return <Context.Provider value={service}>{children}</Context.Provider>;
    }

    render(
      <React.StrictMode>
        <ServiceContextProvider>
          <div></div>
        </ServiceContextProvider>
      </React.StrictMode>,
    );

    expect(callRecords).toEqual(['Service0.call', 'Service0.dispose', 'Service1.call']);
  });
});
