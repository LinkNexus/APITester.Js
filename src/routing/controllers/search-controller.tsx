import { HttpContext } from "../../types.js";
import { route } from "../routes.js";
import Request from "#models/Request";
import { SearchResultsPage } from "#views/pages/search-results";
import Collection from "#models/Collection";

export default class SearchController {
    @route({ path: "/search", methods: ["POST"] })
    search({ request, reply }: HttpContext) {
        const { query } = request.body as { query: string };
        const results = [
            ...Request.searchBy({
                url: query,
                body: query
            }, { joinWith: "OR" }),
            ...Collection.searchBy({
                name: query
            })
        ];

        return reply.html(
            <SearchResultsPage searchResults={results} />
        )
    }
}