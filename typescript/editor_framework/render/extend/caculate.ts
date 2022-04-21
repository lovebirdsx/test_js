import { CaculationOp } from '../../operation/caculation';
import { IObjMeta, ObjectScheme } from '../../scheme/define';
import { IDoCaculation } from '../../type/action';
import { IProps, JSXElement, makeIndent } from '../define';

export function renderDoCalculate(props: IProps<IDoCaculation, IObjMeta, ObjectScheme<IDoCaculation>>): JSXElement {
    const { scheme, prefix, value } = props;
    const { meta } = scheme;
    if (meta.newLine) {
        const newPrefix = makeIndent(prefix);
        return `${prefix}DoCalculate\n${newPrefix}${value.a} ${value.op} ${value.b} = ${CaculationOp.Caculate(value)}`;
    }

    return `${prefix}DoCalculate ${value.a} ${value.op} ${value.b} = ${CaculationOp.Caculate(value)}`;
}
