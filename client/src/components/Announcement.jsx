  import styled from "styled-components";
  import "./Announcement.css"


const Container = styled.div`
  height: 30px;
  background-color: teal;
  overflow: hidden;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  /* position:absolute; */
  /* color:black; */
  /* font-size:100px; */
  
`;

const Announcement = () => {
  return <Container><p className="sliding-word">Super Deal! Free Shipping on Orders Over $50</p></Container>;
};

export default Announcement;
