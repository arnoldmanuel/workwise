import { IsString } from "class-validator";
import { IsOnlyDate } from '../../utils/is-only-date';

export class CreateArticleDto {
    @IsString()
    name: string;
    @IsString()
    author: string;
    @IsString()
    content: string;
    @IsOnlyDate()
    publicityDate: Date;
}
