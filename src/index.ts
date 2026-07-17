import { logger } from "./setup/logging";
import { web } from "./setup/web";

const port = process.env.PORT || 8000

web.listen(process.env.PORT || port, () => {
    logger.info(`Server is running on http://localhost:${port} || http://127.0.0.1:${port} 🚀`);
})