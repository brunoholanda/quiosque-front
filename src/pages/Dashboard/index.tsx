import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, message, Popconfirm, Space, Typography, Badge, Empty, Tooltip, Spin } from 'antd'
import {
  PlusOutlined,
  LogoutOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  CopyOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  CalendarOutlined
} from '@ant-design/icons'
import { campaignService, Campaign } from '../../services/campaign'
import * as S from './styles'

const { Title, Text } = Typography

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    loadCampaigns()
  }, [])

  const loadCampaigns = async () => {
    try {
      setLoading(true)
      const data = await campaignService.getAll()
      setCampaigns(data)
    } catch (error) {
      message.error('Erro ao carregar campanhas')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await campaignService.delete(id)
      message.success('Campanha deletada com sucesso!')
      // Recarregar lista e garantir que está no dashboard
      await loadCampaigns()
      navigate('/dashboard', { replace: true })
    } catch (error) {
      message.error('Erro ao deletar campanha')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const copyCampaignLink = (id: string) => {
    const link = `${window.location.origin}/campaign/${id}`
    navigator.clipboard.writeText(link)
    message.success('Link copiado para a área de transferência!')
  }

  const viewCampaign = (id: string) => {
    window.open(`/campaign/${id}`, '_blank')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getMediaTypeCount = (campaign: Campaign) => {
    const images = campaign.media.filter(m => m.type === 'image').length
    const videos = campaign.media.filter(m => m.type === 'video').length
    return { images, videos }
  }

  return (
    <S.Container>
      <S.Header>
        <div>
          <Title level={2} style={{ margin: 0 }}>Campanhas</Title>
          <Text type="secondary">
            {campaigns.length} {campaigns.length === 1 ? 'campanha' : 'campanhas'} cadastrada{campaigns.length !== 1 ? 's' : ''}
          </Text>
        </div>
        <Space wrap>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/campaigns/new')}
            size="large"
          >
            <span className="hide-mobile">Nova Campanha</span>
            <span className="show-mobile">Nova</span>
          </Button>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            size="large"
          >
            <span className="hide-mobile">Sair</span>
          </Button>
        </Space>
      </S.Header>

      <S.Content>
        {loading ? (
          <S.LoadingContainer>
            <Spin size="large" />
          </S.LoadingContainer>
        ) : campaigns.length === 0 ? (
          <S.EmptyStateCard>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Text type="secondary" style={{ fontSize: 16, display: 'block', marginBottom: 8 }}>
                    Nenhuma campanha criada ainda
                  </Text>
                  <Text type="secondary" style={{ fontSize: 14 }}>
                    Comece criando sua primeira campanha de publicidade
                  </Text>
                </div>
              }
            >
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate('/campaigns/new')}
                size="large"
              >
                Criar Primeira Campanha
              </Button>
            </Empty>
          </S.EmptyStateCard>
        ) : (
          <S.CampaignsGrid>
            {campaigns.map((campaign) => {
              const { images, videos } = getMediaTypeCount(campaign)
              const firstMedia = campaign.media[0]

              return (
                <S.CampaignCard
                  key={campaign.id}
                  hoverable
                  onClick={() => navigate(`/campaigns/edit/${campaign.id}`)}
                >
                  <S.CardHeader>
                    <S.CardTitle>{campaign.name}</S.CardTitle>
                  </S.CardHeader>

                  {firstMedia && (
                    <S.MediaPreview>
                      {firstMedia.type === 'image' ? (
                        <img
                          src={firstMedia.url}
                          alt={campaign.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      ) : (
                        <video
                          src={firstMedia.url}
                          muted
                          onError={(e) => {
                            (e.target as HTMLVideoElement).style.display = 'none'
                          }}
                        />
                      )}
                      <S.MediaOverlay>
                        <Badge count={campaign.media.length} showZero style={{ backgroundColor: '#1890ff' }} />
                      </S.MediaOverlay>
                    </S.MediaPreview>
                  )}

                  <S.CardContent>
                    <S.StatsRow>
                      <S.StatItem>
                        <PictureOutlined />
                        <Text>{images}</Text>
                      </S.StatItem>
                      <S.StatItem>
                        <VideoCameraOutlined />
                        <Text>{videos}</Text>
                      </S.StatItem>
                      <S.StatItem>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {campaign.media.length} {campaign.media.length === 1 ? 'mídia' : 'mídias'}
                        </Text>
                      </S.StatItem>
                    </S.StatsRow>

                    <S.CardFooter>
                      <S.DateInfo>
                        <CalendarOutlined style={{ fontSize: 12, color: '#8c8c8c' }} />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Criada em {formatDate(campaign.createdAt)}
                        </Text>
                      </S.DateInfo>
                      <Space>
                        <Tooltip title="Visualizar">
                          <Button
                            type="text"
                            icon={<EyeOutlined />}
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              viewCampaign(campaign.id)
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Copiar Link">
                          <S.CopyLinkButton
                            type="primary"
                            icon={<CopyOutlined />}
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              copyCampaignLink(campaign.id)
                            }}
                          >
                            <span className="hide-mobile">Copiar Link</span>
                          </S.CopyLinkButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <Button
                            type="text"
                            icon={<EditOutlined />}
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/campaigns/edit/${campaign.id}`)
                            }}
                          />
                        </Tooltip>
                        <Popconfirm
                          title="Deletar campanha?"
                          description="Esta ação não pode ser desfeita."
                          onConfirm={() => handleDelete(campaign.id)}
                          okText="Sim"
                          cancelText="Não"
                        >
                          <Tooltip title="Deletar">
                            <Button
                              type="text"
                              danger
                              icon={<DeleteOutlined />}
                              size="small"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </Tooltip>
                        </Popconfirm>
                      </Space>
                    </S.CardFooter>
                  </S.CardContent>
                </S.CampaignCard>
              )
            })}
          </S.CampaignsGrid>
        )}
      </S.Content>
    </S.Container>
  )
}

export default Dashboard

