import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Articles } from './entities/articles.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ArticlesService {
    constructor(@InjectRepository(Articles) private articlesRepository: Repository<Articles>,
                                            private httpService: HttpService) {}
    
    private readonly url = "https://sentim-api.herokuapp.com/api/v1/";

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

        const {result: { type }} = await lastValueFrom(
            this.httpService.post(this.url, {"text": JSON.stringify(articleById.content)}, {headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json" 
            },}).pipe(
              map(res => res.data)
            )
          );

        return articleById;
    }

    async create(createArticleDto: CreateArticleDto): Promise<Articles> {
        const newArticle = await this.articlesRepository.create(createArticleDto);
        const {result: { type }} = await lastValueFrom(
            this.httpService.post(this.url, {"text": JSON.stringify(newArticle.content)}, {headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json" 
            },}).pipe(
              map(res => res.data)
            )
          );

        newArticle.sentiment = type;

        await this.articlesRepository.save(newArticle);

        return newArticle;
    }

    async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Articles> {
        const currentArticle = await this.articlesRepository.findOne(id);
        if(currentArticle.content !== updateArticleDto.content) {
            const {result: { type }} = await lastValueFrom(
                this.httpService.post(this.url, {"text": JSON.stringify(updateArticleDto.content)}, {headers: {
                    "Accept": "application/json", 
                    "Content-Type": "application/json" 
                },}).pipe(
                  map(res => res.data)
                )
              );

            await this.articlesRepository.update(id, {sentiment: type, ...updateArticleDto});
        } else {
            // Update does not return the entity, there might be a bug with typeorm, which could be fixed. 
            // Did not have enough time to take a look.
            await this.articlesRepository.update(id, updateArticleDto);
        }
        
        return await this.articlesRepository.findOne(id);
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
