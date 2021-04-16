import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/styles.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sell Your Home - HomeLister</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/signin">Sign In</Link>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>For Users</h1>
        <Link href="/listings">
          <h2 className={styles.description}>
            Listings
          </h2>
        </Link>

        <h1 className={styles.title}>For Admins</h1>
        <Link href="/admin/users">
          <h2 className={styles.description}>
            Users
          </h2>
        </Link>

        <Link href="/admin/listingServices">
          <h2 className={styles.description}>
            Listing Services
          </h2>
        </Link>

        <Link href="/admin/fields">
          <h2 className={styles.description}>
            Fields
          </h2>
        </Link>
      </main>

      <footer className={styles.footer}>
        <img src="homelister_logo.png" style={{ height: 25 }} />
        2021
      </footer>
    </div>
  )
}
