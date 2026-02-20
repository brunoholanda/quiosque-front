import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Spin, message } from 'antd'
import { campaignService, Campaign } from '../../services/campaign'
import * as S from './styles'

const useWebhook = (campaignId: string | undefined, onUpdate: () => void) => {
  useEffect(() => {
    if (!campaignId) return

    const apiBaseUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL || ''
    const webhookUrl = apiBaseUrl
      ? `${apiBaseUrl}/api/campaigns/${campaignId}/webhook`
      : `/api/campaigns/${campaignId}/webhook`

    console.log('Conectando ao webhook:', webhookUrl)
    const eventSource = new EventSource(webhookUrl)

    eventSource.onopen = () => {
      console.log('Webhook conectado para campanha:', campaignId)
    }

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        console.log('Evento recebido do webhook:', data)

        if (data.type === 'updated') {
          console.log('Campanha atualizada, recarregando...')
          onUpdate()
        } else if (data.type === 'deleted') {
          message.warning('Esta campanha foi deletada')
          onUpdate()
        }
      } catch (error) {
        console.error('Erro ao processar evento do webhook:', error)
      }
    }

    eventSource.onerror = (error) => {
      console.error('Erro na conexão do webhook:', error)
      // EventSource tenta reconectar automaticamente
    }

    return () => {
      console.log('Fechando conexão do webhook')
      eventSource.close()
    }
  }, [campaignId, onUpdate])
}

const CampaignView = () => {
  const { id } = useParams<{ id: string }>()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loadCampaignRef = useRef<() => Promise<void>>()

  const loadCampaign = async () => {
    try {
      setLoading(true)
      const data = await campaignService.getById(id!)
      const sortedMedia = [...data.media].sort((a, b) => a.order - b.order)
      setCampaign({ ...data, media: sortedMedia })
      // Reset para o início quando a campanha é atualizada
      setCurrentIndex(0)
    } catch (error) {
      message.error('Erro ao carregar campanha')
    } finally {
      setLoading(false)
    }
  }

  // Armazena a função loadCampaign em uma ref para usar no webhook
  loadCampaignRef.current = loadCampaign

  // Configura o webhook para escutar atualizações
  useWebhook(id, () => {
    if (loadCampaignRef.current) {
      loadCampaignRef.current()
    }
  })

  useEffect(() => {
    if (id) {
      loadCampaign()
    }
  }, [id])

  useEffect(() => {
    if (campaign && campaign.media.length > 0) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      const playNext = (index: number) => {
        if (index >= campaign.media.length) {
          // Loop back to start
          setCurrentIndex(0)
          playNext(0)
          return
        }

        setCurrentIndex(index)
        const currentMedia = campaign.media[index]

        // Set timeout based on configured duration
        timeoutRef.current = setTimeout(() => {
          playNext(index + 1)
        }, currentMedia.duration * 1000)
      }

      playNext(0)

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [campaign])


  if (loading) {
    return (
      <S.Container>
        <Spin size="large" />
      </S.Container>
    )
  }

  if (!campaign || campaign.media.length === 0) {
    return (
      <S.Container>
        <S.EmptyState>Campanha não encontrada ou sem mídias</S.EmptyState>
      </S.Container>
    )
  }

  const currentMedia = campaign.media[currentIndex]

  return (
    <S.Container>
      <S.MediaContainer>
        {currentMedia.type === 'image' ? (
          <S.Image
            src={currentMedia.url}
            alt={`Mídia ${currentIndex + 1}`}
            key={currentIndex}
          />
        ) : (
          <S.Video
            src={currentMedia.url}
            autoPlay
            muted
            playsInline
            key={currentIndex}
            loop={false}
          />
        )}
      </S.MediaContainer>
    </S.Container>
  )
}

export default CampaignView

