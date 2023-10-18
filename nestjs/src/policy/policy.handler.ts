import { MongoAbility } from '@casl/ability';
import { SharedArticle } from '../common/type';
import { Action } from '../shared/enum';

export function readArticle(ability: MongoAbility) {
  return ability.can(Action.Read, SharedArticle);
}

export function createArticle(ability: MongoAbility) {
  return ability.can(Action.Create, SharedArticle);
}
