import * as bcrypt from 'bcrypt';

const saltRounds = 12;

export class BcryptUtil {
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(saltRounds);
        return  bcrypt.hash(password, salt);
    }
    
    static async compare(password: string, hash: string): Promise<boolean>{
        return bcrypt.compareSync(password,hash)
    }
}