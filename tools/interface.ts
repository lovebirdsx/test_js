/* eslint-disable */
export const protobufPackage = "interface";

export enum EActionId {
  Activate = 0,
  CallByCondition = 1,
  CallFunction = 2,
  UNRECOGNIZED = -1,
}

export enum EComponentId {
  ActorStateComponent = 0,
  BehaviorFlowComponent = 1,
  CalculateComponent = 2,
  EntitySpawnerComponent = 3,
  EventComponent = 4,
  FlowComponent = 5,
  GrabComponent = 6,
  InteractiveComponent = 7,
  LampComponent = 8,
  MoveComponent = 9,
  NpcComponent = 10,
  RefreshEntityComponent = 11,
  RefreshSingleComponent = 12,
  RotatorComponent = 13,
  SimpleComponent = 14,
  SphereComponent = 15,
  SphereFactoryComponent = 16,
  SpringBoardComponent = 17,
  SpringComponent = 18,
  StateComponent = 19,
  SwitcherComponent = 20,
  TalkComponent = 21,
  TrampleComponent = 22,
  TriggerComponent = 23,
  UndergroundComponent = 24,
  UNRECOGNIZED = -1,
}

export interface IActionInfo {
  Id: EActionId;
  Name: string;
  Async: boolean;
  Params?: { [key: string]: any } | undefined;
}

export interface IShowMessage {
  Content: string;
}

export interface IJumpTalk {
  TalkId: number;
}

export interface IStateInfo {
  Id: number;
  Name: string;
  Actions: IActionInfo[];
}

export interface IFlowInfo {
  Id: number;
  Name: string;
  States: IStateInfo[];
}

export interface IBehaviorFlowComponent {
  InitStateId: number;
  FlowInfo: IFlowInfo | undefined;
}
