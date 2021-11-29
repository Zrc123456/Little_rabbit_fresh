import { requestWithoutToken } from "@/utils/request";

export function getGoodsDetailById(id) {
  return requestWithoutToken("/goods", "get", { id });
}
