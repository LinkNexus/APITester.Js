import { request } from "http";
import { fields, table } from "../connection.js";
import { AbstractModel } from "./AbstractModel.js";

@table("requests")
@fields({
    id: Number,
    method: String,
    url: String,
    headers: Object,
    body: String,
    response: Object,
    createdAt: String,
    updatedAt: String,
    bodyType: String,
    requestType: String,
})
export default class Request extends AbstractModel {
    declare id: number;
    declare method: string;
    declare url: string;
    declare headers: object;
    declare body: string;
    declare response: { text: string; headers?: object; status?: number };
    declare createdAt: string;
    declare updatedAt: string;
    declare bodyType: string;
    declare requestType: "http" | "event-source";
}