import { fields, table } from "../connection.js";
import { AbstractModel } from "./AbstractModel.js";
import { formatDateToDay } from "#helpers/utils";
import Collection from "./Collection.js";

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
    collectionId: Number,
    collection: {
        type: Collection,
        column: "collectionId"
    }
})
export default class Request extends AbstractModel {
    declare id: number;
    declare method: string;
    declare url: string;
    declare headers: object;
    declare body: string;
    declare response: { text: string; headers?: object; status?: number };
    declare createdAt: string;
    declare bodyType: string;
    declare requestType: "http" | "event-source";
    declare collectionId: number;

    static findAllGroupedByDate() {
        return this.findAll().reduce((groups, item) => {
            const dateKey = formatDateToDay(new Date(item.createdAt));
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }
            groups[dateKey].push(item);
            return groups;
        }, {} as Record<string, typeof Request[]>);
    }
}