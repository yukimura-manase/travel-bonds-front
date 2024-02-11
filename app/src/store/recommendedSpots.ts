import { proxy } from "valtio";
import { proxyMap, subscribeKey } from "valtio/utils";

export interface recommendedSpotType {
  name: string;
  description: string;
  address: string;
  recommended_points: string;
  latitude: number;
  longitude: number;
}

export interface recommendedSpotsStatesType {
  recommendedSpotList: recommendedSpotType[];
}

/**
 * NOTE: recommendedSpotList States
 * - recommendedSpotList: AI コンシェルジュからの おすすめスポット・リスト
 * - などを管理する
 */
export const recommendedSpotsStates = proxy<recommendedSpotsStatesType>({
  /** AI コンシェルジュからの おすすめスポット・一覧 */
  recommendedSpotList: [],
});

export const recommendedSpotsActions = {};
