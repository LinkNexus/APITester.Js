import { fields, table } from "../connection.js";
import { AbstractModel } from "./AbstractModel.js";

@table("collections")
@fields({
    id: Number,
    name: String,
    description: String,
    createdAt: String,
    updatedAt: String
})
export default class Collection extends AbstractModel {
    declare id: number;
    declare name: string;
    declare description: string;
    declare createdAt: string;
    declare updatedAt: string;
}