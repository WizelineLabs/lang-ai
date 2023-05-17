import { Button, ChevronIcon } from "~/components";

export type LessonState = "pending" | "inProgress" | "done";

export interface LessonRowProps {
  title: string;
  description: string;
  difficulty: number;
  state: LessonState;
  buttonOnClick?: () => void;
}

export function LessonRow(props: LessonRowProps) {
  const { title, description, difficulty, state, buttonOnClick } = props;
  function getDifficultyText(number: number) {
    switch (number) {
      case 0:
        return "Easy";
      case 1:
        return "Intermediate";
      case 2:
        return "Hard";
      default:
        return "-";
    }
  }
  function getDifficultyColor(number: number) {
    switch (number) {
      case 0:
        return "text-emerald-600";
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-red-600";
      default:
        return "text-slate-950";
    }
  }
  function getStateText(state: LessonState) {
    switch (state) {
      case "pending":
        return "Start";
      case "inProgress":
        return "Resume";
      case "done":
        return "See grades";
    }
  }
  function getStateButtonTheme(state: LessonState) {
    switch (state) {
      case "pending":
        return "primary";
      case "inProgress":
        return "primary-inverted";
      case "done":
        return "secondary";
    }
  }
  return (
    <div className="flex flex-row justify-between py-3 pl-5 pr-4">
      <div className="flex grow flex-col space-y-2">
        <span className="text-base font-semibold leading-5 text-primary">
          {title}
          {description ? ". " : ""}
          <span className="font-normal text-secondary">{description}</span>
        </span>
        <span className="text-sm font-normal leading-4 text-secondary">
          Difficulty:{" "}
          <span className={"font-semibold " + getDifficultyColor(difficulty)}>
            {getDifficultyText(difficulty)}
          </span>
        </span>
      </div>
      <Button
        className="my-auto"
        theme={getStateButtonTheme(state)}
        icon={<ChevronIcon />}
        iconInRight
        onClick={buttonOnClick}
      >
        {getStateText(state)}
      </Button>
    </div>
  );
}

export default LessonRow;
