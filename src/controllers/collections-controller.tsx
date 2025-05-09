import { route } from "../routing/routes.js";
import { HttpContext } from "../types.js";
import { CollectionsPage } from "#views/pages/collections/collections";
import Collection from "#models/Collection";
import { CollectionPage } from "#views/pages/collections/collection";

export default class CollectionsController {
    @route({ path: "/collections", methods: ["GET"] })
    listCollections({ reply }: HttpContext) {
        const collections = Collection.findAll();
        return reply.html(
            <CollectionsPage collections={collections} />
        )
    }

    @route({ path: "/collections", methods: ["POST"] })
    createCollection({ request, reply }: HttpContext) {
        try {
            return Collection.save(request.body);
        } catch (e) {
            return reply.status(403).send(e);
        }
    }

    @route({ path: "/collections/:id", methods: ["DELETE"] })
    deleteCollection({ request, reply }: HttpContext) {
        const { id } = request.params as { id: string };
        Collection.delete(id);
        return reply.status(204).send("Collections deleted");
    }

    @route({ path: "/collections", methods: ["DELETE"] })
    deleteCollections({ request, reply }: HttpContext) {
        for (const id of request.body as string[]) {
            Collection.delete(id);
        }

        return reply.status(204).send("Collections deleted");
    }

    @route({ path: "/collections/:id", methods: ["GET"] })
    displayCollection({ request, reply }: HttpContext) {
        const { id } = request.params as { id: string };
        const collection = Collection.find(id);
        if (!collection) {
            return reply.status(404).send("Collection not found");
        }

        return reply.html(
            <CollectionPage collection={collection} />
        );
    }
}