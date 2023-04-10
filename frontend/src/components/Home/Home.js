import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import bg from '../../img/bg.png'
import {MainLayout} from '../../styles/Layouts'
import Orb from '../Orb/Orb'
import Navigation from '../Navigation/Navigation'
import Dashboard from '../Dashboard/Dashboard';
import Add from '../Add/Add'
import Delete from '../Delete/Delete';
import Help from '../Help/Help';

function Home() {
  const [active, setActive] = useState(1)

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Add />
      case 3: 
        return <Delete />
      case 4: 
        return <Help />
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  return (
    <HomeStyled bg={bg} className="app">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </HomeStyled>
  );
}

const HomeStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default Home;
