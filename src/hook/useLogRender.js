import { useEffect } from "react";
import { logger } from "../utils/logger";

export const useLogRender = (...name) => {
  logger.render("- render  -", ...name);
  useEffect(() => {
    logger.render("- mound   -", ...name);
    return () => {
      logger.render("- unmound -", ...name);
    };
  });
};
