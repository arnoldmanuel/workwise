import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

describe('ArticlesController', () => {
  let controller: ArticlesController;

  const mockData = [
    {
      "id": 1,
      "name": "artikel",
      "author": "Manuel Arnold",
      "content": "Das ist der Inhalt",
      "createdDate": "2022-02-03T11:05:13.487Z",
      "publicityDate": "2022-12-01T23:00:00.000Z",
      "sentiment": "neutral"
    },
    {
        "id": 2,
        "name": "Wow!!",
        "author": "Max Mustermann",
        "content": "Das ist der Inhalt",
        "createdDate": "2022-02-03T11:09:48.397Z",
        "publicityDate": "2022-02-03T11:09:48.397Z",
        "sentiment": "neutral"
    },
  ]

  let mockArticlesService = {
    findAll: jest.fn().mockImplementation(() => mockData),
    create: jest.fn().mockImplementation((dto) => {
      dto.sentiment = "neutral";
      return dto;
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers:[ArticlesService],
    }).overrideProvider(ArticlesService)
      .useValue(mockArticlesService)
      .compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all articles', () => {
    expect(controller.findAll()).toEqual(mockData);
  })

  it('should return the created article', () => {
    const dto = {
      name: "Wow!",
      author: "Manuel Arnold",
      content: "This is some content",
      createdDate: new Date("2022-02-03T11:56:13.084Z"),
      publicityDate: new Date("2022-06-25T00:00:00.000Z")
    }
    expect(controller.create(dto)).toEqual({...dto, sentiment: "neutral"});
  })
});
