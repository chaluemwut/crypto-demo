import { Test, TestingModule } from '@nestjs/testing';
import { UserCoin } from './user_coin.entity';
import { DataSource, Repository } from 'typeorm';

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