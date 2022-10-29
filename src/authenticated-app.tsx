import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg';
import { Button, Dropdown, Menu } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          {/* 以 svg 的形式渲染图片（img 不可更改图片的样式，但 svg 可以） */}
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
          <h3>项目</h3>
          <h3>项目</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={
            <Menu>
              <Menu.Item key={'logout'}>
                <Button type={"link"} onClick={logout}>登出</Button>
              </Menu.Item>
            </Menu>
          }>
            <Button type={"link"} onClick={e => e.preventDefault()}>
              Hi, {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main> 
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 5px 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)`
`

const HeaderRight = styled.div`
`

// grid-area 用来给 grid 子元素起名字
const Main = styled.main`
  /* grid-area: main; */
`