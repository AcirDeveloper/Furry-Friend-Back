import prisma from "../../configs/database";
import { Prisma } from '@prisma/client';
import { AuthProvider, USER_ROLE } from "../../types";
import { RegisterDTO, RegisterSocialUserDTO } from "../auth/dtos/auth.dto";

export class UserRepository{
    
    async registerUser(data: RegisterDTO){
        return prisma.user.create({
            data: {
                ...data,
                authProvider: (data.authProvider || AuthProvider.EMAIL) as AuthProvider,
                role: (data.role || USER_ROLE.USER) as USER_ROLE,
            },
        });
    }

    async registerSocialUser(data: RegisterSocialUserDTO){
        return prisma.user.create({
            data: {
                ...data,
                authProvider: (data.authProvider || AuthProvider.EMAIL) as AuthProvider,
                role: (data.role || USER_ROLE.USER) as USER_ROLE,
            },
        });
    }
    
    async findUserByEmail(email: string){
        return prisma.user.findUnique({
            where: {email},
        });
    }

    async findUserByProviderId(provider: AuthProvider, providerId: string) {
        return prisma.user.findFirst({
          where: {
            authProvider: provider,
            authProviderId: providerId,
          },
        });
    }

    async updateUser(id: string, data: Prisma.UserUpdateInput) {
        return prisma.user.update({
            where: {id},
            data,
        });
    }
}