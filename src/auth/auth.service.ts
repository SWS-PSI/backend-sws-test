import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!await bcrypt.compare(password, user?.password)){
      throw new UnauthorizedException();
    }
    
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: 86400,
        privateKey: this.configService.get("SECRET_KEY")
      }),
  }
}
}