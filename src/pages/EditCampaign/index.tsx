import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Space,
  InputNumber,
  Spin,
  Badge,
  Typography,
  Divider,
  Tooltip,
  Empty
} from 'antd'
import {
  PlusOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  DragOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  ClockCircleOutlined,
  EditOutlined,
  SaveOutlined
} from '@ant-design/icons'
import { campaignService, MediaItem } from '../../services/campaign'
import * as S from './styles'

const { Title: AntTitle, Text } = Typography

const EditCampaign = () => {
  const { id } = useParams<{ id: string }>()
  const [form] = Form.useForm()
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      loadCampaign()
    }
  }, [id])

  const loadCampaign = async () => {
    try {
      setInitialLoading(true)
      const campaign = await campaignService.getById(id!)
      form.setFieldsValue({ name: campaign.name })

      const existingMedia = campaign.media.map((item) => ({
        id: item.id,
        type: item.type,
        duration: item.duration,
        order: item.order,
        url: item.url,
        filename: item.filename,
      }))
      setMediaItems(existingMedia)
    } catch (error) {
      message.error('Erro ao carregar campanha')
      navigate('/dashboard')
    } finally {
      setInitialLoading(false)
    }
  }

  const handleFileChange = (file: File, index: number) => {
    const newItems = [...mediaItems]
    newItems[index] = {
      ...newItems[index],
      file,
      type: file.type.startsWith('video/') ? 'video' : 'image',
      url: URL.createObjectURL(file),
    }
    setMediaItems(newItems)
    message.success('Arquivo selecionado! Será substituído ao salvar.')
    return false
  }

  const addMediaItem = () => {
    setMediaItems([
      ...mediaItems,
      {
        type: 'image',
        duration: 5,
        order: mediaItems.length + 1,
      },
    ])
    message.info('Novo item de mídia adicionado')
  }

  const removeMediaItem = (index: number) => {
    const newItems = mediaItems.filter((_, i) => i !== index)
    setMediaItems(newItems.map((item, i) => ({ ...item, order: i + 1 })))
    message.success('Mídia removida')
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      return
    }

    const newItems = [...mediaItems]
    const draggedItem = newItems[draggedIndex]
    newItems.splice(draggedIndex, 1)
    newItems.splice(dropIndex, 0, draggedItem)

    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    setMediaItems(reorderedItems)
    setDraggedIndex(null)
    message.success('Ordem atualizada!')
  }

  const onFinish = async (values: any) => {
    if (mediaItems.length === 0) {
      message.warning('Adicione pelo menos uma mídia')
      return
    }

    const updatedMedia = mediaItems.filter((item) => item.id && item.file)
    const newMedia = mediaItems.filter((item) => !item.id)

    const files = [...updatedMedia, ...newMedia]
      .map((item) => item.file)
      .filter((file) => file !== undefined) as File[]

    if (newMedia.length > 0 && files.length < newMedia.length) {
      message.warning('Todos os novos itens devem ter um arquivo selecionado')
      return
    }

    setLoading(true)
    try {
      const existingCampaign = await campaignService.getById(id!)
      const currentMediaIds = mediaItems.filter((item) => item.id).map((item) => item.id!)
      const mediaToDelete = existingCampaign.media
        .filter((item) => item.id && !currentMediaIds.includes(item.id))
        .map((item) => item.id!)

      const campaignData = {
        name: values.name,
        media: mediaItems.map((item) => ({
          id: item.id,
          type: item.type,
          duration: item.duration,
          order: item.order,
        })),
        mediaToDelete,
      }

      await campaignService.update(id!, campaignData, files.length > 0 ? files : undefined)
      message.success('Campanha atualizada com sucesso!')
      navigate('/dashboard')
    } catch (error) {
      message.error('Erro ao atualizar campanha')
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <S.Container>
        <S.Content>
          <S.LoadingCard>
            <Spin size="large" />
            <Text style={{ marginTop: 16, display: 'block' }}>Carregando campanha...</Text>
          </S.LoadingCard>
        </S.Content>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/dashboard')}
          size="large"
        >
          <span className="hide-mobile">Voltar</span>
        </Button>
        <S.Title>
          <EditOutlined style={{ marginRight: 8 }} />
          <span className="hide-mobile">Editar Campanha</span>
          <span className="show-mobile">Editar</span>
        </S.Title>
        <div style={{ width: 80 }} className="hide-mobile" />
      </S.Header>

      <S.Content>
        <S.MainCard>
          <Form form={form} onFinish={onFinish} layout="vertical" size="large">
            <S.FormSection>
              <AntTitle level={4}>Informações Básicas</AntTitle>
              <Form.Item
                name="name"
                label="Nome da Campanha"
                rules={[{ required: true, message: 'Digite o nome da campanha' }]}
              >
                <Input
                  placeholder="Ex: Campanha Verão 2024"
                  prefix={<PictureOutlined style={{ color: '#bfbfbf' }} />}
                />
              </Form.Item>
            </S.FormSection>

            <Divider />

            <S.MediaSection>
              <S.SectionHeader>
                <div>
                  <AntTitle level={4} style={{ margin: 0 }}>
                    Mídias da Campanha
                  </AntTitle>
                  <Text type="secondary">
                    {mediaItems.length} {mediaItems.length === 1 ? 'mídia' : 'mídias'}
                  </Text>
                </div>
              </S.SectionHeader>

              {mediaItems.length === 0 ? (
                <S.EmptyStateCard>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Nenhuma mídia adicionada ainda."
                  />
                </S.EmptyStateCard>
              ) : (
                <S.MediaGrid>
                  {mediaItems.map((item, index) => (
                    <S.MediaCard
                      key={item.id || `new-${index}`}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      $isDragging={draggedIndex === index}
                    >
                      <S.MediaCardHeader>
                        <Badge
                          count={item.order}
                          showZero
                          style={{ backgroundColor: '#1890ff' }}
                        />
                        <Space>
                          {item.type === 'image' ? (
                            <Badge color="blue" text="Imagem" />
                          ) : (
                            <Badge color="purple" text="Vídeo" />
                          )}
                          {item.id && !item.file && (
                            <Badge color="green" text="Existente" />
                          )}
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => removeMediaItem(index)}
                            size="small"
                          />
                        </Space>
                      </S.MediaCardHeader>

                      <S.MediaPreview>
                        {item.url ? (
                          <>
                            {item.type === 'image' ? (
                              <img src={item.url} alt={`Preview ${index + 1}`} />
                            ) : (
                              <video src={item.url} controls />
                            )}
                          </>
                        ) : (
                          <S.EmptyPreview>
                            <PictureOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
                            <Text type="secondary">Nenhum arquivo selecionado</Text>
                          </S.EmptyPreview>
                        )}
                      </S.MediaPreview>

                      <S.MediaControls>
                        <Upload
                          beforeUpload={(file) => handleFileChange(file, index)}
                          showUploadList={false}
                          accept="image/*,video/*"
                        >
                          <Button
                            type={item.url ? 'default' : 'primary'}
                            block
                            icon={item.type === 'image' ? <PictureOutlined /> : <VideoCameraOutlined />}
                          >
                            {item.file ? 'Arquivo Novo Selecionado' : item.url ? 'Substituir Arquivo' : 'Selecionar Arquivo'}
                          </Button>
                        </Upload>

                        <S.ControlsRow>
                          <Tooltip title="Duração em segundos">
                            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                              <Space>
                                <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
                                <Text type="secondary">Duração:</Text>
                              </Space>
                              <InputNumber
                                min={1}
                                max={300}
                                value={item.duration}
                                onChange={(value) => {
                                  const newItems = [...mediaItems]
                                  newItems[index].duration = value || 5
                                  setMediaItems(newItems)
                                }}
                                style={{ width: 100 }}
                                addonAfter="s"
                              />
                            </Space>
                          </Tooltip>
                        </S.ControlsRow>

                        <S.DragHandle>
                          <DragOutlined /> Arraste para reordenar
                        </S.DragHandle>
                      </S.MediaControls>
                    </S.MediaCard>
                  ))}
                </S.MediaGrid>
              )}
            </S.MediaSection>

          </Form>
        </S.MainCard>
      </S.Content>

      <S.FloatingButtons>
        <S.FloatingButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={addMediaItem}
          size="large"
        >
          Adicionar Mídia
        </S.FloatingButton>
        <S.FloatingButton
          type="primary"
          icon={<SaveOutlined />}
          onClick={() => form.submit()}
          size="large"
          loading={loading}
          disabled={mediaItems.length === 0}
          $isPrimary
        >
          Salvar Alterações
        </S.FloatingButton>
      </S.FloatingButtons>
    </S.Container>
  )
}

export default EditCampaign
