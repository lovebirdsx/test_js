import { ObjectScheme } from '../../scheme/define';
import { showTalkScheme } from '../../scheme/show_talk';
import { IShowTalk, ITalkItem } from '../../type/action';
import {
 getGlobalContexts, IProps, JSXElement,
} from '../define';

export function renderTalkItem(props: IProps<ITalkItem, ObjectScheme<ITalkItem>>): JSXElement {
    const { prefix, value } = props;
    const showTalk = getGlobalContexts().get<IShowTalk>(showTalkScheme);
    const index = showTalk.items.indexOf(value);
    const { who, content } = value;
    return `${prefix} id: ${index} who: ${who} content: ${content}`;
}
