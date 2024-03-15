import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Link, useNavigate } from 'react-router-dom'
import style from './Register.module.css'

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async () => {
    // Perform validation, e.g., check if email, password, and confirmPassword are not empty
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Make an API call to your backend for registration
    try {
      // Replace the following line with your actual API endpoint for registration
      const response = await fetch('http://localhost:4001/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        // Registration successful, redirect to the dashboard or login page
        navigate('auth/login')
      } else {
        // Registration failed, handle error
        setError('Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Error during registration:', error)
      setError('An unexpected error occurred')
    }
  }

  return (
    <div className={style.RegisterContainer}>
      <Card className={`${style.CardContainer} p-shadow-10`}>
        <h2 className={style.CardHeader}>Register</h2>
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
          <div className='p-field'>
            <label className={style.FieldLabel} htmlFor='confirmPassword'>
              Confirm Password
            </label>
            <Password
              id='confirmPassword'
              feedback={false}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <div className={style.ErrorMessage}>{error}</div>}
          <Button
            label='Register'
            icon='pi pi-check'
            className='p-mt-3'
            onClick={handleRegister}
          />
          <div className='p-mt-3'>
            Already have an account? <Link to='/auth/login'>Login here</Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Register
