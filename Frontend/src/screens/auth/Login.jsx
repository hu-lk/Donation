import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Link, useNavigate } from 'react-router-dom'
import style from './Login.module.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    // Perform validation, e.g., check if email and password are not empty
    if (!email && password != null) {
      setError('Please provide email')
      return
    } else if (email != null && !password) {
      setError('Please provide password')
      return
    } else {
      setError('Please provide both email and password')
    }

    // Make an API call to your backend for authentication
    try {
      // Replace the following line with your actual API endpoint for authentication
      const response = await fetch('http://localhost:4001/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        // Authentication successful, redirect to the dashboard
        navigate('/user/dashboard')
      } else {
        // Authentication failed, handle error
        setError('Invalid email or password')
      }
    } catch (error) {
      console.error('Error during authentication:', error)
      setError('An unexpected error occurred')
    }
  }

  return (
    <div className={style.LoginContainer}>
      <Card className={style.CardContainer}>
        <h2 className={style.CardHeader}>Login</h2>
        <div className='p-fluid'>
          <div className='p-field'>
            <label className={style.FieldLabel} htmlFor='email'>
              Email
            </label>
            <InputText
              id='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='p-field'>
            <label className={style.FieldLabel} htmlFor='password'>
              Password
            </label>
            <Password
              id='password'
              feedback={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className={style.ErrorMessage}>{error}</div>}
          <Button
            label='Login'
            icon='pi pi-sign-in'
            className='p-mt-3'
            onClick={handleLogin}
          />
          <div className='p-mt-3'>
            Not yet registered? <Link to='/auth/register'>Register here</Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Login
