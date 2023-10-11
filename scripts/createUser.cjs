const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Retrieve Clerk secret key from environment variables
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

// Exit if the Clerk secret key is not available
if (!CLERK_SECRET_KEY) {
  console.error('Clerk secret key is missing');
  process.exit(1);
}

// Create a new Clerk user with an email address and public metadata
async function createUser(email, publicMetadata) {
  const config = {
    headers: {
      Authorization: `Bearer ${CLERK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  const body = {
    email_address: [email], // As per the API spec, it's an array
    external_id: null,
    first_name: null,
    last_name: null,
    phone_number: null,
    web3_wallet: null,
    username: null,
    password: null,
    password_digest: null,
    password_hasher: null,
    public_metadata: publicMetadata, // public metadata
    private_metadata: null,
    unsafe_metadata: null,
    created_at: null,
    totp_secret: null,
    backup_codes: null,
    skip_password_checks: null,
    skip_password_requirement: null
  };

  try {
    const response = await axios.post(
      'https://api.clerk.dev/v1/users',
      body,
      config
    );
    console.log('User created:', response.data);
  } catch (error) {
    console.error('Failed to create user:', error, error?.response?.data?.errors);
  }
}

// Parse arguments for email and organization_id
const email = process.argv[2] || 'default@example.com';
const organizationId = process.argv[3] || 'defaultOrgId';

// Create the user
createUser(email, { organization_id: organizationId });
