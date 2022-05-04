import sanityClient from '@sanity/client'

/**
    1.Get projectId from project manage page (Run below command in powershell)
        a. cd studio
        b. sanity manage
    2.Get dataset from "dataset" tab in sanity project manage page
    3.Set the apiVersion as the date of creation 
    4.Get token from "api" tab in sanity project manage page
    5.useCdn make it false 

    important!
    6.On sanity project manage page undeer "api" tab, make sure to add CORS origin of project, 
    in this case, add https://localhost:3000 and check allow crudentials, if
    this step is missed out, it will not add user to Sanity "Users" document when login with metamask wallet
**/

const client = sanityClient({
    projectId: 'aaj7w5f5',
    dataset: 'production',
    apiVersion: '2022-04-26',
    token: 'skobG9qMTmLN6Y8nF9pgjyIocAfJCSPDTL634jmfhJ2KSjF4SsKNNHg8SC6mNw9UcoMJEwWFrOcp7OBklM21KQYrzoRGyXrWGQEDYoukL8dmdcDT5HSK3AAITuTiNixKZv40GDHnZJO5awpbvsjKAS78EFTqngA9WCq6DmkOZUfJXijV7I4j',
    useCdn: false
})

export {client} 