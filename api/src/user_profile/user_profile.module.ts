import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfile } from "src/typeorm/user_profile.entity";
import { UserProfileController } from "./user_profile.controller";
import { UserProfileService } from "./user_profile.service";


@Module({
    imports: [TypeOrmModule.forFeature([UserProfile])],
    controllers: [UserProfileController],
    providers: [UserProfileService]
  })
  export class UserProfileModule {}