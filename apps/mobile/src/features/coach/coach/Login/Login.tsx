import React from "react";

import { LoginCoachDto } from "@routine-support/domains";
import { ErrorMessage } from "apps/mobile/src/components/ErrorMessage";
import { TextField } from "apps/mobile/src/components/FormFields/TextField";
import { Typography } from "apps/mobile/src/components/Typography";
import { LinkService } from "apps/mobile/src/services/LinkService";
import { Dimensions, StyleSheet } from "react-native";
import { Link } from "react-router-native";

import { AuthFormLayout } from "../AuthFormLayout";
import { useLoginComponent } from "./hooks";

export interface LoginActions {
  login: (data: LoginCoachDto) => void;
  loading: boolean;
}

interface LoginProps {
  actions: LoginActions;
}

export const Login: React.FC<LoginProps> = ({ actions, loading }) => {
  const {
    models: { submitError, control },
    operations: { handleSubmit },
  } = useLoginComponent(actions);

  return (
    <AuthFormLayout
      title="Войти в Routine Support"
      submitButtonText="Войти"
      onSubmit={handleSubmit}
      loading={loading}
    >
      <TextField
        control={control}
        name="email"
        placeholder="Почта"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCorrect={false}
        required
        disabled={loading}
        style={styles.textInput}
      />
      <TextField
        control={control}
        name="password"
        placeholder="Пароль"
        required
        secureTextEntry={true}
        disabled={loading}
        style={styles.textInput}
      />
      {submitError && <ErrorMessage style={styles.errorMessage}>{submitError}</ErrorMessage>}
      <Link to={LinkService.coach.register()} underlayColor="transparent">
        <Typography variant="text1" color="secondary">
          Еще не зарегистрированы?{" "}
          <Typography variant="text1" color="primary">
            Создать аккаунт
          </Typography>
        </Typography>
      </Link>
    </AuthFormLayout>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 16,
    width: Dimensions.get("screen").width - 32,
  },
  errorMessage: {
    marginBottom: 16,
  },
});
