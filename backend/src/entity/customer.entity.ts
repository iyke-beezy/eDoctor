import { Entity } from "typeorm";
import Content from "./abstract.entity";

@Entity()
export default class Customer extends Content { }