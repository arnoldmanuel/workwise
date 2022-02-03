import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { Articles } from './entities/articles.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ValidationPipe } from '../validation.pipe';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Get()
    findAll(): Promise<Articles[]> {
        return this.articlesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Articles> {
        return this.articlesService.findOne(id);
    }

    @Post()
    create(@Body(new ValidationPipe()) createArticleDto: CreateArticleDto): Promise<Articles> {
        return this.articlesService.create(createArticleDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body(new ValidationPipe()) updateArticleDto: UpdateArticleDto): Promise<Articles> {
        return this.articlesService.update(id, updateArticleDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<boolean> {
        return this.articlesService.delete(id);
    }
}
