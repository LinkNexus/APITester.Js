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
    response: String,
    submissionType: String,
    createdAt: Date,
    updatedAt: Date,
    bodyType: String,
    requestType: String
})
export default class Request extends AbstractModel {
    declare id: number;
    declare method: string;
    declare url: string;
    declare headers: object;
    declare body: string;
    declare response: object;
    declare submissionType: string;
    declare createdAt: Date;
    declare updatdeAt: Date;
    declare bodyType: string;
    declare requestType: string;
}