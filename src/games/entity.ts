import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsJSON, Contains, Equals } from 'class-validator';

// interface Board {
//   board: string[][]
// }

// interface Color {
//   color : "red" | "blue" | "green" | "yellow" | "magenta"
// }

const colorBank = ["red", "blue", "green", "yellow", "magenta"]
    
function getRandomColor(arrayOfColors : string[]) {
  return arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)]
}

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: string

  @IsString()
  @Column('text', { nullable:true,
  default: getRandomColor(colorBank) })
  color?: string

  @IsJSON()
  @Column('json', { nullable:true,
  default: {board : [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
  ]}})
  board?: {board: string[][]}

}

// const colorBank = ["red", "blue", "green", "yellow", "magenta"]

// const hash = await bcrypt.hash(rawPassword, 10)
// this.password = hash

 // setBoard() {
  //   const defaultBoard = 
  //   return this.board = {board: defaultBoard}
  // }