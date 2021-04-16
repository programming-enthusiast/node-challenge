import React from 'react'
import Link from 'next/link'
import styles from '../styles/styles.module.css'

const Signin = () => {
  // @TODO: implement
  const signin = (event) => {
    event.preventDefault()
    console.log('Signin button clicked')
  }

  return (
    <div className={styles.container}>
      <Link href="/">
        <div style={{ padding: '20px 0', cursor: 'pointer' }}>{`<- Home`}</div>
      </Link>
      <h1 className={styles.title}>Signin</h1>
      <form onSubmit={signin} className={styles.main} style={{ width: 300 }}>
        <label>Username</label>
        <input type="text" />
        <div style={{ height: 20 }} />
        <label>Password</label>
        <input type="text" />
        <div style={{ height: 20 }} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default Signin
