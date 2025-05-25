import { FastifyInstance } from "fastify";
import { homeController,articleController } from "../controllers";

async function userRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/",
    handler: homeController,
  });

  fastify.route({
    method: "GET",
    url: "/:article([^/.]+)",
    handler: articleController,
  });
}

export default userRouter;
