import { fields, table } from "../connection.js";
import { AbstractModel } from "./AbstractModel.js";
import { formatDateToDay, groupByDate } from "#helpers/utils";
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
        type: () => Collection,
        column: "collectionId"
    }
})
export default class Request extends AbstractModel {
    declare id: number;
    declare method: string | null;
    declare url: string;
    declare headers: object;
    declare body: string | null;
    declare response: { text: string; headers?: object; status?: number };
    declare createdAt: string;
    declare bodyType: string;
    declare requestType: "http" | "event-source";
    declare collectionId: number | null;
    declare getCollection: () => (Collection | null);

    static findAllGroupedByDate() {
        const requests = this.findAll().map(item => ({
            ...item,
            collection: item.getCollection()
        }));

        return groupByDate(requests, "createdAt");
    }
}