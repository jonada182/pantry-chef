import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FlexCol, Page, TextInput } from "../components";
import { AuthContext } from "../AuthContext";
import firebaseApp from "../helpers/firebase";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const auth = firebaseApp.auth();

  useEffect(() => {
    if (userId) {
      navigate("/");
    }

    if (auth.isSignInWithEmailLink(window.location.href)) {
      const storedEmail = window.localStorage.getItem("emailForSignIn");

      if (storedEmail) {
        setIsLoading(true);
        auth.signInWithEmailLink(storedEmail, window.location.href)
          .then(() => {
            window.localStorage.removeItem("emailForSignIn");
            navigate("/");
          })
          .catch((err) => {
            setError(new Error("Error signing in with email link:" + err));
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, [navigate, userId]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true,
      };

      setIsLoading(true);
      await auth.sendSignInLinkToEmail(email, actionCodeSettings).then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        // TODO: show successful message
      }).catch((err) => {
        setError(err);
      }).finally(() => {
        setIsLoading(false);
        setEmail("");
      });
    } catch (err) {
      setError(new Error("Error sending sign-in link:" + err));
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  return (
    <>
      <FlexCol className="w-full h-40 relative">
        <img src="/img/ingredients.jpg" alt="Login" className="absolute inset-0 object-cover object-top w-full h-full" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </FlexCol>
      <Page
        title="Login"
        description="We'll send an email with a link to sign-in without a password."
        isLoading={isLoading}
        error={error}
        className="justify-center max-w-lg"
      >
        <form onSubmit={handleSignIn} className="flex flex-row gap-4 items-center flex-wrap my-4">
            <label className="font-semibold">Email Address</label>
            <TextInput
              type="email"
              value={email}
              handleOnChange={handleEmailChange}
              required={true}
              placeholder="Eg. name@example.com"
            />
            <Button isCentered={true} text="Send Sign-In Link" type="submit" />
          </form>
      </Page>
    </>
  );
};
