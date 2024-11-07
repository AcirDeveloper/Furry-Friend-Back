export interface RegisterDTO {
    email: string;
    password: string;
    name: string;
    phoneNumber?: string;
}
  
export interface LoginDTO {
    email: string;
    password: string;
}
  
export interface SocialLoginDTO {
    token: string;
    provider: 'GOOGLE' | 'FACEBOOK' | 'APPLE';
}