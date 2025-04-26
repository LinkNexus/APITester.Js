import { HomePage } from "#views/pages/home";
import { route } from "#helpers/route";
import { HttpContext } from "../types.js";

export default class HomeController {

    @route({ path: "/", methods: ["GET"] })
    index({ request, reply }: HttpContext) {
        if (request.method === "POST") {
            return request.body;
        }

        return reply.html(
            <HomePage />
        );
    }

    @route({ path: "/", methods: ["POST"] })
    createRequest({ request }: HttpContext) {
        return request.body;
    }

}