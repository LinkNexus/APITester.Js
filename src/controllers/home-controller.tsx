import { HomePage } from "#views/pages/home";
import { route } from "../helpers/route.js";
import { HttpContext } from "../types.js";

@route({ path: "/home" })
export default class HomeController {
    @route({ path: "", methods: ["GET", "POST"] })
    index({ request, reply }: HttpContext) {
        if (request.method === "POST") {
            return request.body;
        }

        return reply.html(
            <HomePage />
        );
    }
}