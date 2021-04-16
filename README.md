# node-challenge

A coding assignment for prospective hires to test Node.js, Mongo, and Express abilities

## Setup

- start your `mongod` server and create a local mongoDB database with the name `homelister-challenge`
- run `npm i` and then `npm run seed` in the `server` root to populate your DB with test data
- run `npm run dev` in the `server` root to start the app (it is using `nodemon`, so when you save your changes the app will restart automatically)
- run `npm i` and then `npm run dev` in the `client` root to start the Next.js app (Next uses HMR, so when you save your changes the page will reload automatically)

## Data Architecture

- `User`s can have multiple `Listing`s for houses they are selling
- `Listing`s belong to a single `ListingService`
  - `ListingService` represents an [MLS](https://www.investopedia.com/terms/m/multiple-listing-service-mls.asp), a third-party database of listings covering a geographically bounded real-estate market. After our users enter into a contract with us, our brokers enter their listings into an MLS.
- A `ListingService`s has many `Field`s (aka which pieces of data are required by the MLS), and user-entered values for these fields are stored on the `Listing` in a `fields` array
- `Field`s can belong to many `ListingService`s

## Challenge Overview

I'm including a barebones app that I want you to use as a base to improve on. It is a very simplified imitation of the real HomeLister application using the same tech stack, and the tasks below reflect the kinds of big picture work you'd be doing as part of the HomeLister team. There is a client component (Next.js app), but the main focus of these tasks is writing backend code.

For this challenge, it's not about how much you can do or how fast or what fancy tricks you know, the real value is when we sit down together and you talk me through your decisions.

So **don't** try to finish everything on this list. It is intentionally long. Pick what you think is most important to make the app more robust. Feel free to go off list. Ping me with any questions. Feel free to spend as much or as little time as you want - 1-2 hrs is probably good, just do enough that we can talk through the decisions you made and how you approached it.

Please start a git repo with this so I can look at your history (create a repo on github and add me - `allenhj`). Check in the entire project first before you start making changes, then commit your changes as you go.

(These are not ordered by importance, determining that is up to you:)

- Add Tests
  - Add Jest tests to the project (e.g. for the models, API routes)
- Add Authentication
  - Add passport.js to the project
  - Add an authentication method using the authentication strategy you think would be best for a modern web app
  - Modify `client/pages/signin.js` so that it works with your chosen authentication strategy
- Protect Routes (prerequisite: 'Add Authentication' step)
  - Add route protection for listings so that only the user that owns it or an admin can access it
  - Add admin route protection for routes only admins should have access to (up to you to determine which ones)
- Consolidate Models and Migrate or Patch
  - Case 1
    - Context: For historical reasons, the `ListingService`'s `field` property is an array of objects that contains a `ref` to the `Field` Schema, plus some other data, but we don't want this to be the case
    - Task: Refactor the `Field` Schema to include all the properties in `listingService`'s `field` property, and make sure all existing `ListingService` docs with field refs in their `fields` array are updated to remove the properties that were added to the updated `Field` Schema, and conversely, add those properties and values to the existing `Field` docs
  - Case 2
    - Context: Some properties originally put on the `Listing` Schema really should be dynamic `Field`s and stored in `listing.fields` instead. As a hack, we created `Field` docs for them, but with an `isCoreField` flag. That way when we see it on the frontend we know to update `listing[propertyName]` instead of `listing.fields[fieldId]` (you can see how this works in `client/pages/listing/[id].js`)
    - Task: For all fields with `isCoreField: true`, remove the matching properties from the `Listing` Schema and patch listings to remove those property:value pairs and append `Field` versions to `listing.fields`
- Connect an API
  - Connect to one of the following real estate APIs and a) add the important data from the response to the listing model or b) provide it as an API route from our server that is called and displayed clientside on `clients/pages/listing/[:id].js`:
    - [WalkScore](https://www.walkscore.com/professional/public-transit-api.php): Walk and Transit scores
    - [Yelp Categories + Search APIs](https://www.yelp.com/developers/documentation/v3): `restaurant`s and `shopping` (Yelp categories) nearby the listing address
    - Any other API you like or have worked with in the past
    - API keys are in `server/.env`
    - Hint: You may need to update the `Listing` Schema and patch existing docs with additional data to provide to these APIs
- Add TypeScript
  - We use TypeScript for our Next.js/React app and would love to transition the backend to use it in the future as well
- Create a Microservice
  - Pull out a service (or your third-party API service if you made one) and turn it into a standalone microservice
  - Bonus points for hosting it somewhere or explaining how you would do so
- General Improvements or Features
  - This challenge app has many flaws, and you can spend time refactoring anything that calls out to you
  - If none of the above tasks speaks to you, feel free to build something else inside this application
