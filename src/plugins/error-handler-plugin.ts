import { FastifyPluginAsync, FastifyInstance } from "fastify";
import { FastifyError } from "@fastify/error";

const errorHandlerPlugin: FastifyPluginAsync<ErrorHandlerOptions> = async (
  fastify: FastifyInstance,
  opts: ErrorHandlerOptions = {}
) => {
  const options = {
    exposeStack: false,
    logErrors: true,
    ...opts,
  };
};

export default errorHandlerPlugin;
