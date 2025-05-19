function sumArray(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            sum += sumArray(arr[i]);
        } else {
            sum += arr[i];
        }
    }
    return sum;
}


const input = process.argv[2];

const arr = JSON.parse(input);
const res = sumArray(arr);

console.log("Сума чисел:", res);
