import styled from "@emotion/styled";
import { LinearProgress, linearProgressClasses } from "@mui/material";

interface ProgressProps {
  barcolor?: string;
  endColor?: string;
  barheight?: number;
}

export const normalise = (valueInitial: number, valueMax: number) =>
  (valueInitial * 100) / valueMax;

export const ProgressBar = styled(LinearProgress)<ProgressProps>(
  ({ theme, barcolor, endColor, barheight }) => ({
    height: barheight ?? 10,
    borderRadius: 20,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      // backgroundColor: theme.palette.grey[400],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 14,
      backgroundColor: barcolor ?? "#34C759",
      backgroundImage: endColor
        ? `linear-gradient(0.25turn, ${barcolor ?? "#34C759"}, ${
            endColor ?? "#34C759"
          })`
        : undefined,
    },
  })
);
