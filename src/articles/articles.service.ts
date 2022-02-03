import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Articles } from './entities/articles.entity';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
    constructor(@InjectRepository(Articles) private articlesRepository: Repository<Articles>) {}

    async findAll(): Promise<Articles[]> {
        // Does currently return the content as well
        const allArticles = await this.articlesRepository.createQueryBuilder()
        .select("articles")
        .from(Articles, "articles")
        .getMany();

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

    async update(id: string, updatArticleDto: UpdateArticleDto): Promise<Articles> {
        await this.articlesRepository.update(id, updatArticleDto);
        // Update does not return the entity, there might be a bug with typeorm, which could be fixed. 
        // Did not have enough time to take a look.
        const updatedArticle = await this.articlesRepository.findOne(id);
        return updatedArticle;
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this.articlesRepository.delete(id);
            return true;
        } catch (error) {
            return false;
        }
    }
}
