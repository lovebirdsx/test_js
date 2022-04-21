import { ObjectScheme } from '../../scheme/define';
import { ShowTalkScheme } from '../../scheme/showTalk';
import { IShowTalk, ITalkItem } from '../../type/action';
import {
 getGlobalContexts, IProps, JSXElement,
} from '../define';

export function renderTalkItem(props: IProps<ITalkItem, ObjectScheme<ITalkItem>>): JSXElement {
    const { prefix, value } = props;
    const showTalk = getGlobalContexts().get<IShowTalk>(ShowTalkScheme);
    const index = showTalk.items.indexOf(value);
    const { who, content } = value;
    return `${prefix} id: ${index} who: ${who} content: ${content}`;
}
