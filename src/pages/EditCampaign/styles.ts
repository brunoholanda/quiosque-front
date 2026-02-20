import styled from 'styled-components'
import { Button } from 'antd'

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`

export const Header = styled.div`
  background: white;
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #e8e8e8;

  @media (max-width: 768px) {
    padding: 16px;
    flex-wrap: wrap;
    gap: 12px;
  }
`

export const Title = styled.h2`
  margin: 0;
  color: #1890ff;
  font-weight: 600;
  font-size: 24px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

export const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`

export const MainCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 8px;
  }
`

export const LoadingCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 60px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`

export const FormSection = styled.div`
  margin-bottom: 24px;
`

export const MediaSection = styled.div`
  margin-top: 32px;
`

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
  }
`

export const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 16px;
  }
`

export const MediaCard = styled.div<{ $isDragging?: boolean }>`
  background: white;
  border: 2px solid ${props => props.$isDragging ? '#1890ff' : '#e8e8e8'};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  cursor: move;
  position: relative;
  box-shadow: ${props => props.$isDragging ? '0 8px 24px rgba(24, 144, 255, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.08)'};
  touch-action: none;

  &:hover {
    border-color: #1890ff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 8px;

    &:hover {
      transform: none;
    }
  }
`

export const MediaCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }
`

export const MediaPreview = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 16px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  overflow: hidden;
  position: relative;

  img,
  video {
    max-width: 100%;
    max-height: 100%;
    border-radius: 4px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    height: 180px;
    padding: 8px;
    margin-bottom: 12px;
  }
`

export const EmptyPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 100%;
`

export const MediaControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }
`

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 6px;
  color: #8c8c8c;
  font-size: 12px;
  cursor: grab;
  touch-action: none;
  min-height: 44px;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 10px;
  }
`

export const EmptyStateCard = styled.div`
  padding: 60px 20px;
  background: #fafafa;
  border-radius: 8px;
  border: 2px dashed #d9d9d9;
`

export const FloatingButtons = styled.div`
  position: fixed;
  bottom: 32px;
  right: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 1000;

  @media (max-width: 768px) {
    bottom: 16px;
    right: 16px;
    gap: 12px;
  }
`

export const FloatingButton = styled(Button)<{ $isPrimary?: boolean }>`
  height: auto !important;
  min-height: 48px;
  padding: 12px 24px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: none;
  transition: all 0.3s ease;
  border-radius: 24px !important;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  ${props => props.$isPrimary && `
    background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
    border: none;

    &:hover {
      background: linear-gradient(135deg, #40a9ff 0%, #1890ff 100%);
    }
  `}

  @media (max-width: 768px) {
    padding: 10px 20px !important;
    min-height: 44px;
    font-size: 14px;
    border-radius: 22px !important;

    .anticon {
      font-size: 18px;
    }
  }
`
