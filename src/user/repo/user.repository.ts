import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

// Start User Repository Interface
export interface UserRepository extends Repository<User> {
    this : Repository<User>;
    getUserByEmail(email : string) : Promise<User>;
}
// End User Repository Interface

// Start Implementation Of Custom User Repository
export const CustomUserRepository : Pick<UserRepository, any> = {

    getUserByEmail(this: Repository<User>, email) {
        return this.findOne({ where: { email } });
    }, // custom method in user repository to get user by email

};
// End Implementation Of Custom User Repository