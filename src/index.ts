import 'reflect-metadata'
import {createKoaServer} from 'routing-controllers'
import setupDb from './db'
import GameController from './games/controller';

const app = createKoaServer({
    // cors: true,
    controllers: [ GameController ]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Port 4000 is open ~ We are ready to receive your commands'))
  )
  .catch(err => console.error(err))