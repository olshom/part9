
interface ValueForBMI {
  height: number;
  weight: number;
}
const parseBmiArguments = (args: string[]):ValueForBMI => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight:number) => {
        const bmi = weight / (height * height / 10000);
        if (bmi < 16) {
            return 'Underweight (Severe thinness)';
        } else if (bmi < 17) {
            return 'Underweight (Moderate thinness)';
        } else if (bmi < 18.5) {
            return 'Underweight (Mild thinness)';
        } else if (bmi < 25) {
            return 'Normal range';
        } else if (bmi < 30) {
            return 'Overweight (Pre-obese)';
        } else if (bmi < 35) {
            return 'Obese (Class I)';
        } else if (bmi < 40) {
            return 'Obese (Class II)';
        } else return 'Obese (Class III)';
};

if (require.main === module) {
    try {
        const {height, weight} = parseBmiArguments(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += 'Error' + error.message;
        }
        console.log(errorMessage);
    }
}

export default calculateBmi;
