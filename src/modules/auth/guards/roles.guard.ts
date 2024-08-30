// roles.guard.ts
import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.auth.guard';
import { GravyRequest, GravyWorkUserType } from '../../general/types';

const RolesGuard = (userTypes: GravyWorkUserType[] = [GravyWorkUserType.WORKER]): Type<CanActivate> => {
  class RolesGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest<GravyRequest>();
      return userTypes.includes(request.user.getUserType());
    }
  }

  return mixin(RolesGuardMixin);
};

export default RolesGuard;
