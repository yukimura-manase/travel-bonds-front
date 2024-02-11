import { proxy } from "valtio";
import { proxyMap, subscribeKey } from "valtio/utils";

export interface favoriteOptionType {
  id: number;
  name: string;
}

export interface favoriteCheckboxStatesType {
  favoriteOptionList: favoriteOptionType[];
}

/**
 * NOTE: favoriteCheckbox
 */
export const favoriteCheckboxStates = proxy<favoriteCheckboxStatesType>({
  /** 好きな場所の傾向 Option リスト */
  favoriteOptionList: [
    { id: 1, name: "遊園地・テーマパーク" },
    { id: 2, name: "動物園" },
    { id: 3, name: "水族館" },
    { id: 4, name: "博物館" },
    { id: 5, name: "美術館" },
    { id: 6, name: "科学館・プラネタリウム" },
    { id: 7, name: "芸術劇場・コンサートホール" },
    { id: 8, name: "映画館" },
    { id: 9, name: "スパ・温泉" },
    { id: 10, name: "歴史的建造物" },
    { id: 11, name: "公園・自然" },
    { id: 12, name: "ロープウェイ・展望台" },
    { id: 13, name: "ビーチ・海岸" },
    { id: 14, name: "山・ハイキングコース" },
    { id: 15, name: "伝統文化体験施設" },
    { id: 16, name: "工場見学・体験" },
    { id: 17, name: "スポーツ施設" },
    { id: 18, name: "ボーリング場" },
    { id: 19, name: "カラオケ" },
    { id: 20, name: "ショッピングモール" },
    { id: 21, name: "ゲームセンター・アミューズメントパーク" },
  ],
});

export const favoriteCheckboxActions = {};
