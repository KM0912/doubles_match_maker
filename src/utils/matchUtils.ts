/**
 * フィッシャー・イェーツのアルゴリズムを使用して、配列をシャッフルします。
 *
 * @param array シャッフルする配列
 * @returns シャッフルされた配列
 */

import { Player } from "../types";

export const shufflePlayersArray = (array: Player[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
