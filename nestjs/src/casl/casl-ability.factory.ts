import { Injectable } from '@nestjs/common';
import { Role, SharedArticle, SharedUser } from '../common/type';
import { AbilityBuilder, ExtractSubjectType, InferSubjects, createMongoAbility } from '@casl/ability';
import { Action } from '../shared/enum';

type Subjects = InferSubjects<typeof SharedUser | typeof SharedArticle> | 'all';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: SharedUser) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
    if (user.role === Role.Admin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, 'all');
    }

    can(Action.Update, SharedArticle, { authorId: user.userId });
    cannot(Action.Delete, SharedArticle, { isPublished: true });

    return build({
      // https://casl.js.org/v6/en/guide/subject-type-detection
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
