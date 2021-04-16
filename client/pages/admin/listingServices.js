import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

import styles from '../../styles/styles.module.css'

const ListingServices = () => {

  const [listingServices, setListingServices] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('listingServices')
        if (!response?.data) throw new Error('No data')
        setListingServices(response.data)
      } catch (err) {
        setError(true)
      }
    }
    fetch()
  }, [])

  if (error) return <div>Error</div>
  if (!listingServices) return <div>Loading</div>
  return (
    <div className={styles.main}>
      <Link href="/">
        <div style={{ padding: '20px 0', cursor: 'pointer' }}>{`<- Home`}</div>
      </Link>
      <h1 className={styles.title}>Listing Services</h1>
      {listingServices.map(listingService => (
        <div key={listingService._id}>
          <div className={styles.description}>{listingService.stateCode}</div>
          <ul>
            <li>Fee to List: ${listingService.feeToList}</li>
            <li>Cancellation Fee: ${listingService.cancellationFee}</li>
            <li>Fields</li>
            <li>
              <ul>
                {listingService.fields.map(field => (
                  <li key={field._id}>
                    Name: {field.field.name}, Type: {field.field.type}, Core: {field.field.isCoreField ? 'Yes' : 'No'}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      ))}
    </div>
  )
}

export default ListingServices
