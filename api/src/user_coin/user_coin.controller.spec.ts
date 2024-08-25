import { Test, TestingModule } from '@nestjs/testing';
import { UserCoin } from './user_coin.entity';
import { DataSource, Repository } from 'typeorm';
import { CanActivate } from '@nestjs/common';
import { UserCoinController } from './user_coin.controller';
import { AuthGuard } from '../auth/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCoinModule } from './user_coin.module';

describe('UserCoinController', () => {
    let userRepository: Repository<UserCoin>;
    const dataSource = {
        createEntityManager: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                Repository<UserCoin>,
                {
                    provide: DataSource,
                    useValue: dataSource
                }
            ]
        }).compile();

        userRepository = module.get<Repository<UserCoin>>(Repository<UserCoin>);
    });

    describe('findOne', () => {
        it('should return found user', async () => {
            const user = { 'user_id': 1 };
            const findOneSpy = jest
                .spyOn(userRepository, 'findOne')
                .mockResolvedValue(user as UserCoin);
            const foundUser = await userRepository.findOne({ where: user })
            expect(foundUser).toEqual(user);
        });
    });
});

// let controller: UserCoinController;
// beforeAll(async () => {
//     const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };

//     const module: TestingModule = await Test.createTestingModule({
//         imports: [
//             UserCoinModule,
//             ConfigModule.forRoot({ isGlobal: true }),
//             TypeOrmModule.forRoot({
//                 type: 'mysql',
//                 host: 'localhost',
//                 port: 3306,
//                 username: 'root',
//                 password: 'Rvpooh123',
//                 database: 'cryptodb',
//                 entities: ['./**/*.entity.ts'],
//                 synchronize: false,
//             }),
//         ],
//         controllers: [UserCoinController],
//         // providers: [{ provide: AuthGuard, useValue: mockGuard }],
//     })
//         .overrideGuard(AuthGuard)
//         .useValue(mockGuard)
//         .compile();

//     controller = module.get<UserCoinController>(UserCoinController);
// });

// describe('test controller', () => {


//     describe('controller test', () => {
//         // it('test hi', (done) => {
//         //     expect(controller.query()).toBe('hi');
//         //     done();
//         // });
//     });
// });
