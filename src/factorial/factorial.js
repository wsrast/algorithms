const factorial = num => (num <= 1 ? 1 : num * factorial(num - 1));

export default factorial;
