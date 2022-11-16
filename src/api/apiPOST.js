import axios from 'axios';
import api from './api';

//일반회원 회원가입
export async function MemberSignUp(MemberInfo) {
  const { data } = await api.post('v1/signup', MemberInfo);
  return data;
}

//이메일 중복확인
export async function RequestEmail(EmailDouble) {
  const { data } = await api.post('v1/emailconfirm', EmailDouble);
  return data;
}

//공인중개사 회원가입
export async function RealtorSignUpFormDatas(RealtorInfo) {
  const { data } = await api.post('v1/realtor/signup', RealtorInfo, { headers: { 'Content-Type': 'multipart/form-data' } });
  return data;
}

// 로그인
export async function EmailLoginData(EmailData) {
  const data = await api.post('v1/login', EmailData);
  console.log(data);
  return data;
}
