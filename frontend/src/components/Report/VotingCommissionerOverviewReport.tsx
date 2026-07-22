import Chart, { ChartElement } from "../../base-components/Chart";
import { ChartData, ChartOptions } from "chart.js/auto";
import { getColor } from "../../utils/colors";
import { selectColorScheme } from "../../stores/colorSchemeSlice";
import { selectDarkMode } from "../../stores/darkModeSlice";
import { useAppSelector } from "../../stores/hooks";
import { useMemo } from "react";

interface MainProps extends React.ComponentPropsWithoutRef<"canvas"> {
  width: number;
  height: number;
  labels: any;
  data: any;
  colors: any;
}

function Main(props: MainProps) {
  const colorScheme = useAppSelector(selectColorScheme);
  const darkMode = useAppSelector(selectDarkMode);

  const data: ChartData = useMemo(() => {
    const configData = {
      labels: props.labels,
      datasets: [
        {
          data: props.data,
          backgroundColor: colorScheme
            ? props.colors.map((color: any) => getColor(color, 0.5))
            : "",
          hoverBackgroundColor: colorScheme
            ? props.colors.map((color: any) => getColor(color, 0.5))
            : "",
          borderWidth: 1,
          borderColor: colorScheme
            ? props.colors.map((color: any) => getColor(color, 0.9))
            : "",
        },
      ],
    };

    return darkMode ? configData : configData;
  }, [colorScheme, darkMode]);

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      cutout: "90%",
    };
  }, [colorScheme, darkMode]);

  return (
    <Chart
      type="doughnut"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

Main.defaultProps = {
  width: "auto",
  height: "auto",
  className: "",
};

export default Main;
