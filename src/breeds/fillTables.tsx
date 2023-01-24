export function fillTables(payload: object) {
  const breedKeys = Object.keys(payload);
  const numOfBreeds = breedKeys.length;
  const listOne: object[] = [];
  const listTwo: object[] = [];
  let counterOne = 0;

  const result: Array<Array<object>> = [listOne, listTwo];

  while (listOne.length < 10) {
    const breed = breedKeys[Math.floor(Math.random() * numOfBreeds)];

    if (!listOne.find(e => Object.values(e)[1] === breed)) {
      listOne.push({ id: counterOne.toString(), breed: breed });
      counterOne += 1;
    }
  }
  while (Object.keys(listTwo).length < 10) {
    const breed = breedKeys[Math.floor(Math.random() * numOfBreeds)];

    if (
      !listOne.find(e => Object.values(e)[1] === breed) &&
      !listTwo.find(e => Object.values(e)[1] === breed)
    ) {
      listTwo.push({ id: counterOne.toString(), breed: breed });
      counterOne += 1;
    }
  }
  return result;
}
