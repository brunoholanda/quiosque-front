import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`

export const LoginCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 8px;
  }
`

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 8px;
  color: #333;
  font-size: 28px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

export const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 32px;
  color: #666;
  font-size: 14px;
`

