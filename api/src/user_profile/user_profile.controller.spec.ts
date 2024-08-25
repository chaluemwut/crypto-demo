import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { DataSource, Repository } from 'typeorm';
import { UserProfile } from './user_profile.entity';
import { UserProfileModule } from './user_profile.module';

describe('API Unit testing UserProfileController', () => {
    let userRepository: Repository<UserProfile>;
    const dataSource = {
        createEntityManager: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Repository<UserProfile>,
                {
                    provide: DataSource,
                    useValue: dataSource
                }
            ]
        }).compile();

        userRepository = module.get<Repository<UserProfile>>(Repository<UserProfile>);
    });

    describe('findByEmail', () => {
        it('should return found user', async () => {
            const user = {
                'email': 'chaluemwut@hotmail.com'
            };
            const findOneSpy = jest
                .spyOn(userRepository, 'findOneBy')
                .mockResolvedValue(user as UserProfile);
            const foundUser = await userRepository.findOneBy(user)
            expect(foundUser).toEqual(user);
            expect(findOneSpy).toHaveBeenCalledWith(user);
        });
    });
});

describe('API Integration GET /users-profile/save and /login', () => {

    let app: INestApplication;
    let repository: Repository<UserProfile>;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                UserProfileModule,
                ConfigModule.forRoot({ isGlobal: true }),
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: 'root',
                    password: 'Rvpooh123',
                    database: 'cryptodb',
                    entities: ['./**/*.entity.ts'],
                    synchronize: false,
                }),
            ],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        repository = module.get("UserProfileRepository");
    });

    afterAll(async () => {
        await repository.query(`DELETE FROM user_profile where email = 'abc@abc.com';`);
        await app.close();
    });

    describe('login test', () => {
        it('should can registration and login', async () => {
            const response = await request(app.getHttpServer())
                .post('/user-profile/save')
                .send({ 'email': 'abc@abc.com', 'password': '1234' })

            const { body } = await request(app.getHttpServer())
                .post('/user-profile/login')
                .send({ 'email': 'abc@abc.com', 'password': '1234' })
                .set('Accept', 'application/json');
            expect({ auth: body['auth'], message: body['message'] }).toEqual(
                { auth: 1, message: 'pass' }
            )
        });
    })

});

