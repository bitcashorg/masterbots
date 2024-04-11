// Function to generate a random number as a string
export const generateRandomNumber = (length: number): string => {
  const randomNumber = Math.floor(Math.random() * Math.pow(10, length))
  return randomNumber.toString().padStart(length, '0')
}