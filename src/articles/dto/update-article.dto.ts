import { IsDate, IsString } from "class-validator";
import { IsOptional } from '../../utils/is-optional';

export class UpdateArticleDto {
    @IsOptional()
    name: string;
    @IsOptional()
    author: string;
    @IsOptional()
    content: string;
    @IsDate()
    publicityDate: Date;
}
