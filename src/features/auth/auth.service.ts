import { Prisma } from "@prisma/client";
import { BcryptUtil } from "../../shared/utils/bcrypt.utils";
import { JWTUtil } from "../../shared/utils/jwt.util";
import { UserRepository } from "../users/user.repository";
import { LoginDTO, SocialLoginDTO } from "./dtos/auth.dto";
import { AuthRepository } from "./auth.repository";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../../configs/envs";
import { AuthProvider } from "../../types";

interface SocialUser {
    id: string;
    email: string;
    name: string;
  }

export class AuthService{
    private userRepository: UserRepository;
    private authRepository: AuthRepository;
    private googleClient: OAuth2Client;

    constructor(){
        this.userRepository = new UserRepository();
        this.authRepository = new AuthRepository();
        this.googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
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

    async socialLogin(data: SocialLoginDTO) {
        let socialUser: SocialUser | null = null;

        switch (data.provider) {
        case "GOOGLE":
            socialUser = await this.verifyGoogleToken(data.token);
            break;
        case 'FACEBOOK':
            //socialUser = await this.verifyFacebookToken(data.token);
            break;
        case 'APPLE':
            //socialUser = await this.verifyAppleToken(data.token);
            break;
        default:
            throw new Error('Invalid provider');
        }

        if (!socialUser || !socialUser.id || !socialUser.email) {
            throw new Error('Invalid social user data');
        }

        let user = await this.userRepository.findUserByProviderId(
            data.provider as AuthProvider,
            socialUser.id
        );

        if (!user) {
            user = await this.userRepository.registerSocialUser({
                email: socialUser.email,
                name: socialUser.name,
                authProvider: data.provider as AuthProvider,
                authProviderId: socialUser.id,
            });
        }

        const token = JWTUtil.generateToken({ userId: user.id });

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }

    private async verifyGoogleToken(token: string): Promise<SocialUser> {
        try {
        const ticket = await this.googleClient.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log("Payload:", payload)
        
        if (!payload) {
            throw new Error('No payload received from Google');
        }

        if (!payload.sub) {
            throw new Error('Google user ID is missing');
        }

        if (!payload.email) {
            throw new Error('Google user email is missing');
        }

        const userName = payload.name || payload.email.split('@')[0];

        return {
            id: payload?.sub,
            email: payload?.email,
            name: payload?.name || userName,
        };
        } catch (error) {
            throw new Error('Invalid Google token');
        }
    }
}