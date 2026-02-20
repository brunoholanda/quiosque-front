import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  overflow: hidden;
`

export const MediaContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

export const Video = styled.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

export const EmptyState = styled.div`
  color: white;
  font-size: 24px;
  text-align: center;
`

