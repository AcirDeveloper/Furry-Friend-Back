import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../configs/jwt.config';

export interface MyJwtPayload {
    userId: string;
}

export class JWTUtil {
    static generateToken(payload: MyJwtPayload): string {
        return jwt.sign(payload, jwtConfig.secret, jwtConfig.options);
    }

    static verifyToken(token: string): any{
        return jwt.verify(token, jwtConfig.secret)
    }
}