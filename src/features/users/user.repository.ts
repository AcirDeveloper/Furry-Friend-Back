import { PrismaClient } from "@prisma/client";
import { AuthProvider } from "../../types";
import { RegisterDTO } from "../auth/dtos/auth.dto";

export class UserRepository{

    constructor(private prisma: PrismaClient) {}
    
    async registerUser(data: RegisterDTO){
        return this.prisma.user.create({
            data,
        });
    }
    
    async findUserByEmail(email: string){
        return this.prisma.user.findUnique({
            where: {email},
        });
    }

    async findUserByProviderId(provider: AuthProvider, providerId: string) {
        return this.prisma.user.findFirst({
          where: {
            authProvider: provider,
            authProviderId: providerId,
          },
        });
    }

    async updateUser(id: string, data: RegisterDTO) {
        return this.prisma.user.update({
            where: {id},
            data,
        });
    }
}