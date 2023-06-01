export type QuestionTypeData = [
  hasAudioQuestion: boolean,
  hasVideoAnswer: boolean
];

export function getQuestionTypeData(questionType: string): QuestionTypeData {
  switch (questionType) {
    case "textToVideo":
      return [false, true];
    case "audioToText":
      return [true, false];
    case "audioToVideo":
      return [true, true];
    case "textToText":
      return [false, false];
    default:
      return [false, true]; // Default type
  }
}
