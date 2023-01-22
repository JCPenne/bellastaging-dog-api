export function fillTables(payload: object) {
  const breedKeys = Object.keys(payload);
  const numOfBreeds = breedKeys.length;
  const listOne: object[] = [];
  const listTwo: object[] = [];
  let counterOne = 0;

  const result: Array<Array<object>> = [listOne, listTwo];

  while (listOne.length < 10) {
    const num = Math.floor(Math.random() * numOfBreeds);
    // if (!Object.values(listOne).includes({ breed: breedKeys[num] })) {
    counterOne += 1;
    listOne.push({ id: counterOne.toString(), breed: breedKeys[num] });
    // }
  }
  while (Object.keys(listTwo).length < 10) {
    const num = Math.floor(Math.random() * numOfBreeds);

    if (!Object.values(listTwo).includes({ breed: breedKeys[num] })) {
      counterOne = counterOne + 1;
      listTwo.push({ id: counterOne, breed: breedKeys[num] });
    }
  }
  return result;
}
