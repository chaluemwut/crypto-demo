import { Body, Controller, Get, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserProfile } from "src/typeorm/user_profile.entity";
import { UserProfileService } from "./user_profile.service";
import { ConfigService } from "@nestjs/config";


@Controller('user-profile')
export class UserProfileController {
    constructor(
        private userProfileService: UserProfileService,
        private configService: ConfigService
    ) { }

    @Get()
    index() {
        return "Hello"
    }

    @Post('login')
    async login(@Body() body) {
        try {
            const userProfile = await this.userProfileService.findByEmail(body['email'])
            if (userProfile == null) {
                return { 'auth': -1 }
            }
            var bcrypt = require('bcryptjs');
            var result = bcrypt.compareSync(body.password, userProfile.password)
            const jwt = require('jsonwebtoken')
            if (result) {
                const token = jwt.sign({ userId: userProfile.user_id }, this.configService.get('JWT_KEY'), { expiresIn: "200d" })
                return { 'auth': 1, message: 'pass', 'token': token }
            } else {
                return { 'auth': 0 }
            }
        } catch {
            return { 'auth': 0 }
        }
    }


    @Post('save')
    createUserProfile(@Body() data) {
        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(data.password, salt);
        data.password = hashPassword
        return this.userProfileService.createUser(data)
    }
}