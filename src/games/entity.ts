import { Entity, PrimaryGeneratedColumn, Column, Unique, Generated, Check } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsJSON, Equals, IsIn } from 'class-validator';

const validColors =  ["red", "blue", "green", "yellow", "magenta"]

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn("increment")
  readonly id: number

  @IsString()
  @Column('text',{ default: "default"})
  name: string

  @IsString()
  @Column('text')
  @IsIn(validColors)
  color: string

  @Column('json', { 
  default: [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o']
  ]})
  board: string[][]

}