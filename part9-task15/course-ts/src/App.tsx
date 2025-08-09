
interface HeaderProps {
    name: string
}

const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>
}

interface ContentProps {
    courseParts: CoursePart[]
}

const Content = (props: ContentProps ) => {
    return props.courseParts.map((obj: CoursePart)=>{
        console.log(obj.name)
        return <Part obj={obj}/>
    })
}

interface PartProps {
    obj: CoursePart
}
const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

const Part = (props: PartProps) => {
    let remainPart = null
    switch (props.obj.kind) {
        case "basic":
               remainPart = <p>{props.obj.description}</p>;
        break;
        case "group":
            remainPart = <p>project exercises {props.obj.groupProjectCount}</p>;
            break;
        case "background":
            remainPart = <><p>{props.obj.description}</p><p>{props.obj.backgroundMaterial}</p></>
            break;
        case "special":
            remainPart = <><p>{props.obj.description}</p><p>requires skills: {props.obj.requirements.join()}</p></>;
            break;
        default:
            return assertNever(props.obj);
    }
    return (
        <>
            <h3>{props.obj.name} {props.obj.exerciseCount}</h3>
            {remainPart}<br/>
    </>
    )
}

interface TotalProps {
    totalExercises: number
}

const Total = (props: TotalProps) => {
    return(
        <p>
            Number of exercises {props.totalExercises}
        </p>)
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBaseWDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBaseWDescription {
    requirements: string[],
    kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;


const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
      {
        name: "Fundamentals",
        exerciseCount: 10,
        description: "This is an awesome course part",
        kind: "basic"
      },
      {
        name: "Using props to pass data",
        exerciseCount: 7,
        groupProjectCount: 3,
        kind: "group"
      },
      {
        name: "Basics of type Narrowing",
        exerciseCount: 7,
        description: "How to go from unknown to string",
        kind: "basic"
      },
      {
        name: "Deeper type usage",
        exerciseCount: 14,
        description: "Confusing description",
        backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
        kind: "background"
      },
      {
        name: "TypeScript in frontend",
        exerciseCount: 10,
        description: "a hard part",
        kind: "basic",
      },
      {
          name: "Backend development",
          exerciseCount: 21,
          description: "Typing the backend",
          requirements: ["nodejs", "jest"],
          kind: "special"
      }
  ];
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
        <Header name={courseName} />
        <Content courseParts={courseParts}/>
        <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;