export const getRandomNumbers = (num: number): number[] => {
  const randomArray = new Set<number>();

  while (randomArray.size < 2) {
    const randomNumber = Math.floor(Math.random() * num);
    randomArray.add(randomNumber);
  }
  return Array.from(randomArray);
};
