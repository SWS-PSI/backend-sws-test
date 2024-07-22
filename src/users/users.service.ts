import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(createUserDto: CreateUserDto) {
const saltOrRounds = 10;
const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hash
      },
      select:{
        id: true,
        name: true,
        email: true
      }
    })
  }

  findAll() {
  return this.prisma.user.findMany({
      select:{
        id: true,
        name: true,
        email: true
      }
    })

  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      select:{
        id: true,
        name: true,
        email: true
      },
      where:{
        id: id
      }
    })
  }

findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where:{
        email: email
      }
      
    })
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(updateUserDto.password, saltOrRounds);
    return this.prisma.user.update({
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: hash
      },
      where:{
          id: id
      },
      select:{
        id: true,
        name: true,
        email: true
      }
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({
      select:{
        id: true,
        name: true,
        email: true
      },
      where:{
        id: id
      }
    })
  }
}
