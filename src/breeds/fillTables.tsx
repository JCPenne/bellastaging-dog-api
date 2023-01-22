export function fillTables(payload: object) {
  const breedKeys = Object.keys(payload);
  const numOfBreeds = breedKeys.length;
  const listOne: string[] = [];
  const listTwo: string[] = [];

  const result: Array<string[]> = [listOne, listTwo];

  while (listOne.length < 10) {
    const num = Math.floor(Math.random() * numOfBreeds);
    !listOne.includes(breedKeys[num]) && listOne.push(breedKeys[num]);
  }
  while (listTwo.length < 10) {
    const num = Math.floor(Math.random() * numOfBreeds);
    !listOne.includes(breedKeys[num]) &&
      !listTwo.includes(breedKeys[num]) &&
      listTwo.push(breedKeys[num]);
  }
  return result;
}
