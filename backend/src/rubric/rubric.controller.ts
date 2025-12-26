import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RubricService, Rubric } from './rubric.service';

@ApiTags('rubrics')
@Controller('rubrics')
export class RubricController {
  constructor(private readonly rubricService: RubricService) {}

  @Get()
  @ApiOperation({ summary: 'Tüm rubrikleri getir' })
  @ApiResponse({ status: 200, description: 'Rubrikler başarıyla getirildi' })
  getAllRubrics(): Rubric[] {
    return this.rubricService.getAllRubrics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Belirli bir rubriği getir' })
  @ApiResponse({ status: 200, description: 'Rubrik başarıyla getirildi' })
  @ApiResponse({ status: 404, description: 'Rubrik bulunamadı' })
  getRubricById(@Param('id') id: string): Rubric | null {
    return this.rubricService.getRubricById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Yeni rubrik oluştur' })
  @ApiResponse({ status: 201, description: 'Rubrik başarıyla oluşturuldu' })
  createRubric(@Body() rubric: Omit<Rubric, 'id' | 'createdAt' | 'updatedAt'>): Rubric {
    return this.rubricService.createRubric(rubric);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Rubrik güncelle' })
  @ApiResponse({ status: 200, description: 'Rubrik başarıyla güncellendi' })
  @ApiResponse({ status: 404, description: 'Rubrik bulunamadı' })
  updateRubric(@Param('id') id: string, @Body() rubric: Partial<Rubric>): Rubric | null {
    return this.rubricService.updateRubric(id, rubric);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Rubrik sil' })
  @ApiResponse({ status: 204, description: 'Rubrik başarıyla silindi' })
  @ApiResponse({ status: 404, description: 'Rubrik bulunamadı' })
  deleteRubric(@Param('id') id: string): void {
    this.rubricService.deleteRubric(id);
  }
}


