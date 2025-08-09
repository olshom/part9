import express from 'express';
import calculateBmi from "./bmiCalculator";
import exerciseCalculator from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
      res.json({
        height: height,
        weight: weight,
        bmi:calculateBmi(Number(height), Number(weight))
  });
  } else {
    res.json({
      error: "malformatted parameters"
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if ( !target || !daily_exercises ) {
    return res.status(400).send({ error: 'parameters missing'});
  }
  const exercises = daily_exercises as number[];
  const arrayIsNumbers: boolean = exercises.every((value) => !isNaN(Number(value)));
  if ( isNaN(Number(target))|| !arrayIsNumbers) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }
  const result = exerciseCalculator(exercises, Number(target));
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});