import { MongoAbility } from '@casl/ability';
import { SetMetadata } from '@nestjs/common';

interface IPolicyHandler {
  handle(ability: MongoAbility): boolean;
}

type PolicyHandlerCallback = (ability: MongoAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandler[]) => SetMetadata(CHECK_POLICIES_KEY, handlers);
