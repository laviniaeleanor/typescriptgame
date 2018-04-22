import { JsonController, Get, Param, Put, Body, NotFoundError, Post, HttpCode, BodyParam } from 'routing-controllers'
import Game from './entity';

//   interface HTTPResponse<DataType> {
//       statusCode: number,
//       data: DataType
//   }

const colorBank = ["red", "blue", "green", "yellow", "magenta"]
    
function getRandomColor(arrayOfColors : string[]) {
  return arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)]
}

@JsonController()
export default class GameController {

    @Post('/games')
    @HttpCode(201)
    createGame(
        @Body() name : Game["name"]
    ) { 
        const game : Partial<Game> = {name: name, color: getRandomColor(colorBank)}
        return Game.create(game).save()
    }

//@Post('/users')
// async createUser(
//     @Body() user: User
//     ) {
//     const {password, ...rest} = user
//     const entity = User.create(rest)
//     await entity.setPassword(password)
//     return entity.save()

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