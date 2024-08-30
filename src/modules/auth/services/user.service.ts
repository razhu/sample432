import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

/** Libs Imports **/
import { EncryptionService } from '../../../libs/security/encryption';

/** Local Imports **/
import { User, Request, Device } from '../../database/entities/mysql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from '../dto';
import { PlatformAccessStatus } from '../enums';
import { GravyBaseService } from '../../general/services/gravy.base.service';

@Injectable()
export class UserService extends GravyBaseService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Request) private requestRepository: Repository<Request>,
    @InjectRepository(Device) private deviceRepository: Repository<Device>,
  ) {
    super();
  }

  async fetchById({ id, select, relations }: { id: number; select?: unknown; relations?: unknown }): Promise<User> {
    return this.userRepository.findOne({
      where: { id: id },
      ...(select ? { select } : {}),
      ...(relations ? { relations } : {}),
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['roles'], // Specify the relation to be loaded
    });
  }

  async create(dto: SignUpDto): Promise<User> {
    const data: Partial<User> = {
      email: dto.email,
      passwordDigest: await EncryptionService.hashPassword(dto.password),
    };

    return this.userRepository.create(data);
  }

  async delete(id: number) {
    await this.userRepository.delete({ id: id });
  }

  async upsertRequest(email: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (user) {
      let allowedAppStatus = user.allowedPlatform;

      if (this.isEnable(allowedAppStatus, PlatformAccessStatus.APP_REQUESTED)) {
        throw new BadRequestException('auth.USER_ACCESS_ALREADY_REQUESTED');
      } else if (this.isEnable(allowedAppStatus, PlatformAccessStatus.APP_APPROVED)) {
        throw new BadRequestException('auth.USER_ACCESS_ALREADY_GRANTED');
      }

      allowedAppStatus |= PlatformAccessStatus.APP_REQUESTED;
      await this.userRepository.update({ email: email }, { allowedPlatform: allowedAppStatus });
    }

    return this.upsertRequestTable(email);
  }

  async grantAccess(email: string) {
    const user = await this.validateUser(email);

    if (this.isEnable(user.allowedPlatform, PlatformAccessStatus.APP_APPROVED)) {
      throw new BadRequestException('auth.USER_ACCESS_ALREADY_GRANTED');
    }

    let newStatus = user.allowedPlatform;
    newStatus &= ~PlatformAccessStatus.APP_REQUESTED;
    newStatus |= PlatformAccessStatus.APP_APPROVED;

    return this.userRepository.update({ email: email }, { allowedPlatform: newStatus });
  }

  async revokeAccess(email: string) {
    const user = await this.validateUser(email);

    if (!this.isEnable(user.allowedPlatform, PlatformAccessStatus.APP_APPROVED)) {
      throw new BadRequestException('auth.USER_ACCESS_NOT_PROVIDED');
    }

    let newStatus = user.allowedPlatform;
    newStatus &= ~PlatformAccessStatus.APP_REQUESTED;
    newStatus &= ~PlatformAccessStatus.APP_APPROVED;

    return this.userRepository.update({ email: email }, { allowedPlatform: newStatus });
  }

  async findUserInDevices(actorId: number, actorType: string): Promise<User> {
    return (
      await this.deviceRepository.findOne({
        where: {
          actor_id: actorId,
          actor_type: actorType,
        },
        relations: {
          user: {
            tenantAdmin: true,
            customerAdmin: true,
            worker: true,
          },
        },
      })
    ).user;
  }

  // private functions
  private isEnable(access: number, flag: PlatformAccessStatus) {
    return (access & flag) !== 0;
  }

  private async upsertRequestTable(email: string): Promise<Request> {
    const data = await this.requestRepository.findOneBy({ email: email });
    if (data) {
      data.updatedAt = new Date();
      return this.requestRepository.save(data);
    } else {
      const newRequest = new Request();
      newRequest.email = email;
      newRequest.createdAt = new Date();
      newRequest.updatedAt = new Date();
      return this.requestRepository.save(newRequest);
    }
  }

  private async validateUser(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundException('auth.USER_NOT_FOUND');
    }
    return user;
  }
}
