import Singular from "./singular";
import Single from "./single";
import Page from "./page";

const templates = {
  singular: Singular,
  single: Single,
  page: Page,
} as const;

export default templates;


