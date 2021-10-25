import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Button } from "styled/components/Button";

export const Wrapper = styled.div``;

export const SelectButton = styled(Button).attrs(() => ({
  backgroundColor: "black",
  fontColor: "white",
}))``;

export const ArrowLeft = styled(ChevronLeftIcon)`
  width: 32px;
  height: 32px;
`;

export const ArrowRight = styled(ChevronRightIcon)`
  width: 32px;
  height: 32px;
`;
