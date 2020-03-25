import React from "react";
import useForm from "../../hooks/useForm";
import { Row, Col } from "react-flexbox-grid";
import { getFirebase } from "react-redux-firebase";

import { Page } from "../../layout";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { FormWrapper, HeaderText, DescriptionText, PaddedDiv } from "./Signup.style";
import { useHistory } from "react-router-dom";

const SignupPage = (props) => {
  const firebase = getFirebase();
  let history = useHistory();

  const { handleChange, values, setValues } = useForm();
  const handleLoginCTAClick = (e) => {
    e.preventDefault();
    window.location = "/login";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    db.collection("users").add(values).then(history.push("/login?signupSuccess=true"));
  };

  return (
    <Page>
      <FormWrapper>
        <HeaderText>Create account</HeaderText>
        <DescriptionText>Create an account to post your request</DescriptionText>
        <form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12}>
              <PaddedDiv>
                <Input
                  inputType="text"
                  dataId="fullName"
                  inputName="fullName"
                  label="FULL NAME"
                  onChange={handleChange}
                />
              </PaddedDiv>
            </Col>
            <Col xs={12}>
              <PaddedDiv>
                <Input
                  inputType="text"
                  dataId="email"
                  inputName="email"
                  label="EMAIL"
                  onChange={handleChange}
                />
              </PaddedDiv>
            </Col>
            <Col xs={12}>
              <PaddedDiv>
                <Input
                  inputType="text"
                  dataId="phoneNumber"
                  inputName="phoneNumber"
                  label="PHONE NUMBER"
                  onChange={handleChange}
                />
              </PaddedDiv>
            </Col>
            <Col xs={12}>
              <PaddedDiv>
                <Input
                  inputType="text"
                  dataId="zipCode"
                  inputName="zipCode"
                  label="ZIP CODE"
                  onChange={handleChange}
                />
              </PaddedDiv>
            </Col>
          </Row>
          <Row>
            <Col xsOffset={2} xs={4} mdOffset={3} md={3}>
              <Button text="Log in" onClick={(e) => handleLoginCTAClick(e)} tertiary />
            </Col>
            <Col xs={6}>
              <Button text="Create account" onClick={handleFormSubmit} secondary size="lg" />
            </Col>
          </Row>
        </form>
      </FormWrapper>
    </Page>
  );
};

export default SignupPage;
