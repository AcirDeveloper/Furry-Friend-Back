import { Prisma } from "@prisma/client";
import { BcryptUtil } from "../../shared/utils/bcrypt.utils";
import { JWTUtil } from "../../shared/utils/jwt.util";
import { UserRepository } from "../users/user.repository";
import { LoginDTO } from "./dtos/auth.dto";

export class AuthService{
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    async login(loginDto: LoginDTO){
        const user = await this.userRepository.findUserByEmail(loginDto.email);
        if(!user){
            throw new Error('Credenciales inválidas');
        }
        const isValidPassword = await BcryptUtil.compare(loginDto.password,user.password!);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }
        const token = JWTUtil.generateToken({userId: user.id});
        return {
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
            },
        };
    }
}