import { IDoCaculation } from '../type/action';

class CaculationOp {
    public Caculate(caculate: IDoCaculation) {
        switch (caculate.op) {
            case 'add': return caculate.a + caculate.b;
            case 'sub': return caculate.a - caculate.b;
            case 'mut': return caculate.a * caculate.b;
            case 'div': return caculate.a / caculate.b;
            default: return 0;
        }
    }
}

export const caculationOp = new CaculationOp();
