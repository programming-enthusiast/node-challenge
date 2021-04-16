import util from 'util'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import User from '../server/services/users/users.model.js'
import Listing from '../server/services/listings/listings.model.js'
import ListingService from '../server/services/listingServices/listingServices.model.js'
import Field from '../server/services/fields/fields.model.js'


if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const DB_URI = process.env.DB_URI
const startDbPromise = async () => mongoose.connect(
  DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => err && console.warn({err})
)

const usersData = [
  {
    email: 'allenj@homelister.com',
    username: 'allenj',
    role: 'admin'
  },
  {
    email: 'jamesc@homelister.com',
    username: 'jamesc',
    role: 'admin'
  },
  {
    email: 'karlal@homelister.com',
    username: 'karlal',
    role: 'broker'
  },
  {
    email: 'andrem@homelister.com',
    username: 'andrem',
    role: 'broker'
  },
  {
    email: 'user1@homelister.com',
    username: 'user1',
    role: 'user'
  },
  {
    email: 'user2@homelister.com',
    username: 'user2',
    role: 'user'
  },
  {
    email: 'user3@homelister.com',
    username: 'user3',
    role: 'user'
  },
]

const fieldsData = [
  {
    name: 'price',
    label: 'Enter the Price',
    type: 'number',
    isCoreField: true,
  },
  {
    name: 'commission',
    label: 'Enter the Commission (2%-6%)',
    type: 'number',
    isCoreField: true,
  },
  {
    name: 'lotSize',
    label: 'Enter the Lot Size in Acres',
    type: 'number',
    isCoreField: true,
  },
  {
    name: 'bed',
    label: 'Number of Bedrooms',
    type: 'number',
    isCoreField: true,
  },
  {
    name: 'bath',
    label: 'Number of Bathrooms',
    type: 'number',
    isCoreField: true,
  },
  {
    name: 'hotWater',
    label: 'Has Hot Water (Yes/No)',
  },
  {
    name: 'squareFootage',
    label: 'Square Footage',
    type: 'number',
  },
  {
    name: 'stories',
    label: 'Number of Stories',
    type: 'number',
  },
  {
    name: 'primaryResidence',
    label: 'Is This Your Primary Residence? (Yes/No)',
  },
  {
    name: 'outdoorSpace',
    label: 'Does the Property Have an Outdoor Space? (Yes/No)',
  },

]

const listingServicesData = [
  {
    stateCode: 'NJ',
    feeToList: 75,
    cancellationFee: 70,
  },
  {
    stateCode: 'NY',
    feeToList: 140,
    cancellationFee: 85,
  },
  {
    stateCode: 'CA',
    feeToList: 100,
    cancellationFee: 50,
  },
]

const listingsData = [
  {
    address: '123 Main Street',
    stateCode: 'NJ',
    price: 147000,
    commission: 3.5,
    lotSize: 3,
    bed: 4,
    bath: 3,
  },
  {
    address: '456 Oak St.',
    stateCode: 'NJ',
    price: 200001,
    commission: 4,
    lotSize: 1.75,
    bed: 3,
    bath: 3,
  },
  {
    address: '123 Broadway',
    stateCode: 'NY',
    price: 5000000,
    commission: 2.5,
    lotSize: 0.25,
    bed: 3,
    bath: 2,
  },
  {
    address: '456 Fulton St.',
    stateCode: 'NY',
    price: 750000,
    commission: 3,
    lotSize: 0.25,
    bed: 1,
    bath: 1,
  },
  {
    address: '789 Atlantic Ave.',
    stateCode: 'NY',
    price: 1750000,
    commission: 2.5,
    lotSize: 0.5,
    bed: 2,
    bath: 2,
  },
  {
    address: '123 Castro St.',
    stateCode: 'CA',
    price: 2800000,
    commission: 3,
    lotSize: 0.5, // acres
    bed: 4,
    bath: 2,
  },
  {
    address: '456 Valencia St.',
    stateCode: 'CA',
    price: 5000000,
    commission: 5.1,
    lotSize: 0.45, // acres
    bed: 3,
    bath: 1,
  },
  {
    address: '789 Market St.',
    stateCode: 'CA',
    price: 10000000,
    commission: 2.0,
    lotSize: 0.25, // acres
    bed: 5,
    bath: 3,
  },
]

const addBrokerToListingServices = (listingServices, karla, andre) => {
  let selected = 'karla'
  return listingServices.map(listingService => {
    listingService.broker = selected === 'karla' ? karla : andre

    // alternate who is the broker
    if (selected === 'karla') selected = 'andre'
    else selected = 'karla'

    return listingService
  })
}

