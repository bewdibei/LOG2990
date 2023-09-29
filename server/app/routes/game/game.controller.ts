import { HttpStatus } from '@app/http';
import { Game } from '@app/interfaces';
import { GameManager } from '@app/manager/game-manager/game-manager.service';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameManager) {}
    @Post('/send')
    async addGame(@Body() game: Game) {
        return await this.gameService.addGame(game);
    }

    @Get('/all')
    async getAllGames() {
        return await this.gameService.getAllGames();
    }

    @Get('/:name')
    async findOne(@Param('name') name: string) {
        return await this.gameService.getGameByName(name);
    }

    @Put(':name')
    async modify(@Param('name') name: string, @Body() updatedGame: Game) {
        return await this.gameService.updateGameByName(updatedGame, name);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NoContent)
    async remove(@Param('id') id: string) {
        return await this.gameService.deleteGame(id);
    }
}
