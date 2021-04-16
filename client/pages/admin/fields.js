import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

import styles from '../../styles/styles.module.css'

const Fields = () => {

  const [fields, setFields] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('fields')
        if (!response?.data) throw new Error('No data')
        setFields(response.data)
      } catch (err) {
        setError(true)
      }
    }
    fetch()
  }, [])

  if (error) return <div>Error</div>
  if (!fields) return <div>Loading</div>
  return (
    <div className={styles.main}>
      <Link href="/">
        <div style={{ padding: '20px 0', cursor: 'pointer' }}>{`<- Home`}</div>
      </Link>
      <h1 className={styles.title}>Fields</h1>
      {fields.map(field => (
        <div key={field._id}>
          <div className={styles.description}>{field.name}</div>
          <ul>
            <li>Label: {field.label}</li>
            <li>Type: {field.type}</li>
            <li>Core: {field.isCoreField.toString()}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Fields
