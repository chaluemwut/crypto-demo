import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserProfile } from "src/typeorm/user_profile.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>
    ) { }

    createUser(data: {}) {
        return this.userProfileRepository.save(data)
    }

    findByUsername(username: string) {
        return this.userProfileRepository.findOneBy({ username: username })
    }
}