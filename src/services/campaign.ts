import api from './api'

export interface MediaItem {
  id?: string
  file?: File
  url?: string
  type: 'image' | 'video'
  duration: number
  order: number
  filename?: string
}

export interface Campaign {
  id: string
  name: string
  media: MediaItem[]
  createdAt: string
  updatedAt: string
}

export interface CreateCampaignDto {
  name: string
  media: {
    type: 'image' | 'video'
    duration: number
    order: number
  }[]
}

export const campaignService = {
  getAll: async (): Promise<Campaign[]> => {
    const response = await api.get<Campaign[]>('/campaigns')
    return response.data
  },

  getById: async (id: string): Promise<Campaign> => {
    const response = await api.get<Campaign>(`/campaigns/${id}`)
    const campaign = response.data

    // Get base URL from environment (e.g., http://192.168.31.191:3000)
    const apiBaseUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL || ''

    // Add full URLs to media items
    campaign.media = campaign.media.map((item: MediaItem) => {
      let mediaUrl = item.url || `/uploads/${item.filename || ''}`

      // If URL is already absolute, use it as is
      if (mediaUrl.startsWith('http')) {
        return { ...item, url: mediaUrl }
      }

      // Construct full URL using API base URL
      if (apiBaseUrl) {
        // Ensure mediaUrl starts with /
        if (!mediaUrl.startsWith('/')) {
          mediaUrl = `/${mediaUrl}`
        }
        // Combine base URL with media path
        mediaUrl = `${apiBaseUrl}${mediaUrl}`
      }
      // If no base URL, use relative URL (will work with proxy in dev)

      return { ...item, url: mediaUrl }
    })

    return campaign
  },

  create: async (data: CreateCampaignDto, files: File[]): Promise<Campaign> => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('media', JSON.stringify(data.media))

    files.forEach((file) => {
      formData.append('files', file)
    })

    const response = await api.post<Campaign>('/campaigns', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  update: async (
    id: string,
    data: {
      name?: string
      media: {
        id?: string
        type: 'image' | 'video'
        duration: number
        order: number
      }[]
      mediaToDelete?: string[]
    },
    files?: File[],
  ): Promise<Campaign> => {
    const formData = new FormData()
    if (data.name) {
      formData.append('name', data.name)
    }
    formData.append('media', JSON.stringify(data.media))
    if (data.mediaToDelete && data.mediaToDelete.length > 0) {
      formData.append('mediaToDelete', JSON.stringify(data.mediaToDelete))
    }

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append('files', file)
      })
    }

    const response = await api.put<Campaign>(`/campaigns/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/campaigns/${id}`)
  },
}
