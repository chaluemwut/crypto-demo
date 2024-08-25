import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserProfile } from "./user_profile.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>
    ) { }

    createUser(data: {}) {
        return this.userProfileRepository.save(data)
    }

    findByEmail(email: string) {
        return this.userProfileRepository.findOneBy({ email: email })
    }
}