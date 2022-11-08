import MainPageHeader from '../components/main/MainPageHeader';
import MyPageBody from '../components/mypage/MyPageBody';
import MyPageLayout from '../components/mypage/MyPageLayout';

export default function MyPage() {
  return (
    <MyPageLayout>
      <MainPageHeader />
      <MyPageBody />
    </MyPageLayout>
  );
}
