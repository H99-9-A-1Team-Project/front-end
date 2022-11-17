import React, { useState } from 'react';
import styled from 'styled-components';
import pathLeft from '../signup/sources/article_path_left.png';
import { useRecoilState } from 'recoil';
import { GoLogIn, isLogin, NextTor, NextMem, itsNotOK, itsNotOK2 } from '../../store/store';
import Title from '../signup/sources/Title.png';
import ViewPassword from '../signup/sources/View_password.png';
import HidePassword from '../signup/sources/View_hide_password.png';
import { useMutation } from '@tanstack/react-query';
import { EmailLoginData } from '../../api/apiPOST';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  //이미 가입된 회원 로그인 창 열때 필요한 recoilstate
  const [goinglogin, setGoingLogin] = useRecoilState(GoLogIn);
  const [nexttor, setNextTor] = useRecoilState(NextTor);
  const [nextmem, setNextMem] = useRecoilState(NextMem);

  //이메일 확인할 usestate
  const [checkemail, setCheckemail] = useState('');

  //비밀번호 확인할 usestate
  const [checkpassword, setCheckPassword] = useState('');

  //이메일 잘못 입력 에러 출력 state
  const [errormail, setErrorMail] = useState('');
  //비밀번호 잘못 입력 에러 출력 state
  const [errorpassword, setErrorPassWord] = useState('');

  //비밀번호 미리보기를 위한 state
  const [secret, setSecret] = useState(true);

  const [AppLogin, setAppLogin] = useRecoilState(isLogin);

  //버튼 활성화 및 오류메시지 색상 활성화를 위한 state
  const [valid, setValid] = useRecoilState(itsNotOK);
  const [psvalid, setPsValid] = useRecoilState(itsNotOK2);
  const isValidLogin = !(valid && psvalid);
  const [isEmail, setIsEmail] = useState();
  const [isPassword, setIsPassword] = useState();

  //비밀번호 미리보기 이벤트 핸들러
  const onPreviewPW = (e) => {
    setSecret(!secret);
  };

  // 이미 가입된 회원 모달 이전으로 넘기는 버튼용 함수
  const onGoingLogIn = () => {
    setGoingLogin(0);
    // navigate('/');
    window.location.reload();
  };

  // 데이터 전송을 위한 initialState

  const initialState = {
    email: '',
    password: '',
  };

  // 데이터 전송을 위한 state
  const [loginData, setLoginData] = useState(initialState);

  //이메일 및 비밀번호 입력
  const onChangeEmail = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    console.log('def', loginData);
    const emailData = loginData.email;
    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (exptext.test(emailData) == false) {
      setCheckemail('잘못된 이메일 형식입니다.');
      setIsEmail(false);
      setValid(false);
      // emailData.focus();
    } else {
      setCheckemail('알맞은 형식입니다 :) ');
      setIsEmail(true);
      setValid(true);
    }
  };
  const onChangePassword = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    console.log('ABC', loginData);
    const passwordData = loginData.password;
    const expword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (expword.test(passwordData) == false) {
      setCheckPassword('잘못된 비밀번호 형식입니다');
      setIsPassword(false);
      setPsValid(false);
      // passwordData.focus();
    } else {
      setCheckPassword('알맞은 형식입니다 :)');
      setIsPassword(true);
      setPsValid(true);
    }
  };

  const { mutate: emailLogin } = useMutation(EmailLoginData, {
    onSuccess: (response) => {
      sessionStorage.setItem('access_token', response.headers.access_token);
      sessionStorage.setItem('refresh_token', response.headers.refresh_token);
      sessionStorage.setItem('accountstate', response.data.accountState);
      setAppLogin(true);
      console.log(response);
      navigate('/');
    },
    onError: (err) => {
      alert(err.response.data.errorMessage);
    },
  });

  const onSubmitLoginData = () => {
    setErrorMail('');
    emailLogin(loginData);

    // const EmailAddress = result.email;
    // if (EmailAddress.includes('@') === true) {
    //   setErrorMail('');
    //   emailLogin(result);
    // } else {
    //   setErrorMail('잘못된 이메일 형식입니다');
    // }
  };

  return (
    <>
      {goinglogin === 1 ? (
        <ChoiceContainer>
          <SignUpHeader>
            <BackpageIconBox src={pathLeft} onClick={onGoingLogIn} />
            <SignUpTitle>로그인</SignUpTitle>
          </SignUpHeader>
          <WelcomeQuestionContainer>
            <WelcomeQuestionbox>
              <SmallFont>등본 대신 해석해주는</SmallFont>
              <BigFontImage src={Title} />
            </WelcomeQuestionbox>
          </WelcomeQuestionContainer>
          <InputContainer>
            <InputBox>
              <InputName>아이디</InputName>
              <>
                <InputText
                  placeholder="아이디를 입력해주세요"
                  type="text"
                  name="email"
                  onChange={onChangeEmail}
                  style={{
                    border: isEmail === false ? '1px solid #d14343 ' : 'none',
                  }}
                ></InputText>
                <InputErrorMessageBox>{isEmail === false ? <InputErrorMessage>{checkemail === '' ? null : checkemail}</InputErrorMessage> : <InputMessage>{checkemail === '' ? null : checkemail}</InputMessage>}</InputErrorMessageBox>
              </>
            </InputBox>
            <InputBoxPassword>
              <InputName>비밀번호</InputName>

              <InputText
                placeholder="비밀번호를 입력해주세요"
                name="password"
                type={secret === false ? 'text' : 'password'}
                autocomplete="current-password"
                onChange={onChangePassword}
                style={{
                  border: isPassword === false ? '1px solid #d14343 ' : 'none',
                }}
              ></InputText>
            </InputBoxPassword>
            <ErrorMsgPreview>
              <InputErrorMessageBoxPassword>
                <InputErrorMessageBox>{isPassword === false ? <InputErrorMessage>{checkpassword === '' ? null : checkpassword}</InputErrorMessage> : <InputMessage>{checkpassword === '' ? null : checkpassword}</InputMessage>}</InputErrorMessageBox>
              </InputErrorMessageBoxPassword>
              <PasswordViewButtonImg src={secret === false ? ViewPassword : HidePassword} onClick={onPreviewPW} />
            </ErrorMsgPreview>
          </InputContainer>
          <BlankContainer2></BlankContainer2>
          <ButtonContainer>
            <ButtonStyle type="submit" disabled={isValidLogin} onClick={onSubmitLoginData}>
              시작하기
            </ButtonStyle>
          </ButtonContainer>
        </ChoiceContainer>
      ) : null}
    </>
  );
}

