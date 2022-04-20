import { IDoCaculation } from '../type/action';

export class CaculationOp {
    public static Caculate(caculate: IDoCaculation) {
        switch (caculate.op) {
            case 'add': return caculate.a + caculate.b;
            case 'sub': return caculate.a - caculate.b;
            case 'mut': return caculate.a * caculate.b;
            case 'div': return caculate.a / caculate.b;
            default: return 0;
        }
    }
}
