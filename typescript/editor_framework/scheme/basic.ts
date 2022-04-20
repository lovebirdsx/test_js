import {
 IDoCaculation, ILog, IShowMessage, Op,
} from '../type/action';
import { ObjectScheme, Scheme, TFields } from './define';

export class IntScheme extends Scheme<number> {
    createDefault(parent: unknown): number {
        return 0;
    }
}

export class FloatScheme extends Scheme<number> {
    createDefault(parent: unknown): number {
        return 0;
    }
}

export class BooleanScheme extends Scheme<boolean> {
    createDefault(parent: unknown): boolean {
        return false;
    }
}

export class StringScheme extends Scheme<string> {
    createDefault(parent: unknown): string {
        return '';
    }
}

export class OpScheme extends Scheme<Op> {
    createDefault(parent: unknown): Op {
        return 'add';
    }
}

export class LogScheme extends ObjectScheme<ILog> {
    name: string = 'Log';
    fields: TFields<ILog> = {
        content: new StringScheme(),
    };
}

export class ShowMessageScheme extends ObjectScheme<IShowMessage> {
    name: string = 'ShowMessage';
    fields: TFields<IShowMessage> = {
        content: new StringScheme(),
    };
}

class CaculationScheme extends ObjectScheme<IDoCaculation> {
    name: string = 'Caculation';
    fields: TFields<IDoCaculation> = {
        a: new IntScheme(),
        b: new IntScheme(),
        op: new OpScheme(),
    };
}
