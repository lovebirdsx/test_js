import { EAction } from '../action';
import { actionRegistry } from './action_registry';
import { LogAction, WaitAction } from './basic';
import { MoveToPosAction, ShowTalkAction } from './entity';

actionRegistry.register(EAction.Log, LogAction);
actionRegistry.register(EAction.Wait, WaitAction);
actionRegistry.register(EAction.MoveToPos, MoveToPosAction);
actionRegistry.register(EAction.ShowTalk, ShowTalkAction);

export * from './action_registry';
