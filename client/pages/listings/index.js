import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

import styles from '../../styles/styles.module.css'

const Listings = () => {

  const [listings, setListings] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('listings')
        if (!response?.data) throw new Error('No data')
        setListings(response.data)
      } catch (err) {
        setError(true)
      }
    }
    fetch()
  }, [])

  if (error) return <div>Error</div>
  if (!listings) return <div>Loading</div>
  return (
    <div className={styles.main}>
      <Link href="/">
        <div style={{ padding: '20px 0', cursor: 'pointer' }}>{`<- Home`}</div>
      </Link>
      <h1 className={styles.title}>Listings</h1>
      {listings.map(listing => (
        <Link href={`/listings/${listing._id}`} key={listing._id}>
          <div className={styles.description}>
            {listing.address}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Listings
