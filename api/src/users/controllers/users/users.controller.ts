import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    RawBodyRequest,
    Req,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    getUsers() {
        return 'Hello world'
        // return this.userService.getUsers();
    }

    @Get('id/:id')
    findUsersById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findUsersById(id);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUsers(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Post('test-param')
    testParam(@Body() createUserDto: CreateUserDto){
        console.log('body ', createUserDto)
        return {"abcd": 1}
    }
}