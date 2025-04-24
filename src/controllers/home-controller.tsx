import { HomePage } from "#views/pages/home";
import { route } from "#helpers/route";
import { HttpContext } from "../types.js";

export default class HomeController {

    @route({ path: "/", methods: ["GET", "POST"] })
    index({ request, reply }: HttpContext) {
        if (request.method === "POST") {
            return request.body;
        }

        return reply.html(
            <HomePage />
        );
    }

}