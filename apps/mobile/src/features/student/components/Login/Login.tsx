import React from "react";

import { Student, StudentLoginDto } from "@routine-support/domains";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet } from "react-native";
import { Redirect } from "react-router-native";

import qrImage from "../../../../../assets/qr.png";
import { Spinner } from "../../../../components/Spinner";
import { useLoginComponent } from "./hooks";

export interface LoginActions {
  login: (data: StudentLoginDto) => void;
}

interface LoginProps {
  loading: boolean;
  student: Student | null;
  actions: LoginActions;
}

export const Login: React.FC<LoginProps> = ({ loading, student, actions }) => {
  const {
    models: { hasPermission, scanning },
    operations: { handleQrScanned, handleScannerOpen, handleScannerClose },
  } = useLoginComponent(actions);
  const { t } = useTranslation();

  if (student) {
    return <Redirect to="/" />;
  }

  if (hasPermission === null) {
    return <Text>{t<string>("Camera permission request")}</Text>;
  }

  if (hasPermission === false) {
    return <Text>{t<string>("No camera permission")}</Text>;
  }

  if (loading) {
    return <Spinner />;
  }

  if (!scanning) {
    return (
      <Layout style={styles.previewWrapper}>
        <Layout style={styles.previewTextWrapper}>
          <Text category="h4" style={styles.previewTitle}>
            {t<string>("You need to login")}
          </Text>
          <Text category="s1" style={styles.previewCaption}>
            {t<string>("Scan QR instructions")}
          </Text>
          <Image source={qrImage} style={styles.previewImage} />
        </Layout>
        <Button
          onPress={handleScannerOpen}
          size="giant"
          style={styles.openScannerButton}
          accessoryLeft={(props) => <Icon {...props} name="camera-outline" />}
        >
          {t<string>("Open scanner")}
        </Button>
      </Layout>
    );
  }

  return (
    <Layout style={styles.scannerWrapper}>
      <BarCodeScanner
        onBarCodeScanned={handleQrScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Button
        onPress={handleScannerClose}
        size="giant"
        style={styles.closeScannerButton}
        accessoryLeft={(props) => <Icon {...props} name="close-outline" />}
      >
        {t<string>("Close")}
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  previewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    paddingTop: 64,
    ...StyleSheet.absoluteFillObject,
  },
  previewTextWrapper: {
    marginTop: "auto",
  },
  previewImage: {
    width: 250,
    height: 250,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 16,
  },
  previewTitle: {
    textAlign: "center",
  },
  previewCaption: {
    textAlign: "center",
    marginTop: 8,
  },
  scannerWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 32,
  },
  openScannerButton: {
    width: "100%",
    marginTop: "auto",
  },
  closeScannerButton: {
    width: "100%",
  },
});
