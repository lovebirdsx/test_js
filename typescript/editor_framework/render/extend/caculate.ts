import { CaculationOp } from '../../operation/caculation';
import { ActionScheme, ObjectScheme } from '../../scheme/define';
import { IDoCaculation } from '../../type/action';
import { IProps, JSXElement, makeIndent } from '../define';

export function renderDoCalculate(
    props: IProps<IDoCaculation, ActionScheme<IDoCaculation>>,
): JSXElement {
    const { scheme, prefix, value } = props;
    if (scheme.newLine) {
        const newPrefix = makeIndent(prefix);
        return `${prefix}DoCalculate\n${newPrefix}${value.a} ${value.op} ${
            value.b
        } = ${CaculationOp.Caculate(value)}`;
    }

    return `${prefix}DoCalculate ${value.a} ${value.op} ${
        value.b
    } = ${CaculationOp.Caculate(value)}`;
}
