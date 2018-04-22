import { JsonController, Get, Param, Put, Body, NotFoundError, Post, HttpCode, BodyParam, BadRequestError } from 'routing-controllers'
import Game from './entity';
import { validate } from 'class-validator'

const colorBank = ["red", "blue", "green", "yellow", "magenta"]
    
function getRandomColor(arrayOfColors : string[]) {
  return arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)]
} 

const moves = (board1: string[][], board2: string[][]) => 
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

    @Get('/games/:id')
    async getGame(
        @Param('id') id: number
    ) {
      return Game.findOne(id)
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
        @Body() update : {name: string, color: string, board: string[][]}
        ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError('Cannot find game')

        if (update.board) {
            if (moves(game.board, update.board) > 1 ) throw new BadRequestError("Invalid move")
        } 
        console.log(game.board)
        console.log(update.name)
        console.log(update.color)
        console.log(update.board)
        
        const updatedGame = Game.merge(game, update)

        const validGame = validate(updatedGame).then(errors => {
            if (errors.length > 0) {
                throw new BadRequestError
            } else {
                console.log("validation succeed");
                return updatedGame.save()
            }
        })
        return validGame;
        
        
        
        }
    
    
}