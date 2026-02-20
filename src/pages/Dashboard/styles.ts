import styled from 'styled-components'
import { Card } from 'antd'

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`

export const Header = styled.div`
  background: white;
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #e8e8e8;

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
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

export const EmptyStateCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`

export const CampaignsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`

export const CampaignCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-color: #1890ff;
  }

  .ant-card-body {
    padding: 0;
  }
`

export const CardHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid #f0f0f0;
  background: white;
`

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 12px;
`

export const MediaPreview = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  background: #f5f5f5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 180px;
  }
`

export const MediaOverlay = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
`

export const CardContent = styled.div`
  padding: 20px;
  background: white;
`

export const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
`

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 14px;

  .anticon {
    font-size: 16px;
    color: #1890ff;
  }
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`

export const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`

