/* eslint-disable no-use-before-define */

// 行为树节点类型
export const enum EBtNode {
  Start = 'Start',
  QuestSucceed = 'QuestSucceed',
  QuestFailed = 'QuestFailed',
  AlwaysTrue = 'AlwaysTrue',
  AlwaysFalse = 'AlwaysFalse',
  Repeater = 'Repeater',

  Sequence = 'Sequence',
  Select = 'Select',
  ParallelSelect = 'ParallelSelect',

  Condition = 'Condition',
  ConditionSelector = 'ConditionSelector',

  ChildQuest = 'ChildQuest',

  Action = 'Action',
}

// 行为树节点
export interface IBtNode<T extends EBtNode = EBtNode> {
  Type: T;
}

export interface IActionBtNode extends IBtNode<EBtNode.Action> {
}

export interface IAlwaysFalseBtNode extends IBtNode<EBtNode.AlwaysFalse> {
  Child?: TBtNode;
}

export interface IAlwaysTrueBtNode extends IBtNode<EBtNode.AlwaysTrue> {
  Child?: TBtNode;
}

export interface IChildQuestBtNode extends IBtNode<EBtNode.ChildQuest> {
}

export interface IConditionBtNode extends IBtNode<EBtNode.Condition> {
}

export interface IConditionSelectorBtNodeSlot {
  Node: TBtNode;
}

export interface IConditionSelectorBtNode extends IBtNode<EBtNode.ConditionSelector> {
  Slots: IConditionSelectorBtNodeSlot[];
}

export interface IParallelSelectBtNode extends IBtNode<EBtNode.ParallelSelect> {
  Children: TBtNode[];

  /** 若为0, 则表示需要全部, 若>0, 则表示需要对应个数的条件满足 */
  Count: number;
}

export interface IQuestFailedBtNode extends IBtNode<EBtNode.QuestFailed> {
}

export interface IQuestSucceedBtNode extends IBtNode<EBtNode.QuestSucceed> {
}

export interface IRepeaterBtNode extends IBtNode<EBtNode.Repeater> {
  Child: TBtNode;
}

export interface ISelectBtNode extends IBtNode<EBtNode.Select> {
  Children: TBtNode[];
}

export interface ISequenceBtNode extends IBtNode<EBtNode.Sequence> {
  Children: TBtNode[];
}

export interface IStartBtNode extends IBtNode<EBtNode.Start> {
  Child?: TBtNode;
}

// 所有行为树节点
export type TBtNode =
  | IActionBtNode
  | IAlwaysFalseBtNode
  | IAlwaysTrueBtNode
  | IChildQuestBtNode
  | IConditionBtNode
  | IConditionSelectorBtNode
  | IParallelSelectBtNode
  | IQuestFailedBtNode
  | IQuestSucceedBtNode
  | IRepeaterBtNode
  | ISelectBtNode
  | ISequenceBtNode
  | IStartBtNode;

function getChildren(node: TBtNode): TBtNode[] | undefined {
  switch (node.Type) {
    case EBtNode.AlwaysFalse:
      return node.Child ? [node.Child] : undefined;
    case EBtNode.AlwaysTrue:
      return node.Child ? [node.Child] : undefined;
    case EBtNode.ChildQuest:
      return undefined;
    case EBtNode.Condition:
      return undefined;
    case EBtNode.ConditionSelector:
      return node.Slots.map((slot) => slot.Node);
    case EBtNode.ParallelSelect:
      return node.Children;
    case EBtNode.QuestFailed:
      return undefined;
    case EBtNode.QuestSucceed:
      return undefined;
    case EBtNode.Repeater:
      return node.Child ? [node.Child] : undefined;
    case EBtNode.Select:
      return node.Children;
    case EBtNode.Sequence:
      return node.Children;
    case EBtNode.Start:
      return node.Child ? [node.Child] : undefined;
    case EBtNode.Action:
      return undefined;
    default:
      return undefined;
  }
}

function checkPathImpl(node: TBtNode): boolean {
  const children = getChildren(node);
  if (!children) {
    switch (node.Type) {
      case EBtNode.QuestFailed:
      case EBtNode.QuestSucceed:
        return true;
      default:
        return false;
    }
  }

  if (children.length === 0) {
    return false;
  }

  switch (node.Type) {
    case EBtNode.Sequence:
    case EBtNode.Select:
      for (let i = 0; i < children.length - 1; i++) {
        if (checkPath(children[i])) {
          return true;
        }
      }

      return checkPath(children[children.length - 1]);

    case EBtNode.ParallelSelect:
      break;
    case EBtNode.ConditionSelector:
      break;
    case EBtNode.Repeater:
      break;
    case EBtNode.AlwaysTrue:
      break;
    case EBtNode.AlwaysFalse:
      break;
    case EBtNode.Start:
      break;
    default:
      break;
  }

  return true;
}

function checkPath(node: TBtNode, path: TBtNode[] = []): boolean {
  path.push(node);

  if (checkPathImpl(node)) {
    path.pop();
    return true;
  }

  return false;
}

function formatPath(path: TBtNode[]): string {
  return path.map((node) => `[${node.Type}]`).join(' -> ');
}

function test(name: string, node: TBtNode) {
  const path: TBtNode[] = [];
  if (!checkPath(node, path)) {
    console.log(`${name.padEnd(20)} Failed   ${formatPath(path)}`);
  } else {
    console.log(`${name.padEnd(20)} Succeed`);
  }
}

function main() {
  test('Simple', {
    Type: EBtNode.Start,
    Child: {
      Type: EBtNode.Sequence,
      Children: [
        {
          Type: EBtNode.AlwaysTrue,
          Child: { Type: EBtNode.QuestSucceed },
        },
      ],
    },
  });

  test('Empty Sequence', {
    Type: EBtNode.Start,
    Child: {
      Type: EBtNode.Sequence,
      Children: [],
    },
  });

  test('Not reachable node', {
    Type: EBtNode.Start,
    Child: {
      Type: EBtNode.Sequence,
      Children: [
        { Type: EBtNode.QuestSucceed },
        { Type: EBtNode.QuestFailed },
        { Type: EBtNode.ChildQuest },
      ],
    },
  });
}

main();
