import { Request, Response } from 'express';
import { errorResponse, successResponse } from "../../shared/utils/response.utils";
import { AuthService } from "./auth.service";
import { LoginDTO, RegisterDTO } from "./dtos/auth.dto";
import { HttpCodes } from '../../shared/utils/httpCodes.utils';
import { UserService } from '../users/user.service';

export class AuthController {
    private authService: AuthService;
    private userService: UserService;

    constructor (){
        this.authService = new AuthService();
        this.userService = new UserService();
    }

    async registerNewUser(req: Request, res: Response){
        try{
            const registerDto: RegisterDTO = req.body;
            const result = await this.userService.register(registerDto);
            successResponse({ 
                data: result, 
                message: "User created successfully", 
                res, 
                status: HttpCodes.SUCCESS_CREATED
            });
        }catch(error){
            console.error(error);
            errorResponse({ message: "Failed to create user", res, status: HttpCodes.BAD_REQUEST });
        }
    }

    async login(req: Request, res: Response){
        try{
            const loginDto: LoginDTO = req.body;
            const result = await this.authService.login(loginDto);
            successResponse({
                data   : result,
                message: "Login successfully",
                res,
                status : HttpCodes.SUCCESS_CREATED
              });
        }catch(error){
            console.error(error);
            errorResponse({ message: "Error login user", res, status: HttpCodes.BAD_REQUEST });
        }
    }
}