import { Entity, PrimaryGeneratedColumn, Column, Unique, Generated, Check } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsJSON, Contains, Equals } from 'class-validator';

// interface Board {
//   board: string[][]
// }

// const colorBank = ["red", "blue", "green", "yellow", "magenta"]

// export interface Color {
//   color : string | "red" | "blue" | "green" | "yellow" | "magenta"
// }

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn("increment")
  readonly id: number

  @IsString()
  @Column('text',{ default: "default"})
  name: string

  @IsString()
  @Column('text')
  @Equals('red' || 'blue' || 'green' || 'yellow' || 'magenta')
  color: string

  @IsJSON()
  @Column('json', { nullable:true,
  default: {board : [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
  ]}})
  board: {board: string[][]}

}