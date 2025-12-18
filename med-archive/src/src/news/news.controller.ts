import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { NewsService } from './news.service.js';
import { CreateNewsDto } from './dto/create-news.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  async findAll() {
    return this.newsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createDto: CreateNewsDto, @Req() req: any) {
    const user = req.user;
    const author = user?.username || 'Unknown';
    return this.newsService.create(createDto, author);
  }
}

