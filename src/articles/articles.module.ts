import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Articles } from './entities/articles.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Articles])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
