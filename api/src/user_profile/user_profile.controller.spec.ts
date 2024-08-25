import { Test, TestingModule } from '@nestjs/testing';
import { UserProfile } from './user_profile.entity';
import { DataSource, Repository } from 'typeorm';

describe('UserProfileController', () => {
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