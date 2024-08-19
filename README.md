# Tictag Test

[![GitHub Actions Build](https://github.com/rafiandria23/tictag-test/actions/workflows/ci.yaml/badge.svg)](https://github.com/rafiandria23/tictag-test/actions/workflows/ci.yaml)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_tictag-test&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=rafiandria23_tictag-test)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_tictag-test&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rafiandria23_tictag-test)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_tictag-test&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rafiandria23_tictag-test)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_tictag-test&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=rafiandria23_tictag-test)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_tictag-test&metric=coverage)](https://sonarcloud.io/summary/new_code?id=rafiandria23_tictag-test)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_tictag-test&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=rafiandria23_tictag-test)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_tictag-test&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rafiandria23_tictag-test)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_tictag-test&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=rafiandria23_tictag-test)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_tictag-test&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=rafiandria23_tictag-test)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_tictag-test&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=rafiandria23_tictag-test)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_tictag-test&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rafiandria23_tictag-test)

Test for Tictag.

## Apps

- [API](apps/api/)
- [Mobile](apps/mobile/)

## Environment

Environment variables are available in `.env.example` file inside each app. Please note that for mobile app, I recommend to use machine's IP address for the API base URL, especially when running Android emulator.

## Quick Start

```zsh
# Install Nx CLI
yarn add --global nx

# Install project dependencies
yarn

# Run API
nx run api:serve

# Run Mobile
nx run mobile:start
```

## Guides

### Data Seeding

1. Send an HTTP POST request to sign up as a staff to create an account with `staff` role.
2. Send an HTTP POST request to create products.

### Create Warranty Claim

1. Sign up as a customer to create an account with `customer` role, this can also be done via the mobile app.
2. In the the mobile app, press on one of the product cards you've created earlier and hit the **Claim warranty** button to create a claim.

### Approve/Reject a Warranty Claim

1. Once the claim has been made, the default status is `pending`. Send an HTTP PATCH request to approve/reject a claim.
2. In the mobile app, pull down the **Warranty Claims** tab screen to refresh the list.


## API Docs

Available at `/`.

## License

[MIT](LICENSE)
