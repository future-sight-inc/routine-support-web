import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { ImageUrl } from "@routine-support/types";
import { useTranslation } from 'react-i18next';

import { Modal } from "../Modal";
import { usePictogramPickerComponent } from "./hooks";
import * as S from "./styled";

interface PictogramPickerProps {
  value?: ImageUrl;
  onChange: (pictogram: ImageUrl) => void;
}

export interface PictogramPickerActions {
  onChange: (pictogram: ImageUrl) => void;
}

export const PictogramPicker: React.FC<PictogramPickerProps> = ({
  value: selectedPictogram,
  onChange,
}) => {
  const {
    models: { opened, searchString, pictograms },
    operations: {
      onModalClose,
      onModalOpen,
      onPictogramClick,
      onSearchStringChange,
    },
  } = usePictogramPickerComponent({ onChange });

  const { t } = useTranslation()
  // ! Добавить локализацию
  return (
    <S.Wrapper backgroundImage={selectedPictogram}>
      <S.OpenButton onClick={onModalOpen}>
        {selectedPictogram ? t("Change pictogram") : t("Choose pictogram")}
      </S.OpenButton>
      <Modal opened={opened} onClose={onModalClose}>
        <S.ModalContent>
          <TextField
            placeholder={t("Search")}
            fullWidth
            value={searchString}
            onChange={onSearchStringChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <S.PictogramsWrapper>
            {pictograms.map((item) => (
              <S.Pictogram
                src={item.url}
                active={selectedPictogram === item.url}
                onClick={() => onPictogramClick(item.url)}
              />
            ))}
          </S.PictogramsWrapper>
        </S.ModalContent>
      </Modal>
    </S.Wrapper>
  );
};
