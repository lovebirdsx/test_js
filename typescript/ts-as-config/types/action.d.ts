declare enum EAction {
  ChangeEntityState = 'changeEntityState',
  SetEntityVisibility = 'setEntityVisibility',
}

declare interface IActionBase<T extends EAction> {
  /** 类型 */
  type: T;
}

declare interface IChangeEntityStateAction extends IActionBase<EAction.ChangeEntityState> {
  /** 实体id */
  entityId: string;

  /** 状态 */
  state: string;
}

declare interface ISetEntityVisibilityAction extends IActionBase<EAction.SetEntityVisibility> {
  /** 实体id */
  entityId: string;

  /** 是否可见 */
  visible: boolean;
}

declare type TAction = IChangeEntityStateAction | ISetEntityVisibilityAction;
