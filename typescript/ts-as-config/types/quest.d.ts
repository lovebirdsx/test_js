declare enum EQuestType {
  /** 主线 */
  Main = 'main',

  /** 支线 */
  Branch = 'branch',
}

declare interface IQuest {
  /** 类型 */
  objType: EObjectType.Quest;

  /** 唯一id */
  uid: string;

  /** 类型 */
  type: EQuestType;

  /** 名称 */
  name: string;

  /** 开启等级 */
  level: number;

  /** 行为树逻辑 */
  tree: {};
}
