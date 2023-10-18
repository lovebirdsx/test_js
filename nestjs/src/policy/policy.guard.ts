import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { CHECK_POLICIES_KEY, PolicyHandler } from './policy';
import { MongoAbility } from '@casl/ability';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this._reflector.getAllAndOverride<PolicyHandler[]>(CHECK_POLICIES_KEY, [context.getHandler(), context.getClass()]);

    if (!policyHandlers) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const ability = this._caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) => this.execPolicyHandler(handler, ability));
  }

  private execPolicyHandler(handler: PolicyHandler, ability: MongoAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }

    return handler.handle(ability);
  }
}
