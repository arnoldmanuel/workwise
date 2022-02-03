import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Articles } from './entities/articles.entity';

@Injectable()
export class ArticlesService {
    constructor(@InjectRepository(Articles) private articlesRepository: Repository<Articles>) {}

    async findAll(): Promise<Articles[]> {
        const allArticles = await this.articlesRepository.find();
        return allArticles;
    }

    async findOne(id: string): Promise<Articles> {
        const articleById = await this.articlesRepository.findOne(id);
        return articleById;
    }

    async create(createArticleDto: CreateArticleDto): Promise<Articles> {
        const newArticle = await this.articlesRepository.create(createArticleDto);
        await this.articlesRepository.save(newArticle);

        return newArticle;
    }

    // async update(id: string): Promise<Articles> {
    //     const updatedArticle = this.articlesRepository.update();
    // }

    async delete(id: string): Promise<boolean> {
        try {
            await this.articlesRepository.delete(id);
            return true;
        } catch (error) {
            return false;
        }
    }
}
