const getRandomNumbers = () => {
    const randomNumbers = new Set();
    while (randomNumbers.size < 4) {
        const num = Math.floor(Math.random() * 6); 
        randomNumbers.add(num);
    }
    return Array.from(randomNumbers);
}



export default getRandomNumbers;