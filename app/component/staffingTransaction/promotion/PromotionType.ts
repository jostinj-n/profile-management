import { z } from "zod";
import { Dictionary } from "@/dictionaries/dictionaries";
import {
  getSchema,
  MainCreate,
  MainCreateAPI,
  mainInitValue,
  MainState,
  typeToAPI,
} from "../common/PromoDemoTransType";

type MainFormField =
  Dictionary["workforce"]["staffingTransaction"]["transactionDetails"]["mainPromotionDemotionTransfer"];

export const getPromotionSchema = (promotionFormField?: MainFormField) => {
  return getSchema(promotionFormField);
};

export type PromotionType = z.infer<ReturnType<typeof getPromotionSchema>>;
export type PromotionState = MainState;
export type PromotionCreate = MainCreate;
export type PromotionCreateAPI = MainCreateAPI;

export const promotiontypeToAPI = (
  mainCreate: PromotionCreate
): PromotionCreateAPI => ({
  ...typeToAPI({ ...mainCreate }),
});

export const promotionInitValue: PromotionState = {
  ...mainInitValue,
};
