import {Controller, Get} from 'routing-controllers'

@Controller()
export default class MainController {

    @Get("/test")
    main() {
       return {
         test: '123'
       }
    }

}