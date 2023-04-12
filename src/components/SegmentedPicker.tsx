interface SegmentedPickerProps<Option extends string> {
  title: string;
  selectedOption: Option;
  options: Option[];
  didSelectOption: (o: Option) => void;
}

function SegmentedPicker<O extends string>({
  title,
  selectedOption,
  options,
  didSelectOption,
}: SegmentedPickerProps<O>) {
  return (
    <div className="mr-auto mt-2 flex flex-row space-x-4">
      <span className="flex-none self-center text-base text-slate-800">
        {title}
      </span>
      {options.map((option) => (
        <button
          type="button"
          onClick={() => didSelectOption(option)}
          className={
            "shrink rounded-2xl px-5 py-4 hover:bg-slate-300 " +
            (selectedOption === option ? "bg-slate-200" : "bg-transparent")
          }
          key={option}
        >
          <span className="font-medium">{option}</span>
        </button>
      ))}
    </div>
  );
}

export default SegmentedPicker;
