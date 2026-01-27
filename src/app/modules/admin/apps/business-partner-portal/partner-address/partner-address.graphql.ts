/**
 * @aurora-generated
 * @source cliter/business-partner-portal/partner-address.aurora.yaml
 */
import gql from 'graphql-tag';

export const fields = `
    rowId
    businessPartnerId
    businessPartner {
        id
        rowId
        externalId
        code
        type
        name
        tin
        email
        website
        phone
        phoneCountryPrefix
        phoneSanitized
        isActive
        meta
    }
    type
    label
    addressLine1
    addressLine2
    city
    postalCode
    countryId
    country {
        id
        iso3166Alpha2
        iso3166Alpha3
        iso3166Numeric
        customCode
        prefix
        image
        sort
        administrativeAreas
        latitude
        longitude
        zoom
        mapType
        availableLangs
        id
        name
        slug
        administrativeAreaLevel1
        administrativeAreaLevel2
        administrativeAreaLevel3
    }
    administrativeAreaLevel1Id
    administrativeAreaLevel1 {
        id
        code
        customCode
        name
        slug
        latitude
        longitude
        zoom
        mapType
    }
    administrativeAreaLevel2Id
    administrativeAreaLevel2 {
        id
        code
        customCode
        name
        slug
        latitude
        longitude
        zoom
        mapType
    }
    administrativeAreaLevel3Id
    administrativeAreaLevel3 {
        id
        code
        customCode
        name
        slug
        latitude
        longitude
        zoom
        mapType
    }
    latitude
    longitude
    isPrimary
    isActive
    notes
    createdAt
    updatedAt
`;

export const relationsFields = `
    businessPartnerPortalGetBusinessPartners (
        query: $queryBusinessPartners
        constraint: $constraintBusinessPartners
    ) {
        id
        rowId
        externalId
        code
        type
        name
        tin
        email
        website
        phone
        phoneCountryPrefix
        phoneSanitized
        isActive
        meta
    }
    commonGetCountries (
        query: $queryCountries
        constraint: $constraintCountries
    ) {
        id
        iso3166Alpha2
        iso3166Alpha3
        iso3166Numeric
        customCode
        prefix
        image
        sort
        administrativeAreas
        latitude
        longitude
        zoom
        mapType
        availableLangs
        id
        name
        slug
        administrativeAreaLevel1
        administrativeAreaLevel2
        administrativeAreaLevel3
    }
    commonGetAdministrativeAreasLevel1 (
        query: $queryAdministrativeAreasLevel1
        constraint: $constraintAdministrativeAreasLevel1
    ) {
        id
        code
        customCode
        name
        slug
        latitude
        longitude
        zoom
        mapType
    }
    commonGetAdministrativeAreasLevel2 (
        query: $queryAdministrativeAreasLevel2
        constraint: $constraintAdministrativeAreasLevel2
    ) {
        id
        code
        customCode
        name
        slug
        latitude
        longitude
        zoom
        mapType
    }
    commonGetAdministrativeAreasLevel3 (
        query: $queryAdministrativeAreasLevel3
        constraint: $constraintAdministrativeAreasLevel3
    ) {
        id
        code
        customCode
        name
        slug
        latitude
        longitude
        zoom
        mapType
    }
`;

// default methods
export const paginationQuery = gql`
    query BusinessPartnerPortalPaginatePartnerAddresses(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        pagination: businessPartnerPortalPaginatePartnerAddresses(
            query: $query
            constraint: $constraint
        ) {
            total
            rows
            count
        }
    }
`;

export const getQuery = gql`
    query BusinessPartnerPortalGetPartnerAddresses(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        objects: businessPartnerPortalGetPartnerAddresses(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const getRelations = gql`
    query BusinessPartnerPortalGetPartnerAddressesRelations (
        $queryBusinessPartners: QueryStatement
        $constraintBusinessPartners: QueryStatement
        $queryCountries: QueryStatement
        $constraintCountries: QueryStatement
        $queryAdministrativeAreasLevel1: QueryStatement
        $constraintAdministrativeAreasLevel1: QueryStatement
        $queryAdministrativeAreasLevel2: QueryStatement
        $constraintAdministrativeAreasLevel2: QueryStatement
        $queryAdministrativeAreasLevel3: QueryStatement
        $constraintAdministrativeAreasLevel3: QueryStatement
    ) {
        ${relationsFields}
    }
`;

export const findByIdQuery = gql`
    query BusinessPartnerPortalFindPartnerAddressById(
        $id: ID
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindPartnerAddressById(
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const findByIdWithRelationsQuery = gql`
    query BusinessPartnerPortalFindPartnerAddressByIdWithRelations (
        $id: ID
        $constraint: QueryStatement
        $queryBusinessPartners: QueryStatement
        $constraintBusinessPartners: QueryStatement
        $queryCountries: QueryStatement
        $constraintCountries: QueryStatement
        $queryAdministrativeAreasLevel1: QueryStatement
        $constraintAdministrativeAreasLevel1: QueryStatement
        $queryAdministrativeAreasLevel2: QueryStatement
        $constraintAdministrativeAreasLevel2: QueryStatement
        $queryAdministrativeAreasLevel3: QueryStatement
        $constraintAdministrativeAreasLevel3: QueryStatement
    ) {
        object: businessPartnerPortalFindPartnerAddressById (
            id: $id
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
        ${relationsFields}
    }
`;

export const findQuery = gql`
    query BusinessPartnerPortalFindPartnerAddress(
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        object: businessPartnerPortalFindPartnerAddress(
            query: $query
            constraint: $constraint
        ) {
            id
            #FIELDS
        }
    }
`;

export const createMutation = gql`
    mutation BusinessPartnerPortalCreatePartnerAddress (
        $payload: BusinessPartnerPortalCreatePartnerAddressInput!
    ) {
        businessPartnerPortalCreatePartnerAddress (
            payload: $payload
        ) {
            ${fields}
        }
    }
`;

export const insertMutation = gql`
    mutation BusinessPartnerPortalCreatePartnerAddresses(
        $payload: [BusinessPartnerPortalCreatePartnerAddressInput]!
    ) {
        businessPartnerPortalCreatePartnerAddresses(payload: $payload)
    }
`;

export const updateByIdMutation = gql`
    mutation BusinessPartnerPortalUpdatePartnerAddressById (
        $payload: BusinessPartnerPortalUpdatePartnerAddressByIdInput!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdatePartnerAddressById (
            payload: $payload
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const updateMutation = gql`
    mutation BusinessPartnerPortalUpdatePartnerAddresses (
        $payload: BusinessPartnerPortalUpdatePartnerAddressesInput!
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalUpdatePartnerAddresses (
            payload: $payload
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteByIdMutation = gql`
    mutation BusinessPartnerPortalDeletePartnerAddressById (
        $id: ID!
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeletePartnerAddressById (
            id: $id
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;

export const deleteMutation = gql`
    mutation BusinessPartnerPortalDeletePartnerAddresses (
        $query: QueryStatement
        $constraint: QueryStatement
    ) {
        businessPartnerPortalDeletePartnerAddresses (
            query: $query
            constraint: $constraint
        ) {
            ${fields}
        }
    }
`;
