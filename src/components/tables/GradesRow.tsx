import { StarIcon } from "@heroicons/react/20/solid";
import { LinkButton, ChevronIcon } from "~/components";

export type EvaluationGrade = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type TestGrade = number | EvaluationGrade;

export interface GradesRowProps {
  title: string;
  description: string;
  date: Date;
  grade?: TestGrade;
  buttonHref?: string;
}

export function GradesRow(props: GradesRowProps) {
  const { title, description, date, grade, buttonHref } = props;
  const formattedDate = date.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
  return (
    <div className="flex flex-row justify-between space-x-4 px-4 py-3">
      <GradeIcon grade={grade} />
      <div className="flex grow flex-col space-y-2">
        <span className="text-base font-semibold leading-5 text-primary">
          {title}
          {description ? ". " : ""}
          <span className="font-normal text-secondary">{description}</span>
        </span>
        <span className="text-sm font-normal leading-4 text-secondary">
          Completed on {formattedDate}.
        </span>
      </div>
      <LinkButton
        className="my-auto"
        theme="secondary"
        icon={<ChevronIcon />}
        iconInRight
        href={buttonHref ?? ""}
      >
        See details
      </LinkButton>
    </div>
  );
}

export interface GradeIconProps {
  grade?: TestGrade;
}

export function GradeIcon(props: GradeIconProps) {
  function getPercentValue(grade: TestGrade) {
    if (typeof grade === "number") {
      return Math.max(0, Math.min(grade, 100));
    } else {
      return 100;
    }
  }

  function getPercentText(grade: TestGrade) {
    if (typeof grade === "number") {
      const value = Math.max(-1, Math.min(grade, 100));
      if (value === 100) {
        return "*";
      } else if (value < 0) {
        return "-";
      } else {
        return `${value}`;
      }
    } else {
      return grade;
    }
  }

  function getColorValue(grade: TestGrade) {
    if (typeof grade === "number") {
      const value = Math.max(-1, Math.min(grade, 100));
      if (value > 70) {
        return "text-emerald-600";
      } else if (value > 40) {
        return "text-yellow-400";
      } else if (value >= 0) {
        return "text-red-600";
      } else {
        return "text-slate-700";
      }
    } else {
      if (grade === "A1" || grade === "A2") {
        return "text-red-600";
      } else if (grade === "B1" || grade === "B2") {
        return "text-yellow-400";
      } else {
        return "text-emerald-600";
      }
    }
  }

  const grade = props.grade ?? 0;
  const percent = getPercentValue(grade);
  const percentText = getPercentText(grade);
  const showsStar = percentText === "*";

  const size = 46;
  const outerRadius = size / 2;
  const strokeWidth = size * 0.1;
  const innerRadius = outerRadius - strokeWidth;
  const circumference = 2 * Math.PI * innerRadius;

  return (
    <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full">
      {/* https://tailwindcomponents.com/component/circular-progress-bar */}
      <svg style={{ width: size, height: size }}>
        <circle
          className={getColorValue(grade)}
          opacity={0.1}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={innerRadius}
          cx={outerRadius}
          cy={outerRadius}
        />
        <circle
          className={getColorValue(grade)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          strokeLinecap="butt"
          stroke="currentColor"
          fill="transparent"
          r={innerRadius}
          cx={outerRadius}
          cy={outerRadius}
          transform={`rotate(-90 ${outerRadius} ${outerRadius})`}
        />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <span
          className="text-base font-semibold text-slate-700"
          hidden={showsStar}
        >
          {percentText}
        </span>
        {showsStar && <StarIcon className="h-4 w-4 text-emerald-600" />}
      </span>
    </div>
  );
}

// const StarIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     className="h-4 w-4"
//   >
//     <path
//       fillRule="evenodd"
//       d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
//       clipRule="evenodd"
//     />
//   </svg>
// );
