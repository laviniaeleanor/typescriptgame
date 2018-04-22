import { JsonController, Get, Param, Put, Body, NotFoundError, Post, HttpCode, BodyParam, Patch } from 'routing-controllers'
import Game from './entity';

const colorBank = ["red", "blue", "green", "yellow", "magenta"]
    
function getRandomColor(arrayOfColors : string[]) {
  return arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)]
} 

const moves = (board1, board2) => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

@JsonController()
export default class GameController {

    @Get('/games')
    async allGames() {
    const games = await Game.find()
    return  {status: HttpCode,
        data: {games}}
    }

    @Post('/games')
    @HttpCode(201)
    createGame(
        @Body() name : string
    ) { 
        const game : Partial<Game> = {name: Object.values(name).toString(), color: getRandomColor(colorBank)}
        return Game.create(game).save()
    }

    @Put('/games/:id')
    async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>
    ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')
    
    const field = Object.keys(update)
    console.log(field)

    // if (field[0] === 'id')
    // return console.error('Id cannot be modified');
    
    // if (field[0] === 'name')
    return Game.merge(game, update).save()
    
    // if (field[0] === 'color') {
    // if (colorBank.indexOf) return console.error('Invalid color')
    // return Game.merge(game, update).save()}
    
    // if (field[0] === 'board')
    // if (moves(game.board, update.board)) 
    // return Game.merge(game, update).save()
    }

    
}


 // @Get('/games/:id')
    // getGame(
    //   @Param('id') id: number
    // ) {
    //   return Game.findOne(id)
    // }