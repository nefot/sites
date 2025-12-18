import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from '../../entity/news.entity.js';
import { CreateNewsDto } from './dto/create-news.dto.js';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async create(createDto: CreateNewsDto, author: string): Promise<News> {
    const news = this.newsRepository.create({
      title: createDto.title,
      description: createDto.description,
      imageUrl: createDto.imageUrl,
      tags: createDto.tags || [],
      author,
      date: [new Date().getDate(), new Date().getMonth() + 1, new Date().getFullYear()],
    });

    return await this.newsRepository.save(news);
  }

  async findAll(): Promise<News[]> {
    return this.newsRepository.find({ order: { createdAt: 'DESC' } });
  }
}

