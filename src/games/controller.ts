import { JsonController, Get, Param, Put, Body, NotFoundError, Post, HttpCode, BodyParam } from 'routing-controllers'
import Game from './entity';
import { STATUS_CODES } from 'http';

//   interface HTTPResponse<DataType> {
//       statusCode: number,
//       data: DataType
//   }


@JsonController()
export default class GameController {

    @Post('/games')
    @HttpCode(201)
    createGame(
        @Body() game: Game
    ) {
        return game.save()
    }

    @Get('/games')
    async allGames() {
    const games = await Game.find()
    return  {status: HttpCode,
        data: {games}}
    }

    @Put('/games/:id')
    async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>
    ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')
    
    console.log(`${game} was replaced with ${update}`)
    return Game.merge(game, update).save()
    }

    
}


 // @Get('/games/:id')
    // getGame(
    //   @Param('id') id: number
    // ) {
    //   return Game.findOne(id)
    // }