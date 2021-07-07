import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;

  justify-content: center;
  flex-wrap: wrap;
`;

export const ThumbnailBox = styled.div`
  position: relative;
  height: 140px;
  padding: 10px;
  &:hover .middle {
    opacity: 1;
  }
  &:hover .image {
    opacity: 0.3;
  }
`;

export const Image = styled.img`
  opacity: 1;
  display: block;
  height: 100%;
  width: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
`;

export const MiddleBox = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
`;
