import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { authService } from '../../services/auth'
import * as S from './styles'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    setLoading(true)
    try {
      const response = await authService.login(values)
      localStorage.setItem('token', response.access_token)
      message.success('Login realizado com sucesso!')
      navigate('/dashboard')
    } catch (error) {
      message.error('Email ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <S.Container>
      <S.LoginCard>
        <S.Title>Sistema de Propaganda</S.Title>
        <S.Subtitle>Faça login para continuar</S.Subtitle>
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu email!' },
              { type: 'email', message: 'Email inválido!' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Senha"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </S.LoginCard>
    </S.Container>
  )
}

export default Login

