const linkObj: { [key: string]: string } = {
  $ID: 'MTG_CLASS_NBR',
  $Select: 'SSR_PB_SELECT',
};

export default function linkGen(key: string, idx: number): string {
  return `javascript:submitAction_win0(document.win0,'${linkObj[key]}$${idx}')`;
}