const addFieldsToListingServices = (listingServices, fields) => {
  // NJ
  listingServices[0].fields = [
    { field: fields[0]},
    { field: fields[1]},
    { field: fields[2]},
    { field: fields[4]},
    { field: fields[5]},
    { field: fields[6]},
    { field: fields[7]},
  ],
  // NY
  listingServices[1].fields = [
    { field: fields[0]},
    { field: fields[2]},
    { field: fields[4]},
    { field: fields[5]},
    { field: fields[7]},
    { field: fields[9]},
  ],
  // CA
  listingServices[2].fields = [
    { field: fields[3]},
    { field: fields[4]},
    { field: fields[5]},
    { field: fields[6]},
    { field: fields[8]},
    { field: fields[9]},
  ]
  return listingServices
}

const addUserToListing = (listings, users) => {
  listings[0].user = users[0]
  listings[1].user = users[1]
  listings[2].user = users[2]
  listings[3].user = users[3]
  listings[4].user = users[4]
  listings[5].user = users[5]
  listings[5].user = users[5]
  listings[6].user = users[5]
  listings[7].user = users[6]
  return listings
}

const addListingServiceToListing = (listings, listingsServices) => {
  return listings.map(listing => {
    listing.listingService = listingsServices.find(
      listingService => listingService.stateCode === listing.stateCode,
    )
    return listing
  })
}

const addFieldsToListing = listings => {
  return listings.map((listing, index) => {
    const allListingFields = listing.listingService.fields.map(field => {
      return { field: field.field, value: '' }
    })
    switch (index) {
      // NJ listingService
      case 0:
        listing.fields = [
          allListingFields[0],
          allListingFields[4],
          allListingFields[5],
          allListingFields[6],
        ]
        break
      case 1:
        listing.fields = [
          allListingFields[0],
          allListingFields[1],
          allListingFields[2],
          allListingFields[5],
        ]
        break
      // NY listingService
      case 2:
        listing.fields = [] // simulates a brand new listing
        break
      case 3:
        listing.fields = [
          allListingFields[0],
          allListingFields[2],
          allListingFields[3],
          allListingFields[5],
        ]
        break
      case 4:
        listing.fields = [
          allListingFields[0],
          allListingFields[1],
          allListingFields[2],
          allListingFields[3],
          allListingFields[4],
          allListingFields[5],
        ]
        break
      // CA listingService
      case 5:
        listing.fields = [
          allListingFields[0],
          allListingFields[2],
          allListingFields[5],
        ]
        break
      case 6:
        listing.fields = [
          allListingFields[2],
          allListingFields[3],
          allListingFields[4],
          allListingFields[5],
        ]
        break
      case 7:
        listing.fields = [
          allListingFields[0],
          allListingFields[1],
          allListingFields[2],
          allListingFields[3],
          allListingFields[4],
          allListingFields[5],
        ]
      default:
        listing.fields = []
    }
    return listing
  })
}

export const dropDatabase = async () => {
  console.log('Removing Listing collection')
  await Listing.remove()
  console.log('Success!')

  console.log('Removing ListingService collection')
  await ListingService.remove()
  console.log('Success!')

  console.log('Removing User collection')
  await User.remove()
  console.log('Success!')

  console.log('Removing Field collection')
  await Field.remove()
  console.log('Success!')
}

export const populate = async () => {
  console.log('Inserting Users')
  const users = await User.insertMany(usersData)
  console.log('Success!')

  console.log('Inserting Fields')
  const fields = await Field.insertMany(fieldsData)
  console.log('Success!')

  console.log('Inserting ListingServices')
  const listingServicesWithBroker = await addBrokerToListingServices(listingServicesData, users[2], users[3])
  const listingServicesWithFields = await addFieldsToListingServices(listingServicesWithBroker, fields)
  const listingServices = await ListingService.insertMany(listingServicesWithFields)
  console.log('Success!')

  console.log('Inserting Listings')
  try {
    const listingsWithUser = await addUserToListing(listingsData, users)
    const listingsWithListingService = await addListingServiceToListing(listingsWithUser, listingServices)
    const listingsWithFields = await addFieldsToListing(listingsWithListingService)
    await Listing.insertMany(listingsWithFields)
  } catch (err) {
    console.error(err)
  }
  console.log('Success!')
}

const seed = async () => {
  try {
    console.log('Opening connection to MongoDB...')
    await startDbPromise()
    console.log('MongoDB connection opened')
    console.log('---   ---   ---   ---   ---   ---   ---   ---   ---')
    await dropDatabase()
    console.log('---   ---   ---   ---   ---   ---   ---   ---   ---')
    await populate()
  } catch (err) {
    process.exit(0)
  } finally {
    process.exit(0)
  }
}

seed()
