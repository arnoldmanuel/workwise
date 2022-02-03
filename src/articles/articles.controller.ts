import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { Articles } from './entities/articles.entity';

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
    create(@Body() createArticleDto: CreateArticleDto): Promise<Articles> {
        return this.articlesService.create(createArticleDto);
    }

    // @Put(':id')
    // update(@Param('id') id: string): Promise<Articles> {
    //     return this.articlesService.update(id);
    // }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<boolean> {
        return this.articlesService.delete(id);
    }
}
