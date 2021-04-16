import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

import styles from '../../styles/styles.module.css'

const Users = () => {

  const [users, setUsers] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('users')
        if (!response?.data) throw new Error('No data')
        setUsers(response.data)
      } catch (err) {
        setError(true)
      }
    }
    fetch()
  }, [])

  if (error) return <div>Error</div>
  if (!users) return <div>Loading</div>
  return (
    <div className={styles.main}>
      <Link href="/">
        <div style={{ padding: '20px 0', cursor: 'pointer' }}>{`<- Home`}</div>
      </Link>
      <h1 className={styles.title}>Users</h1>
      {users.map(user => (
        <div key={user._id}>
          <div className={styles.description}>{user.username}</div>
          <ul>
            <li>Email: {user.email}</li>
            <li>Role: {user.role}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Users
