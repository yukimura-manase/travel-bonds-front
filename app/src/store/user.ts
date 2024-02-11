import { proxy } from "valtio";
import { proxyMap, subscribeKey } from "valtio/utils";

export interface userCurrentPotisionType {
  /** 現在地の住所・文字列 */
  address: string;
  /** 現在地の緯度 */
  latitude: number;
  /** 現在地の経度 */
  longitude: number;
}

export interface userStatesType {
  /** User の好きな場所の傾向リスト */
  favoriteList: string[];
  /** User の現在地データ */
  currentPosition: userCurrentPotisionType;
}

/**
 * NOTE: User States
 * - User の好きな場所の傾向リスト
 * - User の現在地データ
 * - などを管理する
 */
export const userStates = proxy<userStatesType>({
  /** User の好きな場所の傾向リスト */
  favoriteList: [],

  /** User の現在地データ */
  currentPosition: {
    address: "",
    latitude: 35.6926506,
    longitude: 139.8424711,
  } as userCurrentPotisionType,
});

export interface gpsErrorType {
  code: number;
}

export const userActions = {
  /**
   * NOTE: User の現在位置の情報を取得する
   * @returns Promise
   */
  userGeoLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
};
