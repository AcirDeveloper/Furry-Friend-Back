import { AuthProvider, USER_ROLE } from '@prisma/client';

export interface RegisterDTO {
    email: string;
    password: string;
    name: string;
    phoneNumber?: string;
    authProvider?: AuthProvider;
    role?: USER_ROLE;
    authProviderId?: string;
}

export interface RegisterSocialUserDTO {
    email: string;
    name: string;
    authProvider?: AuthProvider;
    role?: USER_ROLE;
    authProviderId?: string;
}
  
export interface LoginDTO {
    email: string;
    password: string;
}
  
export interface SocialLoginDTO {
    token: string;
    provider: 'GOOGLE' | 'FACEBOOK' | 'APPLE';
}