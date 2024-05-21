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

type TransactionDetailsLabels =
  Dictionary["workforce"]["staffingTransaction"]["transactionDetails"];

export const getTransferSchema = (
  transactionDetailsLabels?: TransactionDetailsLabels,
) => {
  return getSchema(
    transactionDetailsLabels?.mainPromotionDemotionTransfer,
  ).refine(
    (schema) => {
      return schema.transferType && schema.transferType?.trim().length > 1;
    },
    {
      message: transactionDetailsLabels?.transfer.transferType.requiredMessage,
      path: ["transferType"],
    },
  );
};

export type TransferType = z.infer<ReturnType<typeof getTransferSchema>>;
export type TransferState = MainState;
export type TransferCreate = MainCreate;

export type TransfertCreateAPI = MainCreateAPI & { transfer_type: string };

export const transfertypeToAPI = (
  transferCreate: TransferCreate,
): TransfertCreateAPI => ({
  ...typeToAPI({ ...transferCreate }),
  transfer_type: transferCreate.transferType ?? "",
});

export const transferInitValue: TransferState = {
  ...mainInitValue,
  transferType: "Service",
};
