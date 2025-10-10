import Countdown, { CountdownRendererFn } from "react-countdown";

interface CountdownComponentProps {
  endDate: Date;
}

export default function CountdownComponent({
  endDate,
}: CountdownComponentProps) {
  const renderer: CountdownRendererFn = ({
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      return <span className="text-xs font-medium">Ended</span>;
    } else {
      return (
        <span className="text-xs font-medium !text-red-500">
          End at: {hours} h : {minutes} m : {seconds} s
        </span>
      );
    }
  };

  return <Countdown date={endDate} renderer={renderer} />;
}
