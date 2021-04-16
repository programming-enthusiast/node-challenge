import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

import styles from '../../styles/styles.module.css'

const SingleListing = () => {
  const router = useRouter()

  const [listing, setListing] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`listings/${router.query.id}`)
        if (!response?.data) throw new Error('No data')
        setListing(response.data)
      } catch (err) {
        setError(true)
      }
    }
    if (router.query.id) fetch()
  }, [router.query.id])

  const updateField = (event) => {
    const { name, value } = event.target

    // if the field is not in the listing.fields array, we must append it
    const fieldIndex = listing.fields.findIndex(field => field.field.name === name)
    console.log({ name, fieldIndex, fields: listing.fields })
    if (fieldIndex === -1 ) {
      const listingServiceField = listing.listingService.fields.find(
        field => field.field.name === name,
      )
      console.log({ listingServiceField })
      return setListing({
        ...listing,
        fields: [...listing.fields, { value: value, field: listingServiceField.field }]
      })
    }

    // if the isCoreField flag is set, we update a value directly on the listing
    const isCoreField = listing.fields[fieldIndex].field.isCoreField
    if (isCoreField) {
      return setListing({ ...listing, [name]: value })
    }

    // otherwise we can simply update the field in the field array
    const updatedFields = [...listing.fields]
    updatedFields[fieldIndex].value = value
    setListing({ ...listing, fields: updatedFields })
  }

  const updateListing = async () => {
    const response = await axios.put(`listings/${listing._id}`, listing)
    console.log({ response })
  }

  console.log({ listing })

  if (error) return <div>Error</div>
  if (!listing) return <div>Loading</div>
  return (
    <div className={styles.main}>
      <Link href="/listings">
        <div style={{ padding: '20px 0', cursor: 'pointer' }}>{`<- All Listings`}</div>
      </Link>
      <h1 className={styles.title}>
        {`${listing.address}, ${listing.stateCode}`}
      </h1>
      <div className={styles.item}>{`${listing.bed} bed, ${listing.bath} bath`}</div>
      <div className={styles.item}>{`Price: $${listing.price}`}</div>
      <div className={styles.item}>{`Commission: ${listing.commission}%`}</div>
      <div className={styles.item}>{`Lot Size: ${listing.lotSize} acres`}</div>
      {/* dynamic fields */}
      {listing.fields.filter(field => !field.field.isCoreField).map(field => (
        <div className={styles.item} key={field.id}>
          {`${field.field.label}: ${field.value}`}
        </div>
      ))}
      <div style={{ height: 20 }} />
      <hr />
      <div style={{ height: 20 }} />
      <div className={styles.item}>Editable Fields</div>
      <ul>
        {listing.listingService.fields.map(field => {
          const listingField = listing.fields.find(lField => lField.field.name === field.field.name)
          if (field.field.name === 'bed') console.log({ listingField, listing })
          return (
            <li key={field.field._id}>
              <label>{field.field.label}</label>
              <input
                type={field.field.type}
                value={field.field.isCoreField ? listing[field.field.name] : (listingField?.value ?? '')}
                name={field.field.name}
                placeholder={`Enter ${field.field.type}`}
                onChange={updateField}
              />
            </li>
          )
        })}
      </ul>
      <button  type="submit" onClick={updateListing}>Save Changes</button>
    </div>
  )
}

export default SingleListing
