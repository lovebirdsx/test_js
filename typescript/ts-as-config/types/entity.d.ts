declare interface IBaseInfoComponent {
  /** aoi等级 */
  aoiLevel: number;
}

declare interface IEntityStateComponent {
  /** 状态 */
  state: string;

  /** 状态变化时触发的行为列表 */
  onStateChange: {
    state: string;
    actions: TAction[];
  }[];
}

declare interface IEntity {
  /** 类型 */
  objType: EObjectType.Entity;

  /** 唯一id */
  uid: string;

  /** 名称 */
  name: string;

  /** 组件列表 */
  components: {
    /** 基础信息组件 */
    baseInfoComponent: IBaseInfoComponent;

    /** 实体状态组件 */
    entityStateComponent?: IEntityStateComponent;
  };
}
