const linkObj: { [key: string]: string } = {
  $ID: 'MTG_CLASS_NBR',
  $Select: 'SSR_PB_SELECT',
};
/**
 * Generates a link for the given key and index
 * @param key The key to use for the link
 * @param idx The index to use for the link
 * @returns The link
 */
export default function linkGen(key: string, idx: number): string {
  return `javascript:submitAction_win0(document.win0,'${linkObj[key]}$${idx}')`;
}
