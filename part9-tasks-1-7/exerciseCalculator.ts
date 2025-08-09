interface ValueForExCalculation{
    target: number,
    hours: number[]
}

const parseExArguments = (args: string[]):ValueForExCalculation => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const argsNumbers: number[] = [];
    args.slice(2).forEach(e=> {
        if(isNaN(Number(e))) {
            throw new Error('Provided values were not numbers!');
        } else {
            argsNumbers.push(Number(e));
        }
    });

    return {
        target:argsNumbers[0],
        hours: argsNumbers.slice(1)
    };
};

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (args:number[], target: number):Result =>{
    const summa = args.reduce((result, current)=>result+current, 0);
    const average = summa/args.length;
    let rating = 1;
    let ratingDescription = '';
    if (target > average*2 ) {
        rating = 1;
        ratingDescription = 'You are on the right way! Push harder!';
    } else if (average>target) {
        rating = 3;
        ratingDescription = 'Nice job! You accomplished your goal!';
    } else {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    return {
        periodLength: args.length,
        trainingDays: args.filter(e => e>0).length,
        success: summa >= args.length*target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};
if (require.main === module) {
    try {
        const {target, hours} = parseExArguments(process.argv);
        console.log(calculateExercises(hours, target));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}

export default calculateExercises;