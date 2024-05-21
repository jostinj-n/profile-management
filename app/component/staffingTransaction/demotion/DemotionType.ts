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

export const getDemotionSchema = (DemotionFormField?: MainFormField) => {
  return getSchema(DemotionFormField);
};

export type DemotionType = z.infer<ReturnType<typeof getDemotionSchema>>;
export type DemotionState = MainState;
export type DemotionCreate = MainCreate;
export type DemotionCreateAPI = MainCreateAPI;

export const demotiontypeToAPI = (
  mainCreate: DemotionCreate
): DemotionCreateAPI => ({
  ...typeToAPI({ ...mainCreate }),
});

export const demotionInitValue: DemotionState = {
  ...mainInitValue,
};
