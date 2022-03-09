import { useEffect } from "react";

import { NotAuthorizedLayout } from "apps/web/src/components/NotAuthorizedLayout";
import { LinkService } from "apps/web/src/services/LinkService";
import { useHistory } from "react-router-dom";

import { useUser } from "../../useUser";
import { LoginForm as UncontrolledLoginForm } from "./LoginForm";

export const LoginForm: React.FC = () => {
  const {
    models: { isLogged },
    operations: { login },
  } = useUser();

  const history = useHistory();
  useEffect(() => {
    if (isLogged) {
      return history.push(LinkService.home());
    }
  }, [isLogged, history]);

  return (
    <NotAuthorizedLayout>
      <UncontrolledLoginForm actions={{ login }} />
    </NotAuthorizedLayout>
  );
};
