import { fields, table } from "../connection.js";
import { AbstractModel } from "./AbstractModel.js";
import Request from "./Request.js";

@table("collections")
@fields({
    id: Number,
    name: String,
    description: String
})
export default class Collection extends AbstractModel {
    declare id: number;
    declare name: string;
    declare description: string;
}