export default Login;

const ChoiceContainer = styled.div`
  width: 360px;
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: pink;
`;

const SignUpHeader = styled.div`
  width: 360px;
  height: 64px;
  left: 0px;
  top: 0px;
  /* position: absolute; */
  display: flex;
  flex-direction: row;
  align-items: center;
  /* padding: 20px 16px; */
  gap: 8px;
  background-color: white;
`;

const BackpageIconBox = styled.img`
  width: 20px;
  height: 20px;
  background-color: white;
  margin-left: 20px;
`;
const SignUpTitle = styled.div`
  background-color: white;
  width: 70px;
  height: 20px;
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const WelcomeQuestionContainer = styled.div`
  width: 360px;
  height: 187px;
  background-color: white;
  display: flex;
  position: relative;
  justify-content: center;
`;

const WelcomeQuestionbox = styled.div`
  width: 147px;
  height: 71px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  gap: 7px;
`;

const SmallFont = styled.div`
  width: 147px;
  height: 28px;
  left: 106px;
  top: 96px;
  background-color: white;
  font-family: 'Leferi Point Type';
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #25282b;
`;

const BigFontImage = styled.img`
  width: 147px;
  height: 36px;
  background-color: white;
`;

const InputContainer = styled.div`
  width: 360px;
  height: 188px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputBox = styled.div`
  width: 328px;
  height: 82px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputBoxPassword = styled.div`
  width: 328px;
  height: 64px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputName = styled.div`
  width: 328px;
  height: 20px;
  display: flex;
  justify-content: left;
  background-color: white;
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;
const InputText = styled.input`
  width: 328px;
  height: 44px;
  border-radius: 8px;
  border: none;
  background-color: white;
  :focus {
    outline: none;
  }
`;

const InputErrorMessageBox = styled.div`
  width: 328px;
  height: 16px;
  background-color: white;
  display: flex;
  align-items: center;
`;

const InputErrorMessageBoxPassword = styled.div`
  width: 304px;
  height: 16px;
  background-color: white;
  display: flex;
  align-items: flex-end;
`;

const InputMessage = styled.div`
  width: 328px;
  height: 12px;
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  color: #c5c8cb;
  background-color: white;
`;
const InputErrorMessage = styled.div`
  width: 328px;
  height: 12px;
  font-style: normal;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
  color: #d14343;
  background-color: white;
`;

const PasswordViewButtonImg = styled.img`
  width: 24px;
  height: 24px;
  background-color: white;
`;
const ErrorMsgPreview = styled.div`
  width: 328px;
  height: 24px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const BlankContainer2 = styled.div`
  width: 360px;
  height: 269px;
  background-color: white;
`;

const ButtonContainer = styled.div`
  width: 360px;
  height: 92px;
  background-color: white;
  display: flex;
  justify-content: center;
  /* background-color: green; */
`;

const ButtonStyle = styled.button`
  width: 328px;
  height: 60px;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-family: var(--button-font-family);
  font-size: var(--button_Large-font-size);
  font-weight: var(--button_Large-font-weight);
  line-height: var(--button_Large-line-height);
  letter-spacing: var(--button_Large-letter-spacing);
  :disabled {
    background-color: #c5c8cb;
  }
  :enabled {
    background-color: #3c6eef;
    color: white;
  }
`;
