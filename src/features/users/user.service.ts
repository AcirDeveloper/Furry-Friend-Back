import { Prisma } from "@prisma/client";
import { RegisterDTO } from "../auth/dtos/auth.dto";
import { UserRepository } from "../users/user.repository";
import { BcryptUtil } from "../../shared/utils/bcrypt.utils";

export class UserService{
    private userRepository: UserRepository;
    
    constructor(){
        this.userRepository = new UserRepository();
    }

    async register(registerUserDto: RegisterDTO){
        const existUser = await this.userRepository.findUserByEmail(registerUserDto.email);
        if(existUser) {
            throw new Error('El correo ya ha sido vinculado a otra cuenta.');
        }
        const hashedPassword = await BcryptUtil.hashPassword(registerUserDto.password);
        const newUser = await this.userRepository.registerUser({
            ...registerUserDto,
            password: hashedPassword
        });

        return { newUser };
    }
}