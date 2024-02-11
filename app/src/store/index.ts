import { proxy } from "valtio";
import { proxyMap, subscribeKey } from "valtio/utils";

export interface userStatesType {
  /** Loading・制御フラグ */
  isLoading: boolean;
  /** 提案の実行・制御フラグ */
  isExcute: boolean;
}

/**
 * NOTE: App Base States
 */
export const appBaseStates = proxy({
  /** Loading・制御フラグ */
  isLoading: false,

  /** 提案の実行・制御フラグ */
  isExcute: false,
});

export const appBaseActions = {};
