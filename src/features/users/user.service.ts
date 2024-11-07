import { Prisma } from "@prisma/client";
import { RegisterDTO } from "../auth/dtos/auth.dto";
import { UserRepository } from "../users/user.repository";

export class UserService{
    private userRepository: UserRepository;
    
    constructor(){
        this.userRepository = new UserRepository(Prisma);
    }

    async register(registerUserDto: RegisterDTO){
        const existUser = await this.userRepository.findUserByEmail(registerUserDto.email);
        if(existUser) {
            throw new HttpException(401, 'El correo ya ha sido vinculado a otra cuenta.');
        }
        const newUser = await this.userRepository.registerUser(registerUserDto);

        return { newUser };
    }
}