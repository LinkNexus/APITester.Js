import { groupByDate } from "#helpers/utils";
import { fields, table } from "../connection.js";
import { AbstractModel } from "./AbstractModel.js";
import Request from "./Request.js";

@table("collections")
@fields({
    id: Number,
    name: String,
    description: String,
    requests: {
        collectionEntity: () => Request,
        foreignKey: "collectionId"
    }
})
export default class Collection extends AbstractModel {
    declare id: number;
    declare name: string;
    declare description: string;
    declare getRequests: () => Request[];

    getAllRequestsGroupedByDate() {
        const requests = this.getRequests().map(request => ({
            ...request,
            collection: request.getCollection()
        }));

        return groupByDate(requests, "createdAt");
    }
}